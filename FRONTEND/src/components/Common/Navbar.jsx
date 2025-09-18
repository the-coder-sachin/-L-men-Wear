import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import Search from './Search';
import Cart from './Cart';
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from 'react-redux';


const Navbar = () => {

  const {user} = useSelector(state=>state.auth);

  return (
    <nav className="bg-white text-xs md:text-sm px-2 mt-8 sm:px-5 flex justify-between sticky top-8 inset-x-0 z-[900] border-b border-b-slate-300/70 ">
      {/* logo */}
      <Link to={"/"}>
        <h1 onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} className="sm:py-4 py-3 text-nowrap font-extrabold text-lg sm:text-2xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-90">
          Lumen Wear
        </h1>
      </Link>
      {/* nav links */}
      <div className="flex font-semibold uppercase">
        <Link
          to={`/collection/all/?gender=men`}
          className="cursor-pointer transition-all duration-300 hover:border-b-black border-3 border-transparent h-full px-2 flex justify-center items-center text-slate-700 hover:text-black"
        >
          <span className="transition-all duration-300 active:scale-75">
            Men
          </span>
        </Link>
        <Link
          to={`/collection/all/?gender=women`}
          className="cursor-pointer transition-all duration-300 hover:border-b-black border-3 border-transparent h-full px-2 flex justify-center items-center text-slate-700 hover:text-black"
        >
          <span className="transition-all duration-300 active:scale-75">
            Women
          </span>
        </Link>
      </div>
      {/* right part of nav */}
      <div className="flex items-center gap-2 text-slate-600">
        {user && user.role === "admin" && (
          <Link to={"/admin"} className="cursor-pointer text-2xl px-1 rounded">
            <MdAdminPanelSettings />
          </Link>
        )}
        <Link
          to={"/profile"}
          className="text-lg transition-all duration-300 active:scale-90 hover:scale-110 hover:text-black"
        >
          <CiUser />
        </Link>
        <Cart />
        <Search />
      </div>
    </nav>
  );
}

export default Navbar