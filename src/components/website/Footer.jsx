import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import logo from "../../assets/images/website/ft-logo.png";
import footerBg from "../../assets/images/website/footer-bg.jpg";

const Footer = () => {
  return (
    <footer
      className=" bg-cover bg-center bg-no-repeat text-white pb-4 md:pt-16 relative mt-5 md:mt-12"
      style={{ backgroundColor: "#000000cc", backgroundImage: `url(${footerBg})`, }} // fallback overlay if no image
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative container mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* ===== Logo + About ===== */}
        <div>
          <div className="flex items-center mb-4">
            <img src={logo} alt="ZATRA Logo" className="w-14 h-14" />
            <h2 className="ml-3 text-xl font-semibold tracking-wide">
              ZATRA
              <br />
              <span className="text-[13px] font-normal opacity-80">
                Tourism & Commerce
              </span>
            </h2>
          </div>
          <p className="opacity-90 leading-relaxed mb-4">
            High level experience in web design and development knowledge,
            producing quality work.
          </p>

          <h3 className="font-semibold mb-3 text-lg">Follow us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-webprimary transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-webprimary transition"
            >
              <Send size={18} />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-webprimary transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-webprimary transition"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* ===== Address & Contact ===== */}
        <div>
          <div className="flex items-start gap-2 mb-3">
            <MapPin size={18} className="mt-1 text-primary" />
            <p>
              A-64 Sector 63, Noida,
              <br /> Uttar Pradesh, 201301 India
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Mail size={18} className="text-primary" />
            <a href="mailto:rjvijs42@gmail.com" className="hover:underline">
              rjvijs42@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-primary" />
            <a href="tel:+915252525252" className="hover:underline">
              +91 5252525252
            </a>
          </div>
        </div>

        {/* ===== Company Links ===== */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* ===== Quick Links ===== */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Link</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00acee] transition">
                Legal
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="relative border-t border-white/20 mt-10 pt-6 text-center text-xs text-gray-300">
        ©2025 ZATRA All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
