import React, { useEffect, useRef, useState } from "react";
import FilterSection from "../components/Common/FilterSection";
import { CiFilter } from "react-icons/ci";
import ProductsGrid from "../components/Products/ProductsGrid";
import SortOption from "../components/Common/SortOption";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {

  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state)=> state.products)

useEffect(() => {
  const rawParams = Object.fromEntries([...searchParams]);

  const cleanedParams = Object.fromEntries(
    Object.entries(rawParams).filter(([_, value]) => value !== "")
  );

  const finalParams = {
    ...cleanedParams,
    collections: collection,
  };


  dispatch(fetchProductsByFilters(finalParams));
}, [dispatch, collection, searchParams]);
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event)=>{
         if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
           setIsSidebarOpen(false);
         }
    }
    if(isSidebarOpen){
        document.addEventListener("mousedown", handleClickOutside)
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])


   useEffect(() => {
     window.scrollTo({top, behavior:"smooth"});
   }, []);

  

  return (
    <div className="relative p-4 flex flex-col min-h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`absolute top-0 left-0 h-full overflow-auto w-44 bg-slate-50 text-black p-4 transform transition-transform duration-300 z-1 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <FilterSection />
      </div>

      <div className={`flex- lg:pl-44 overflow-hidden`}>
        <div className="text-3xl font-bold uppercase text-center lg:text-start tracking-wide flex ">
          {/* Filter Button */}
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="px-4 py-2 bg-black text-xs rounded text-white hover:bg-slate-900 transition flex items-center justify-center cursor-pointer active:scale-95 lg:hidden shrink mb-5"
            >
              <CiFilter />
              <span>Filter</span>
            </button>
          )}
           <p className={`${isSidebarOpen? "pl-[92.78px]": "pl-5"} mb-5`}>All collections</p> 
        </div>

          <div className="m-2 flex justify-end">
        <SortOption />
          </div>
        <ProductsGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
