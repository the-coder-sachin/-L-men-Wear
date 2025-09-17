import { useEffect, useRef, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import AdminSideBar from "../Admin/AdminSideBar";
import AdminHomePage from "../Admin/AdminHomePage";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sideBar, setSideBar] = useState(false);
  const sideBarRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSideBar = () => {
    setSideBar((prev) => !prev);
  };

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setSideBar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-black text-white py-3 px-5 gap-2 relative z-30 flex sm:hidden">
        <button
          ref={buttonRef}
          className="cursor-pointer sm:hidden"
          onClick={toggleSideBar}
        >
          <FaBarsStaggered />
        </button>
        <h2 className="capitalize">lumen wear</h2>
      </nav>

      {/* Sidebar */}
      <div
        ref={sideBarRef}
        className={`fixed top-0 left-0 h-full w-56 bg-black text-white z-40 transition-transform transform ${
          sideBar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <AdminSideBar setSideBar={setSideBar}/>
      </div>

      {/* Overlay (only visible when sidebar is open) */}
      {sideBar && (
        <div
          className="fixed inset-0 bg-black/80 z-30"
          onClick={() => setSideBar(false)}
        ></div>
      )}

      <main className="sm:ml-56">
        {/* <AdminHomePage/> */}
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminLayout;
