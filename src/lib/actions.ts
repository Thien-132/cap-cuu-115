import { createServerFn } from '@tanstack/react-start';

export const sendEmailAction = createServerFn({ method: 'POST' })
  .validator((data: {
    name: string;
    phone: string;
    address: string;
    condition?: string;
    serviceType?: string;
    hospital?: string;
    note?: string;
    rating?: string;
    type: 'booking' | 'contact' | 'review';
  }) => data)
  .handler(async ({ data }) => {
    const resendApiKey = process.env.RESEND_API_KEY || "re_DYLa5dkT_4YdRVwaNkRtuETzRF1KrMhvq";
    if (!resendApiKey) {
      throw new Error('Missing RESEND_API_KEY environment variable. Vui lòng thêm RESEND_API_KEY vào file .env');
    }

    const { name, phone, address, condition, serviceType, hospital, note, rating, type } = data;
    
    let htmlContent = '';
    
    if (type === 'booking') {
      htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">CẤP CỨU 115 HỒNG HẢI</h1>
              <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 15px;">Thông báo yêu cầu dịch vụ y tế mới</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; margin-bottom: 24px;">Xin chào Admin,</p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Hệ thống vừa ghi nhận một yêu cầu đặt lịch dịch vụ mới từ khách hàng. Dưới đây là thông tin chi tiết:</p>
              
              <!-- Details Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px; width: 40%;">👤 Họ và tên</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${name}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">📞 Số điện thoại</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${phone}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">📍 Địa chỉ</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${address}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">🚑 Loại dịch vụ</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0284c7; font-size: 15px; font-weight: 700; text-align: right;">${serviceType || 'Không xác định'}</td></tr>
                  <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">❤️ Tình trạng bệnh</td><td style="padding: 10px 0; color: #ef4444; font-size: 15px; font-weight: 600; text-align: right;">${condition || 'Không ghi rõ'}</td></tr>
                </table>
              </div>

              <div style="text-align: center;">
                <a href="tel:${phone}" style="display: inline-block; background-color: #0284c7; color: #ffffff; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 50px; box-shadow: 0 4px 6px rgba(2, 132, 199, 0.25);">GỌI CHO KHÁCH HÀNG NGAY</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0;">Dịch vụ Cấp cứu 115 Hồng Hải - Trực ban 24/7</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Email gửi tự động từ hệ thống website. Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'contact') {
      htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">CẤP CỨU 115 HỒNG HẢI</h1>
              <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 15px;">Có tin nhắn liên hệ mới từ khách hàng</p>
            </div>
            
            <div style="padding: 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; margin-bottom: 24px;">Xin chào Admin,</p>
              
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px; width: 40%;">👤 Họ và tên</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${name}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">📞 Số điện thoại</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${phone}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">📍 Địa chỉ đón</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${address || 'Không ghi rõ'}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">🏥 Bệnh viện đến</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${hospital || 'Không ghi rõ'}</td></tr>
                  <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">📝 Lời nhắn</td><td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${note || 'Không có'}</td></tr>
                </table>
              </div>
              <div style="text-align: center;">
                <a href="tel:${phone}" style="display: inline-block; background-color: #0284c7; color: #ffffff; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 50px; box-shadow: 0 4px 6px rgba(2, 132, 199, 0.25);">GỌI LẠI TƯ VẤN</a>
              </div>
            </div>
            
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0;">Dịch vụ Cấp cứu 115 Hồng Hải - Trực ban 24/7</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Thời gian nhận tin: ${new Date().toLocaleString('vi-VN')}</p>
            </div>
          </div>
        </div>
      `;
    } else {
      htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">CẤP CỨU 115 HỒNG HẢI</h1>
              <p style="color: #fef08a; margin: 8px 0 0 0; font-size: 15px;">⭐ Khách hàng vừa gửi đánh giá mới</p>
            </div>
            
            <div style="padding: 30px 40px;">
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px; width: 40%;">👤 Họ và tên</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${name || 'Khách ẩn danh'}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">📞 Số điện thoại</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${phone || 'Không cung cấp'}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #64748b; font-size: 14px;">⭐ Đánh giá</td><td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; color: #eab308; font-size: 18px; font-weight: 700; text-align: right;">${rating} Sao</td></tr>
                  <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">💬 Bình luận</td><td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${note || 'Không có bình luận'}</td></tr>
                </table>
              </div>
            </div>
            
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0;">Dịch vụ Cấp cứu 115 Hồng Hải - Trực ban 24/7</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Thời gian nhận tin: ${new Date().toLocaleString('vi-VN')}</p>
            </div>
          </div>
        </div>
      `;
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Cấp Cứu 115 Hồng Hải <onboarding@resend.dev>',
          to: process.env.RESEND_TO_EMAIL || 'Hoangphihai1984bp@gmail.com',
          subject: type === 'booking' ? '🚑 YÊU CẦU DỊCH VỤ MỚI - Cấp cứu 115' : type === 'review' ? '⭐ ĐÁNH GIÁ MỚI - Cấp cứu 115' : '📧 YÊU CẦU LIÊN HỆ - Cấp cứu 115',
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed to send email via Resend:', errorData);
        throw new Error('API Resend trả về lỗi');
      }

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new Error('Lỗi khi kết nối đến dịch vụ gửi email');
    }
  });
