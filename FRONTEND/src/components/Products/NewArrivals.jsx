import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrollButtonIntialised, setIsScrollButtonIntialised] = useState(false)

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async ()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
        setNewArrivals(response.data);
        
      } catch (error) {
         console.error(error);
      }
    }
    fetchNewArrivals()
  }, [])
  

const updateScroll = () => {
  const container = scrollRef.current;
  if (!container) return;

  const scrollLeft = container.scrollLeft;
  const clientWidth = container.clientWidth;
  const scrollWidth = container.scrollWidth;

  setCanScrollLeft(scrollLeft > 0);
  setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
};

  

  const scrollLeftt = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };


  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScroll);
      updateScroll(); // call initially
      setIsScrollButtonIntialised(true)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScroll);
      }
    };
  }, [newArrivals]);

  return (
    <section data-scroll className="relative">
      <div className="container mx-auto text-center mb-2 relative px-5">
        <h2 className="text-3xl font-bold mb-4 capitalize">
          Explore new arrivals
        </h2>
        <h3 className="text-xl font-semibold mb-1 capitalize">
          Step into the season with timeless sophistication
        </h3>
        <p className="text-slate-600 mb-0">
          Discover Lumen Wear’s latest arrivals — a curated blend of bold
          silhouettes, refined fabrics, and sensual detail. Designed for those
          who dress not to impress, but to express. Luxury redefined, now
          waiting in every stitch
        </p>
      </div>

      {/* scrollable content  */}
      <div className="relative mb-2">
        {/* Scroll Buttons */}

        {isScrollButtonIntialised && (
          <button
            onClick={scrollLeftt}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 px-1 py-3 bg-slate-900 text-white shadow-md hover:text-black cursor-pointer hover:bg-gray-200 transition-all duration-500 ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <FaChevronLeft />
          </button>
        )}

        {isScrollButtonIntialised && (
          <button
            onClick={scrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 px-1 py-3 bg-slate-900 text-white shadow-md hover:text-black cursor-pointer hover:bg-gray-200 transition-all duration-500 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          >
            <FaChevronRight />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex space-x-6 gap-5 overflow-x-auto p-5 my-scrollbar"
        >
          {newArrivals.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="cards mx-auto relative shrink-0"
            >
              <div className="img size-[250px]">
                <img
                  src={product.images[0]}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute h-16 overflow-hidden text-xs inset-x-0 bottom-0 backdrop-blur-[1.4px] bg-black/50 p-2 text-white">
                <p className="font-semibold capitalize">{`${product.name.slice(
                  0,
                  50
                )} . ..`}</p>
                <div className="fixed bottom-1">
                  {" "}
                  <p className="font-semibold uppercase ">
                    <span className="">launch offer: </span>
                    <span className="text-sm">${product.price}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="uppercase text-[10px]">
                      regular price: <span>{product.mrp}</span>
                    </p>
                    <p className="animate-pulse uppercase border border-dashed px-1 flex justify-center items-center text-nowrap text-[10px] fixed bottom-1 right-1">
                      {" "}
                      {Math.ceil(
                        ((product.mrp - product.price) / product.mrp) * 100
                      )}
                      % off
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
