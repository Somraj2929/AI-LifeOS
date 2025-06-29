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
    <footer className="bg-gray-300 py-4 bottom-0 w-full mt-[-1px]">
      <div className="flex justify-center gap-6 mb-2">
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin size={28} className="text-black hover:text-blue-700" />
        </a>
        <a href="#" aria-label="GitHub">
          <FaSquareGithub
            size={28}
            className="text-black hover:text-gray-800"
          />
        </a>
        <a href="#" aria-label="Twitter (X)">
          <FaSquareXTwitter
            size={28}
            className="text-black hover:text-gray-800"
          />
        </a>
        <a href="#" aria-label="Telegram">
          <FaTelegram size={28} className="text-black hover:text-blue-500" />
        </a>
        <a href="#" aria-label="Instagram">
          <FaSquareInstagram
            size={28}
            className="text-black hover:text-pink-600"
          />
        </a>
      </div>
      <div className="flex justify-center items-center gap-3 text-sm text-black mb-2 mx-4">
        <Link href="#">
          <span>About Us</span>
        </Link>
        <span className="border-l border-black h-4"></span>
        <Link href="#">
          <span>Services</span>
        </Link>
        <span className="border-l border-black h-4"></span>
        <Link href="#">
          <span>Privacy Policy</span>
        </Link>
        <span className="border-l border-black h-4"></span>
        <Link href="#">
          <span>Contact Us</span>
        </Link>
      </div>
      <p className="text-center text-xs text-black">&copy; 2025 AI LifeOS</p>
    </footer>
  );
}
