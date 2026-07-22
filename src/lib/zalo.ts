import fs from "fs";
import path from "path";

const TOKEN_FILE_PATH = path.resolve(process.cwd(), "zalo_tokens.json");

interface ZaloTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number; // timestamp in ms
}

async function getTokens(): Promise<ZaloTokens | null> {
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      const data = fs.readFileSync(TOKEN_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Lỗi khi đọc file zalo_tokens.json:", error);
  }
  return null;
}

async function saveTokens(tokens: ZaloTokens) {
  try {
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokens, null, 2), "utf-8");
  } catch (error) {
    console.error("Lỗi khi lưu file zalo_tokens.json:", error);
  }
}

async function refreshAccessToken(refreshToken: string): Promise<ZaloTokens> {
  const appId = process.env.ZALO_APP_ID;
  const secretKey = process.env.ZALO_SECRET_KEY;

  if (!appId || !secretKey) {
    throw new Error("Thiếu cấu hình ZALO_APP_ID hoặc ZALO_SECRET_KEY trong file .env");
  }

  const response = await fetch("https://oauth.zaloapp.com/v4/oa/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      secret_key: secretKey,
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      app_id: appId,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`Zalo OAuth Error: ${data.error_name} - ${data.error_description}`);
  }

  const newTokens: ZaloTokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + parseInt(data.expires_in, 10) * 1000,
  };

  await saveTokens(newTokens);
  return newTokens;
}

export async function getValidAccessToken(): Promise<string> {
  let tokens = await getTokens();

  // If no tokens found in file, try to initialize using .env
  if (!tokens) {
    const initialRefreshToken = process.env.ZALO_REFRESH_TOKEN_INITIAL;
    if (!initialRefreshToken) {
      throw new Error(
        "Không tìm thấy token. Vui lòng cấu hình ZALO_REFRESH_TOKEN_INITIAL trong .env",
      );
    }
    // Attempt to get the very first access token
    tokens = await refreshAccessToken(initialRefreshToken);
  }

  // Check expiration (buffer of 5 minutes = 300000ms)
  if (Date.now() > tokens.expires_at - 300000) {
    console.log("Zalo Access Token hết hạn, đang làm mới...");
    tokens = await refreshAccessToken(tokens.refresh_token);
  }

  return tokens.access_token;
}

export async function sendZaloMessage(data: any) {
  try {
    const adminUserId = process.env.ZALO_ADMIN_USER_ID;
    if (!adminUserId) {
      console.warn("Bỏ qua gửi Zalo: Chưa cấu hình ZALO_ADMIN_USER_ID");
      return;
    }

    const accessToken = await getValidAccessToken();

    // Prepare message text based on type
    let text = "";
    if (data.type === "booking") {
      text =
        `🚑 YÊU CẦU DỊCH VỤ MỚI 🚑\n\n` +
        `👤 Khách hàng: ${data.name}\n` +
        `📞 SĐT: ${data.phone}\n` +
        `📍 Địa chỉ: ${data.address}\n` +
        `🏥 Dịch vụ: ${data.serviceType || "Không rõ"}\n` +
        `❤️ Tình trạng: ${data.condition || "Không ghi rõ"}\n\n` +
        `⏰ Nhận lúc: ${new Date().toLocaleString("vi-VN")}`;
    } else if (data.type === "contact") {
      text =
        `📧 LIÊN HỆ MỚI TỪ KHÁCH HÀNG 📧\n\n` +
        `👤 Khách hàng: ${data.name}\n` +
        `📞 SĐT: ${data.phone}\n` +
        `📍 Địa chỉ đón: ${data.address || "Không ghi rõ"}\n` +
        `🏥 Bệnh viện đến: ${data.hospital || "Không ghi rõ"}\n` +
        `📝 Lời nhắn: ${data.note || "Không có"}\n\n` +
        `⏰ Nhận lúc: ${new Date().toLocaleString("vi-VN")}`;
    } else if (data.type === "review") {
      text =
        `⭐ ĐÁNH GIÁ MỚI ⭐\n\n` +
        `👤 Tên: ${data.name || "Ẩn danh"}\n` +
        `📞 SĐT: ${data.phone || "Không cung cấp"}\n` +
        `⭐ Mức độ: ${data.rating} Sao\n` +
        `💬 Bình luận: ${data.note || "Không có"}`;
    } else {
      return;
    }

    const response = await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken,
      },
      body: JSON.stringify({
        recipient: {
          user_id: adminUserId,
        },
        message: {
          text: text,
        },
      }),
    });

    const result = await response.json();
    if (result.error !== 0) {
      console.error("Lỗi khi gửi Zalo message:", result);
    } else {
      console.log("Đã gửi thông báo Zalo thành công!");
    }
  } catch (error) {
    console.error("Lỗi quá trình gửi Zalo:", error);
  }
}
