import { NavLink, useNavigate } from 'react-router-dom'
import { HiMiniUsers } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";
import { RiStore3Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/AuthSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const AdminSideBar = ({setSideBar}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = ()=>{
      dispatch(logout());
      dispatch(clearCart());
      navigate('/');
    }

    const navigateToAdminDashboard = e =>{
        navigate('/admin');
        setSideBar(false)
    }

  return (
    <div className="capitalize">
      <h1
        className="text-2xl p-3 cursor-pointer transition-all duration-300 active:scale-95"
        onClick={navigateToAdminDashboard}
      >
        Lumen Wear
      </h1>
      <h2
        onClick={navigateToAdminDashboard}
        className="mt-8 ml-5 font-bold cursor-pointer transition-all duration-300 active:scale-95"
      >
        Admin Dashboard
      </h2>
      <nav className="flex flex-col items-center mt-4">
        <NavLink
          to={"user-management"}
          onClick={() => setSideBar(false)}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 hover:bg-zinc-800 w-full p-3 bg-zinc-900"
              : "flex items-center gap-2 hover:bg-zinc-800 w-full p-3"
          }
        >
          <HiMiniUsers />
          <span>users</span>
        </NavLink>
        <NavLink
          to={"products"}
          onClick={() => setSideBar(false)}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 hover:bg-zinc-800 w-full p-3 bg-zinc-900"
              : "flex items-center gap-2 hover:bg-zinc-800 w-full p-3"
          }
        >
          <AiOutlineProduct />
          <span>products</span>
        </NavLink>
        <NavLink
          to={"orders"}
          onClick={() => setSideBar(false)}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 hover:bg-zinc-800 w-full p-3 bg-zinc-900"
              : "flex items-center gap-2 hover:bg-zinc-800 w-full p-3"
          }
        >
          <FaListCheck />
          <span>orders</span>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 hover:bg-zinc-800 w-full p-3 bg-zinc-900"
              : "flex items-center gap-2 hover:bg-zinc-800 w-full p-3"
          }
        >
          <RiStore3Fill />
          <span>shop</span>
        </NavLink>
      </nav>
      <div className="flex justify-center">
        <button onClick={handleLogout} className="bg-red-700 rounded hover:bg-red-600 transition-all duration-300 active:scale-95 cursor-pointer font-bold m-5 flex gap-1 items-center capitalize px-12 py-2">
          <IoMdLogOut className="size-5" />
          <span>logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSideBar