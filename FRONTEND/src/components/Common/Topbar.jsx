import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

import { IoMdCall } from "react-icons/io";

const Topbar = () => {
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[900] flex bg-black text-white h-8 items-center justify-between text-xs px-4">
        {/* social media */}
        <div className="hidden sm:flex items-center gap-2 text-neutral-400">
          <a href="#">
            <CiInstagram className="size-4 cursor-pointer hover:text-white active:scale-75 transition-all duration-300" />
          </a>
          <a href="#">
            <FaXTwitter className="size-3 cursor-pointer hover:text-white active:scale-75 transition-all duration-300" />
          </a>
          <a href="#">
            <CiYoutube className="size-4 cursor-pointer hover:text-white active:scale-75 transition-all duration-300" />
          </a>
          <a href="#">
            <FaWhatsapp className="size-[14px] cursor-pointer hover:text-white active:scale-75 transition-all duration-300" />
          </a>
        </div>
        {/* slogan */}
        <p className="text-center grow animate-pulse">Lumen Wear &nbsp;| &nbsp;  Wear Premium !</p>
        {/* contact */}
        <a href="#" className="hidden sm:flex items-center gap-2 text-neutral-400 hover:text-white transition-all duration-300 active:scale-75">
            <IoMdCall className="size-4"/>
            <span>+1800-7979-999</span>
        </a>
      </div>
    </>
  );
};

export default Topbar;
