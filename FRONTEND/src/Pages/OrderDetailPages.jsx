import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorMessage from "../components/Common/ErrorMessage";

const OrderDetailPages = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <LoadingSpinner/>;
  if (error) return <ErrorMessage/>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold capitalize mb-8">order details</h2>

      {/* container  */}
      <div className="border border-zinc-200 p-5 px-12 w-[90%] mx-auto gap-7 rounded sm:flex justify-between">
        {/* top  */}
        <div className="flex flex-col gap-7 justify-between">
          <div>
            <p className="font-bold ">order id: #{orderDetails?._id}</p>
            <p className="text-sm text-slate-600">
              ordered on:{" "}
              {new Date(orderDetails?.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-slate-600">
            <h3 className="font-black text-black text-lg capitalize mb-2">
              payment info
            </h3>
            <p>
              payment type:{" "}
              <span className="font-black text-black">
                {orderDetails?.paymentMethod}
              </span>
            </p>
            <p>
              status:{" "}
              <span
                className={`${
                  orderDetails?.isPaid
                    ? "text-green-500 font-bold "
                    : "text-red-500 font-bold "
                }`}
              >
                {orderDetails?.isPaid ? "paid" : "pending"}
              </span>
            </p>
          </div>
          <div className="text-slate-600">
            <h3 className="font-black text-black text-lg capitalize mb-2">
              shipping info
            </h3>
            <div className="">
              <p>
                customer name:{" "}
                <span className="text-black font-bold">
                  {orderDetails?.shippingDetails.firstName}{" "}
                  {orderDetails?.shippingDetails.lastName}
                </span>
              </p>

              <p>
                phone:{" "}
                <span className="text-black font-bold ">
                  {orderDetails?.shippingDetails.phone}
                </span>
              </p>
            </div>
            <p>
              order status:{" "}
              <span
                className={`${
                  orderDetails?.isDelivered
                    ? "text-green-500 font-bold "
                    : "text-red-500 font-bold "
                }`}
              >
                {orderDetails?.status}
              </span>
            </p>
            <p>
              address:{" "}
              <span className="text-black font-bold">
                {orderDetails?.shippingDetails.address},{" "}
                {orderDetails?.shippingDetails.city},{" "}
                {orderDetails?.shippingDetails.state},{" "}
                {orderDetails?.shippingDetails.country}
              </span>
            </p>
            <p>
              postal code:{" "}
              <span className="text-black font-bold">
                {orderDetails?.shippingDetails.postalCode},{" "}
              </span>
            </p>
          </div>
        </div>
        {/* bottom  */}
        <div className="mt-7 sm:mt-0">
          {orderDetails?.orderItems?.map((orderItem) => (
            <Link key={orderItem.productId} to={`/products/${orderItem?.productId}`}>
              <div className="p-3 text-sm bg-slate-100 rounded w-fit mx-auto">
                <img
                  src={orderItem.image}
                  className="size-44 rounded mx-auto"
                  alt=""
                />
                <div className="text-slate-600 capitalize h-full flex flex-col p-3">
                  <p className="text-lg text-black font-bold">
                    {orderItem.name}
                  </p>
                  <p>
                    quantity:{" "}
                    <span className="text-black font-bold">
                      {orderItem.quantity}
                    </span>
                  </p>
                  <p>
                    size:{" "}
                    <span className="font-bold text-black">
                      {orderItem.size ? orderItem.size : "na"}
                    </span>
                  </p>
                  <p>
                    color:{" "}
                    <span className="font-bold text-black uppercase">
                      {orderItem.color}
                    </span>
                  </p>
                  <p>
                    price:{" "}
                    <span className="text-black font-bold">
                      ${orderItem.price}
                    </span>
                  </p>
                  <p className=" text-gray-500 font-light">
                    MRP:{" "}
                    <span className="text-black font-bold">
                      ${orderItem.mrp}
                    </span>
                  </p>
                  <p className=" text-gray-500 font-light">
                    TOTAL:{" "}
                    <span className="text-black font-bold">
                      ${orderItem.price * orderItem.quantity}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* back to order  */}
      <div className="mt-5 flex items-center gap-1.5 border px-2 w-fit rounded-2xl border-slate-400 cursor-pointer transition-all duration-300 active:scale-95 mx-auto">
        <Link to={"/profile"} className="">
          back to orders
        </Link>
        <IoReturnUpBack />
      </div>
    </div>
  );
};

export default OrderDetailPages;
