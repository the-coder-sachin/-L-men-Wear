import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
            
            <Link to={`/products/${product._id}`} key={product._id} className="cards mx-auto relative shrink-0">
              <div className="img size-[250px]">
                <img
                  src={product.images[0]}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* details  */}
              <div className="absolute inset-x-0 bottom-0 backdrop-blur-[1px] text-white bg-black/30 p-5">
                <p className="text- font-semibold capitalize">
                  {product.name}
                </p>
                <p className="font-semibold uppercase ">
                  <span className="text-sm">launch price: </span>
                  <span className="text-lg">${product.price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
