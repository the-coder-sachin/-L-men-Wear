import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";
const OrdersManagement = () => {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orders, loading, error} = useSelector(state=>state.adminOrders);
  useEffect(()=>{
    dispatch(fetchAllOrders());
  },[dispatch])

  const getStatusColor = (status) =>{
    switch (status) {
      case "delivered" : return "green";
      case "shipped" : return "blue";
      case "cancelled" : return "red";
      case "processing" : return "teal";
      case "pending" : return "orange"
    }
  } 

  const gotToOrder = (e, id) =>{
    e.stopPropagation();
    navigate(`/order/${id}`)
  }
 const handleStatusUpdate = (e, orderId) => {
   e.stopPropagation();
   dispatch(updateOrderStatus({ id: orderId, status: e.target.value }));
 };


  if(loading) return <LoadingSpinner/>
  if(error) return <ErrorMessage/>

  return (
    <div>
      <h2 className="text-2xl font-bold capitalize p-5">orders management</h2>
      <div className="p-7 pb-20 overflow-auto my-scrollbar">
        <table className="shadow-2xl min-w-full border border-slate-200 text-nowrap">
          <thead>
            <tr className="uppercase text-sm">
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                order id
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                customer
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                total price
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                status
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                action
              </td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-slate-100 cursor-pointer"
                >
                  <td
                    onClick={(e) => gotToOrder(e, order._id)}
                    className="px-4 py-1 text-sm text-slate-700 border-b border-b-slate-200"
                  >
                    {order._id}
                  </td>
                  <td className="px-4 py-1 text-sm text-slate-700 border-b border-b-slate-200">
                    {order.user?.name || "not available"}
                  </td>
                  <td className="px-4 py-1 text-sm text-slate-700 border-b border-b-slate-200">
                    $ {order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-1 text-sm text-slate-700 border-b border-b-slate-200">
                    <select
                      name="status"
                      value={order.status}
                      onChange={(e) => {
                        handleStatusUpdate(e, order._id);
                      }}
                      className={`border border-slate-200 px-2 py-1`}
                      style={{
                        backgroundColor: `${getStatusColor(order.status)}20`, // 20 = light bg
                        color: getStatusColor(order.status),
                      }}
                    >
                      <option value="delivered">delivered</option>
                      <option value="processing">processing</option>
                      <option value="pending">pending</option>
                      <option value="shipped">shipped</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-1 text-sm text-slate-700 border-b border-b-slate-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          updateOrderStatus({
                            id: order._id,
                            status: "delivered",
                          })
                        );
                      }}
                      className="bg-green-500 text-white text-nowrap p-1"
                    >
                      mark as delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="animate-pulse text-center text-red-600 py-3 capitalize"
                >
                  no orders added . . .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement