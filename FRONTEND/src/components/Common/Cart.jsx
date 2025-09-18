import { useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { AnimatePresence, motion } from "motion/react";
import { PiHandbagLight } from "react-icons/pi";
import CartContent from "../Cart/CartContent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {user, guestId} = useSelector((state)=> state.auth);
  const {cart} = useSelector((state)=> state.cart);
  const userId = user ? user._id : null;

  const cartItemCount = cart?.products?.reduce((total, product)=> total + product.quantity, 0) || 0
  
  const handleCartToggle = (e) => {
    setIsOpen(!isOpen);
  };

   useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }

     // Cleanup on unmount
     return () => {
       document.body.style.overflow = "auto";
     };
   }, [isOpen]);

   const handleCheckout = ()=>{
    setIsOpen(false)
    if(!user){
      navigate('/login?redirect=checkout')
    }else{
      navigate("/checkout")
    }
   }

  return (
    <>
      {/* cart button for navbar  */}
      <button
        onClick={handleCartToggle}
        className="relative cursor-pointer text-lg transition-all duration-300 active:scale-90 pt-1 hover:scale-110 hover:text-black"
      >
        <PiHandbagLight />
        {cartItemCount ? (
          <span className="absolute top-[0px] right-[-6px] bg-orange-600 size-4 rounded-full text-[10px] text-white inter flex justify-center items-center">
            {cartItemCount}
          </span>
        ) : null}
      </button>

      {/* cart drawer with animation  */}
      <AnimatePresence mode="wait">
        {isOpen && (
          //  dark overlay
          <motion.div
            onClick={()=>setIsOpen(false)}
            initial={{
              backgroundColor: "rgba(0,0,0,0)",
              backdropFilter: "blur(0px)",
            }}
            animate={{
              backgroundColor: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(2px)",
            }}
            exit={{
              backgroundColor: "rgba(0,0,0,0)",
              backdropFilter: "blur(0px)",
            }}
            transition={{ duration: 0.4 }}
            className="bg-black/80 h-screen w-full fixed inset-0 "
          >
            <motion.section
              onClick={e=>e.stopPropagation()}
              key={"overlay"}
              className={`fixed z-[50] top-0 bottom-0 right-0 min-h-screen bg-black flex flex-col`}
              initial={{
                width: "0vw",
              }}
              animate={{
                width: "350px",
              }}
              exit={{
                width: "0vw",
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {/* your cart  */}
              <div className="flex mt-8 items-center justify-between">
                {/* close button  */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleCartToggle}
                >
                  <GoChevronRight className="size-12 mt-4 cursor-pointer transition-all duration-300 active:scale-90 pb-5 hover:scale-110 hover:text-white text-slate-400" />
                </motion.button>
                {/* your cart  */}
                <div className="flex gap-3 mr-13">
                  <h3 className="text-xl uppercase text-nowrap select-none text-slate-400">
                    Your bag!
                  </h3>
                  <button
                    onClick={handleCartToggle}
                    className="relative cursor-pointer text-2xl transition-all duration-300 active:scale-90 hover:scale-110 hover:text-white text-slate-400"
                  >
                    <PiHandbagLight />
                    {cartItemCount ? (
                      <span className="absolute top-[0px] right-[-6px] bg-orange-600 size-4 rounded-full text-[10px] text-white inter flex justify-center items-center">
                        {cartItemCount}
                      </span>
                    ) : null}
                  </button>
                </div>
              </div>

              {/* cart content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="flex flex-col grow mb-9 overflow-y-scroll my-scrollbar"
              >
                {cart && cart?.products?.length > 0 ? (
                  <CartContent cart={cart} userId={userId} guestId={guestId} />
                ) : (
                  <div className="h-full w-full flex justify-center items-center text-lg">
                    <p>your bag is empty</p>
                  </div>
                )}
              </motion.div>
              {/* checkout button  */}
              {cart && cart?.products?.length > 0 && (
                <div className="flex flex-col sticky bottom-0 w-[350px]">
                  <div className="flex justify-between text-white p-2 border-t-1 border-slate-700 text-xs md:text-sm">
                    <p className="uppercase ">total amount : </p>
                    <p>
                      $
                      {cart.products.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-white text-black w-3/4 h-10 mx-auto rounded-lg font-semibold cursor-pointer transition-all duration-300 active:scale-90 hover:scale-105 text-xl"
                  >
                    checkout
                  </button>
                  <p className="text-xs text-slate-400 text-center py-1">
                    taxes, shipping and discounts will be added at checkout!
                  </p>
                </div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
