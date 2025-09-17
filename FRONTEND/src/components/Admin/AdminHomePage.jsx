// const recentOrders = [
//   {
//     _id: "ORD001",
//     user: "Ravi Kumar",
//     price: 2499.99,
//     status: "Processing",
//   },
//   {
//     _id: "ORD002",
//     user: "Ayesha Khan",
//     price: 899.5,
//     status: "Shipped",
//   },
//   {
//     _id: "ORD003",
//     user: "John Doe",
//     price: 129.99,
//     status: "Delivered",
//   },
//   {
//     _id: "ORD004",
//     user: "Priya Sharma",
//     price: 349.0,
//     status: "Cancelled",
//   },
//   {
//     _id: "ORD005",
//     user: "Aman Verma",
//     price: 4999.0,
//     status: "Processing",
//   },

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../../redux/slices/adminOrderSlice";
import { useNavigate } from "react-router-dom";

// ];
const recentOrders = [
 
];

const AdminHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{ products, loading:productsLoading, error:productsError} = useSelector(state=>state.adminProducts);
  const {orders, totalOrders, totalSales, loading:orderLoading, error:orderError} = useSelector(state=>state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders())
  }, [])
  
  return (
    <div className="p-8">
      <h3 className="capitalize text-3xl font-bold">admin dashboard</h3>

      {/* cards  */}
      {productsLoading || orderLoading ? (
        <p>loading . . . . .</p>
      ) : productsError ? (
        <p>ERROR Loading Products... {productsError}</p>
      ) : orderLoading ? (
        <P>ERROR Loading Orders... {orderError}</P>
      ) : (
        <div className="mt-5 flex flex-col md:flex-row gap-6 items-stretch capitalize ">
          <div className="flex-1 shadow-lg p-3 border border-zinc-100">
            <p className="font-bold text-sm">revenue</p>
            <p className="text-green-600">${totalSales.toLocaleString()}</p>
            <button
              onClick={() => navigate("user-management")}
              className="text-lime-600 cursor-pointer bg-lime-200 w-full text-sm py-1 mt-2"
            >
              manage users
            </button>
          </div>
          <div className="flex-1 shadow-lg p-3 border border-zinc-100">
            <p className="font-bold text-sm">total orders</p>
            <p className="text-pink-500">{totalOrders}</p>
            <button
              onClick={() => navigate("orders")}
              className="text-sky-500 cursor-pointer bg-sky-100 w-full text-sm py-1 mt-2"
            >
              manage orders
            </button>
          </div>
          <div className="flex-1 shadow-lg p-3 border border-zinc-100">
            <p className="font-bold text-sm">total products</p>
            <p className="text-amber-600">{products.length}</p>
            <button
              onClick={() => navigate("products")}
              className="text-red-500 cursor-pointer bg-red-100 w-full text-sm py-1 mt-2"
            >
              manage products
            </button>
          </div>
        </div>
      )}

      {/* recent orders list  */}
      <div className="mt-7">
        <h3 className="capitalize text-xl font-bold">recent orders</h3>
        <table className="min-w-full border border-slate-200 my-3 shadow-2xl">
          <thead>
            <tr className="uppercase text-xs text-slate-600 bg-slate-200 font-bold">
              <td className="py-1 px-4">order id</td>
              <td className="py-1 px-4">user</td>
              <td className="py-1 px-4">price</td>
              <td className="py-1 px-4">status</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-xs text-slate-700 border-b border-b-slate-200 cursor-pointer hover:bg-slate-100"
                >
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.user?.name}</td>
                  <td className="p-3">$ {order.totalPrice.toLocaleString()}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr className="text-sm text-center text-red-600 uppercase">
                <td colSpan={4} className="py-5 animate-pulse">
                  no recent orders . .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
