import Link from "next/link";
import {
  FaLinkedin,
  FaSquareGithub,
  FaSquareXTwitter,
  FaTelegram,
  FaSquareInstagram,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black/70 backdrop-blur-md border-t border-white/10 text-white py-4 w-full mt-auto">
      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-3">
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin
            size={24}
            className="text-white hover:text-blue-500 transition"
          />
        </a>
        <a href="#" aria-label="GitHub">
          <FaSquareGithub
            size={24}
            className="text-white hover:text-gray-300 transition"
          />
        </a>
        <a href="#" aria-label="Twitter (X)">
          <FaSquareXTwitter
            size={24}
            className="text-white hover:text-gray-300 transition"
          />
        </a>
        <a href="#" aria-label="Telegram">
          <FaTelegram
            size={24}
            className="text-white hover:text-cyan-400 transition"
          />
        </a>
        <a href="#" aria-label="Instagram">
          <FaSquareInstagram
            size={24}
            className="text-white hover:text-pink-500 transition"
          />
        </a>
      </div>

      {/* Nav Links */}
      <div className="flex justify-center items-center gap-3 text-sm text-gray-400 mb-2 mx-4 flex-wrap">
        <Link href="#">
          <span className="hover:text-white transition">About Us</span>
        </Link>
        <span className="border-l border-white h-4" />
        <Link href="#">
          <span className="hover:text-white transition">Services</span>
        </Link>
        <span className="border-l border-white h-4" />
        <Link href="#">
          <span className="hover:text-white transition">Privacy Policy</span>
        </Link>
        <span className="border-l border-white h-4" />
        <Link href="#">
          <span className="hover:text-white transition">Contact Us</span>
        </Link>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500">&copy; 2025 AI LifeOS</p>
    </footer>
  );
}
