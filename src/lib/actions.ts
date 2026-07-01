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
    type: 'booking' | 'contact';
  }) => data)
  .handler(async ({ data }) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error('Missing RESEND_API_KEY environment variable. Vui lòng thêm RESEND_API_KEY vào file .env');
    }

    const { name, phone, address, condition, serviceType, hospital, note, type } = data;
    
    let htmlContent = '';
    
    if (type === 'booking') {
      htmlContent = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #e11d48; margin-top: 0;">🚑 Có yêu cầu dịch vụ mới từ website Hồng Hải</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Họ và tên:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Số điện thoại:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Địa chỉ:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${address}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tình trạng bệnh:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${condition || 'Không có'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Loại dịch vụ:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${serviceType || 'Không có'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Thời gian gửi:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date().toLocaleString('vi-VN')}</td></tr>
          </table>
        </div>
      `;
    } else {
      htmlContent = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #0284c7; margin-top: 0;">📧 Có tin nhắn liên hệ mới từ website Hồng Hải</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Họ và tên:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Số điện thoại:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Địa chỉ đón:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${address}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Bệnh viện đến:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${hospital || 'Không có'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Ghi chú/Tin nhắn:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${note || 'Không có'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Thời gian gửi:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date().toLocaleString('vi-VN')}</td></tr>
          </table>
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
          to: 'Hoangphihai1984bp@gmail.com',
          subject: type === 'booking' ? '🚑 YÊU CẦU DỊCH VỤ MỚI - Cấp cứu 115' : '📧 YÊU CẦU LIÊN HỆ - Cấp cứu 115',
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
