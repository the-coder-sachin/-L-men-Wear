import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoChevronUp } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion"; // updated import!
import { bannerVideo } from "../../assets";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleSearchToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    // Get current query params
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("search", searchQuery);

    // Navigate to /collection/all if not already there
    const currentPath = location.pathname;
    const targetPath = "/collection/all";

    // Build final URL
    const finalUrl = `${targetPath}?${currentParams.toString()}`;

    navigate(finalUrl); // Navigate with updated query

    // Reset and close
    setIsOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Search button (nav) */}
      <button
        onClick={handleSearchToggle}
        className="cursor-pointer text-lg transition-all duration-300 active:scale-90 pt-1 hover:scale-110 hover:text-black"
      >
        <CiSearch />
      </button>

      {/* Fullscreen search overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.form
            key="overlay"
            className="fixed z-50 top-8 left-0 bottom-0 right-0 h-screen"
            initial={{ height: "0vh" }}
            animate={{ height: "100vh" }}
            exit={{ height: "0vh" }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
          >
            {/* Background video */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full z-[2] inset-0 object-cover bg-black flex justify-center items-center"
            >
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={bannerVideo}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                className="max-w-[560px] select-none"
              ></motion.video>
            </motion.div>

            {/* Input field */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 1.4 } }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-[5] flex items-center w-3/4 mx-auto mt-10 h-12 rounded-2xl bg-slate-100 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none pl-4 grow"
              />
              <button
                type="submit"
                disabled={searchQuery.length === 0}
                className={`cursor-pointer text-xl transition-all duration-300 ${
                  searchQuery.length !== 0 && "active:scale-90"
                } hover:scale-110 hover:text-black flex justify-center items-center h-full w-12 bg-slate-300`}
              >
                <CiSearch />
              </button>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              onClick={handleSearchToggle}
              className="z-[5] text-4xl w-full h-[75px] fixed bottom-0"
            >
              <GoChevronUp className="mx-auto size-12 cursor-pointer transition-all duration-300 active:scale-90 pb-5 hover:scale-110 hover:text-white" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;
