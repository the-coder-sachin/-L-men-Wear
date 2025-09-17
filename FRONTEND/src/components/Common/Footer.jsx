import { FaGlobeAmericas } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import Accordion from "./Accordion";
import { FaFoursquare } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { india } from "../../assets";

const Footer = () => {
  return (
    <footer className={`${ 0 && `pb-20 sm:pb-24`}`}>
      {/* logo & country  */}
      <div className="flex justify-between px-2 sm:px-5 bg-gray-100 mb-5 sm:py-4 py-2">
        <h1 className="text-2xl font-semibold">Lumen Wear</h1>
        <div className="flex gap-5 text-slate-700 text-sm">
          <div className="flex items-center">
            <FaGlobeAmericas />
            <select
              name="country"
              id="country"
              className="outline-none focus:ring"
            >
              <option value="india">India</option>
            </select>
          </div>
          <div className="flex items-center">
            <IoLanguage />
            <select
              name="country"
              id="country"
              className="outline-none focus:ring"
            >
              <option value="india">English</option>
            </select>
          </div>
        </div>
      </div>
      {/* accordion  */}
      <Accordion title={"help"}>
        <ul>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Product Care, Complaints & Authenticity
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Order Tracking
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Shipping & Delivery Charges
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Returns & Exchanges
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Manufacturer & Importer
          </li>
        </ul>
      </Accordion>
      <Accordion title={"Services"}>
        <ul>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Personal Shopping & Styling
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Monogramming & Personalization
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            In-Store Services & Experiences
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Repairs & Product Care
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Gift Services
          </li>
        </ul>
      </Accordion>
      <Accordion title={"About Lumen Wear"}>
        <ul>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Fashion Shows
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Arts & Culture
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            La Maison
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Sustainability
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Latest News
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Careers
          </li>
          <li className="hover:bg-slate-200 cursor-pointer py-2 px-4 hover:text-black transition-all duration-300 active:scale-90">
            Foundation of Lumen Waer
          </li>
        </ul>
      </Accordion>
      <Accordion title={"Connect"}>
        <div className="flex justify-between items-center px-30 py-3">
          <span className="text-[24px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <CiInstagram />
          </span>
          <span className="text-[22px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <FaXTwitter />
          </span>
          <span className="text-[25px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <CiYoutube />
          </span>
          <span className="text-[22px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <FaWhatsapp />
          </span>
          <span className="text-[18px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <FaFacebookF />
          </span>
          <span className="text-[18px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <FaFoursquare />
          </span>
          <span className="text-[19px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <FaPinterestP />
          </span>
          <span className="text-[20px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
            <FaSnapchatGhost />
          </span>
        </div>
      </Accordion>
      {/* flag  */}
      <div className="flex h-10 justify-center items-center gap-2 my-2">
        <img src={india} alt="flah" className="h-6 pt-1" />
        <p className="border-b-2 font-semibold ">India</p>
      </div>
      {/* address  */}
      <div className="md:flex-row flex flex-col gap-7 text-center md:justify-around py-7 text-xs">
        <div className="flex flex-col gap-7">
          <p className="text-sm font-semibold text-slate-700">
            Full Name and Address of the Manufacturer
          </p>
          <p className="leading-5 text-slate-500">
            Louis Vuitton Malletier SAS <br /> 2 Rue du Pont Neuf <br /> 75034
            Paris CEDEX 01 <br />
            FRANCE
          </p>
          <p className="text-slate-500">
            Please refer to the product label for specific country of origin for
            each product.
          </p>
        </div>

        <div className="flex flex-col gap-7">
          <p className="text-sm text-slate-700 font-semibold">
            Full Name and Address of the Importer
          </p>
          <p className="text-slate-500 leading-5">
            Louis Vuitton India Retail Private Limited <br /> 901A Ninth Floor,
            Time Tower, MG Road <br /> Gurgaon, Haryana - 122002 <br /> INDIA
          </p>
          <p className="text-slate-500">
            Please refer to the product label for specific country of origin for
            each product.
          </p>
        </div>
      </div>
      {/* social icons */}
      <div className="flex items-center justify-center gap-2 py-3 text-slate-600">
        <span className="text-[24px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <CiInstagram />
        </span>
        <span className="text-[22px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <FaXTwitter />
        </span>
        <span className="text-[25px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <CiYoutube />
        </span>
        <span className="text-[22px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <FaWhatsapp />
        </span>
        <span className="text-[18px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <FaFacebookF />
        </span>
        <span className="text-[18px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <FaFoursquare />
        </span>
        <span className="text-[19px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <FaPinterestP />
        </span>
        <span className="text-[20px] hover:text-black hover:scale-[1.05] active:scale-[0.85] cursor-pointer transition duration-300">
          <FaSnapchatGhost />
        </span>
      </div>
      {/* copyright  */}
      <p className="bg-black text-white text-center text-xs py-2 ">
        © 2025 Lumen Wear. All Rights Reserved.
      </p>
      

    </footer>
  );
}

export default Footer