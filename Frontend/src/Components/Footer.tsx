import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0000] text-[#E7EFE6] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Logo + Tagline */}
        <div>
          <h1 className="text-3xl font-bold">FitnessFusion AI</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Your AI-powered personal fitness coach</p>
        </div>

        {/* Footer Links */}
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-white">Company</span>
            <a href="#" className="hover:underline text-[#94A3B8]">About</a>
            <a href="#" className="hover:underline text-[#94A3B8]">Contact</a>
            <a href="#" className="hover:underline text-[#94A3B8]">Blog</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-white">Legal</span>
            <a href="#" className="hover:underline text-[#94A3B8]">Privacy</a>
            <a href="#" className="hover:underline text-[#94A3B8]">Terms</a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-2xl text-[#94A3B8]">
          <a href="#"><FaGithub className="hover:text-white" /></a>
          <a href="#"><FaTwitter className="hover:text-white" /></a>
          <a href="#"><FaLinkedin className="hover:text-white" /></a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-[#1E293B] mt-6 pt-4 text-center text-sm text-[#94A3B8]">
        © {new Date().getFullYear()} FitnessFusion AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
