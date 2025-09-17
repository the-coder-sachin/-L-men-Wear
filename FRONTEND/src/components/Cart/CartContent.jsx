import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContent = ({cart, userId, guestId}) => {
  const dispatch = useDispatch();
  // handle adding or subtracting from the cart
  const handleAddToCart = (productId, delta, quantity, size, color) =>{
    const newQuantity = quantity + delta;
    if(newQuantity > 0){
      dispatch(updateCartItemQuantity({productId, quantity: newQuantity, size, color, guestId, userId}))
    }
  }

  const handleRemoveFromCart = (productId, size, color) =>{
    dispatch(removeFromCart({productId, size, color, guestId, userId}))
  }
  return (
    <>
      {cart.products.map((item, idx) => (
        <div
          key={idx}
          className="mt-3 shadow-[0px_-3px_5px_0.1px_rgba(255,255,255,0.01)] border-t border-slate-900 flex items-center justify-between p-3 text-xs"
        >
          {/* image  */}
          <img src={item.image} alt="img" className="h-20 w-16 object-cover rounded" />
          {/* description  */}
          <div className="flex flex-col h-full w-full justify-between items-start ml-3 capitalize">
            <span className="text-white leading-4 pr-1">
              {item.name.length > 40
                ? item.name.slice(0, 25) + "..."
                : item.name}
            </span>
            <div className="flex text-xs">
              <span>
                size: {item.size} | color: {item.color}
              </span>
            </div>
            {/* quantity  */}
            <div className="flex border border-slate-700/30 w-fit gap-1 rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  handleAddToCart(
                    item.productId,
                    -1,
                    item.quantity,
                    item.size,
                    item.color
                  )
                }
                className="cursor-pointer rounded-l-lg w-full px-1 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 active:scale-90"
              >
                <FiMinus />
              </button>
              <span className="text-white select-none px-2">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  handleAddToCart(
                    item.productId,
                    1,
                    item.quantity,
                    item.size,
                    item.color
                  )
                }
                className="cursor-pointer rounded-r-lg w-full px-1 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 active:scale-90"
              >
                <FiPlus />
              </button>
            </div>
          </div>
          {/* price & remove */}
          <div className="flex flex-col w-14 self-end h-full justify-between text-end items-end">
            <span onClick={()=>handleRemoveFromCart(item.productId, item.size, item.color)} className="transition-all duration-300 cursor-pointer hover:text-white hover:scale-110 active:scale-90">
              <RxCross1 />
            </span>
            <span className="text-white font-bold">${item.price}</span>
          </div>
        </div>
      ))}

     
    </>
  );
};

export default CartContent;
