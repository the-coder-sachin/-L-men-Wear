import { useEffect } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, clearCartFromBackend } from "../redux/slices/cartSlice";
import { createOrder } from "../redux/slices/orderSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  const { user, guestId } = useSelector((state) => state.auth);

  const subTotalAmount = Math.floor(
    checkout?.checkoutItems?.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0)
  );

  const shippingCharges = subTotalAmount > 1000 ? 40 : 120;
  const taxes = Math.round((30 / 100) * subTotalAmount);

  const orderTotal = subTotalAmount + shippingCharges + taxes;

  const discount = Math.ceil(orderTotal - Math.floor(orderTotal / 100) * 100);

  const finalAmount = orderTotal - discount;
 
  //  clear the cart when order is confirmed
useEffect(() => {
  const handleCheckout = async () => {
    if (checkout && checkout._id) {
      console.log(checkout);
      console.log({
        orderItems: checkout.checkoutItems,
        shippingDetails: checkout.shippingDetails,
        finalAmount:finalAmount,
        isPaid: checkout.isPaid,
        paidAt: checkout.paidAt,
      });
      

      if ((user && user._id) || guestId) {
        await dispatch(clearCartFromBackend({ userId: user?._id, guestId }));
        await dispatch(
          createOrder({
            orderItems: checkout.checkoutItems,
            shippingDetails: checkout.shippingDetails,
            totalPrice:finalAmount,
            isPaid: checkout.isPaid,
            paidAt: checkout.paidAt,
          })
        );
      }

      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/profile");
    }
  };

  handleCheckout();
}, [checkout, dispatch, navigate, user, guestId, finalAmount]);

  function getEstimatedDelivery(date) {
    const deliveryDate = new Date(date);
    deliveryDate.setDate(deliveryDate.getDate() + 30);
    return deliveryDate.toDateString();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!checkout) {
    return navigate("/profile");
  }



  return (
    <>
      <div
        className={`flex flex-col gap-8 p-6 lg:p-8 lg:flex-row overflow-hidden`}
      >
        {/* left - confirmation panel */}
        <div className="grow p lg:w-1/2">
          {/* thankyou message  */}
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 capitalize mb-3 animate-bounce">
              thank you for your purchase!
            </p>
            <p className="text-sm ">
              your order will be proccessed within 48 working hours. we will
              notify you through email once your order has been shipped.
            </p>
          </div>

          {/* billing details  */}
          <div className="mt-12 border border-gray-300 p-5 bg-gray-200 text-sm">
            <h3 className="font-bold text-xl capitalize pb-2 border-b border-b-gray-300 mb-3">
              shipping details{" "}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between capitalize">
                <p className="font-bold">name</p>
                <p>{user.name}</p>
              </div>
              <div className="flex justify-between capitalize">
                <p className="font-bold">email</p>
                <p>{user.email}</p>
              </div>
              <div className="flex justify-between capitalize">
                <p className="font-bold">phone</p>
                <p>{checkout?.shippingDetails?.phone}</p>
              </div>
              <div className="flex justify-between capitalize">
                <p className="font-bold">address</p>
                <div className="flex">
                  <p className="text-end">
                    {checkout.shippingDetails.address},
                  </p>
                  <p className="text-end">{checkout.shippingDetails.city},</p>
                  <p className="text-end">postal code: {checkout.shippingDetails.postalCode},</p>
                  <p className="text-end">{checkout.shippingDetails.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* track order button  */}
          <button className="cursor-pointer text-white font-bold bg-orange-600 w-full mt-5 py-2 hover:bg-orange-500 transition-all duration-300 hover:scale-[1.02] active:scale-95 capitalize">
            Track Your Order
          </button>

          {/* back to home  */}
          <Link
            to={"/"}
            className="cursor-pointer text-white font-bold bg-black w-full mt-5 py-2 hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-95 capitalize flex justify-center gap-2 items-center"
          >
            Back to home <IoReturnDownBack />
          </Link>
        </div>

        {/* right  */}
        <div className="p-8 bg-gray-200 lg:w-1/2">
          <p className="text-3xl font-bold capitalize">order summary</p>

          {/* order details  */}
          <div className="flex justify-evenly font-bold my-4 text-sm">
            <div className="">
              <p className="text-center text-slate-500">order date</p>
              <p className="text-center">
                {new Date(checkout.createdAt).toDateString()}
              </p>
            </div>
            <div className="border-x border-x-gray-400 px-4">
              <p className="text-center text-slate-500">order number</p>
              <p className="text-center">#{checkout._id}</p>
            </div>
            <div>
              <p className="text-center text-slate-500">expected delivery</p>
              <p className="text-center">
                {getEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* items list  */}
          <div>
            {checkout.checkoutItems.map((item, idx) => (
              <div
                key={idx}
                className="mt-3 text-xs md:text-base shadow-[0px_6px_5px_0.1px_rgba(255,255,255,0.06)] border border-slate-400 border-x-transparent flex justify-between p-3"
              >
                {/* image  */}
                <img
                  src={item.image}
                  alt="img"
                  className="h-20 w-16 object-cover"
                />
                {/* description  */}
                <div className="flex flex-col min-h-full w-full justify-center items-start gap-2  ml-3 capitalize">
                  <span className="leading-4 pr-1">
                    {item.name.length > 20
                      ? item.name.slice(0, 25) + "..."
                      : item.name}
                  </span>
                  <div className="flex text-xs">
                    <span>
                      size: {item.size} | color: {item.color}
                    </span>
                  </div>
                  {/* quantity  */}
                  <div className="flex w-fit gap-1 rounded-lg overflow-hidden">
                    <span className="select-none text-xs">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
                {/* price & remove */}
                <div className="flex flex-col self-end h-full justify-between text-end items-end">
                  <span className="font-bold">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
          {/* shipping total  */}
          <div className="mt-2 capitalize text-xs">
            <div className="flex w-full justify-between">
              <p>sub total</p>
              <p>${subTotalAmount}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>shipping charges</p>
              <p>${shippingCharges}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>taxes</p>
              <p>${taxes}</p>
            </div>
            <div className="flex w-full justify-between font-bold mt-2 pt-2 border-t border-t-slate-400 text-sm">
              <p>order total</p>
              <p>${orderTotal}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>discount</p>
              <p>${discount}</p>
            </div>
            <div className="flex w-full justify-between font-bold mt-2 pt-2 border-t border-t-slate-400 text-base">
              <p>final amount</p>
              <p>${finalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
