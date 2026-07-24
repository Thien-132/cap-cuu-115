import { Facebook, MessageCircle, Ambulance, PhoneCall, Mail, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer({ navItems }: { navItems: { label: string; href: string }[] }) {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
                <Ambulance className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-bold">
                Cấp cứu 115 <span className="text-primary whitespace-nowrap">Hồng Hải</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Dịch vụ xe cấp cứu Hồng&nbsp;Hải khẩn cấp nhanh chóng, an toàn và chuyên nghiệp, hoạt
              động 24/7 trên toàn thành phố.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-primary hover:text-primary-foreground transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://zalo.me/0915205115"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-primary hover:text-primary-foreground transition"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Liên kết nhanh</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-primary transition">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Dịch vụ</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/cap-cuu-khan-cap" className="hover:text-primary transition">
                  Xe cấp cứu 115
                </Link>
              </li>
              <li>
                <Link to="/van-chuyen-y-te" className="hover:text-primary transition">
                  Chuyển viện & vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/icu-hoi-suc" className="hover:text-primary transition">
                  Xe Cứu Thương ICU
                </Link>
              </li>
              <li>
                <Link to="/dieu-duong-tai-nha" className="hover:text-primary transition">
                  Điều dưỡng tại nhà
                </Link>
              </li>
              <li>
                <Link to="/dich-vu-oxy" className="hover:text-primary transition">
                  Dịch vụ oxy tận nhà
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Tư vấn sức khỏe 24/7</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Liên hệ</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-primary" /> 0915205115
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> Hoangphihai1984bp@gmail.com{" "}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> 11 Hẻm 922 Phường, Đồng Xoài, Tp.Đồng
                Nai
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Dịch vụ Cấp cứu 115 Hồng Hải. Đã đăng ký bản quyền.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              Bảo mật
            </a>
            <a href="#" className="hover:text-primary">
              Điều khoản
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
