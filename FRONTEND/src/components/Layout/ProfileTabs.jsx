import { useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../../redux/slices/orderSlice";

const ProfileTabs = ({ activeTab }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {orders, loading, error} = useSelector(state=> state.orders);
    
    useEffect(()=>{
       dispatch(fetchUserOrders())
    },[dispatch])
    
    
  const returns = [
    {
      _id: "rtn001",
      item: "https://picsum.photos/200?random=6",
      date: "2025-07-28",
      address: "Flat 23, Skyline Towers, Pune",
      quantity: 1,
      price: 121,
      reason: "Defective product",
      status: "processing",
    },
    {
      _id: "rtn002",
      item: "https://picsum.photos/200?random=7",
      date: "2025-07-26",
      address: "Villa 5, Palm Meadows, Hyderabad",
      quantity: 2,
      price: 240,
      reason: "Wrong item delivered",
      status: "approved",
    },
    {
      _id: "rtn003",
      item: "https://picsum.photos/200?random=8",
      date: "2025-07-24",
      address: "Block B2, Garden Residency, Jaipur",
      quantity: 1,
      price: 180,
      reason: "Size issue",
      status: "rejected",
    },
    {
      _id: "rtn004",
      item: "https://picsum.photos/200?random=9",
      date: "2025-07-22",
      address: "Bungalow 9, Race Course Road, Indore",
      quantity: 3,
      price: 300,
      reason: "Late delivery",
      status: "pending",
    },
    {
      _id: "rtn005",
      item: "https://picsum.photos/200?random=10",
      date: "2025-07-20",
      address: "Tower 8, Ocean Heights, Kochi",
      quantity: 1,
      price: 110,
      reason: "Different color",
      status: "approved",
    },
  ];

  const reviews = [
    {
      _id: "rev001",
      item: "https://picsum.photos/200?random=11",
      review: "Great product, totally satisfied!",
      likes: 12,
      dislikes: 1,
      date: "2025-07-22",
    },
    {
      _id: "rev002",
      item: "https://picsum.photos/200?random=12",
      review: "Packaging was not good, but product is okay.",
      likes: 5,
      dislikes: 3,
      date: "2025-07-21",
    },
    {
      _id: "rev003",
      item: "https://picsum.photos/200?random=13",
      review: "Received different item than ordered.",
      likes: 2,
      dislikes: 10,
      date: "2025-07-20",
    },
    {
      _id: "rev004",
      item: "https://picsum.photos/200?random=14",
      review: "Perfect fit and good quality!",
      likes: 18,
      dislikes: 0,
      date: "2025-07-19",
    },
    {
      _id: "rev005",
      item: "https://picsum.photos/200?random=15",
      review: "Average product for the price.",
      likes: 4,
      dislikes: 2,
      date: "2025-07-18",
    },
  ];

  const wishlist = [
    {
      _id: "wish001",
      item: "https://picsum.photos/200?random=16",
      title: "Casual Sneakers for Men",
      price: 1299,
      stock: "In Stock",
      addedOn: "2025-07-29",
    },
    {
      _id: "wish002",
      item: "https://picsum.photos/200?random=17",
      title: "Noise Cancelling Headphones",
      price: 3499,
      stock: "Out of Stock",
      addedOn: "2025-07-28",
    },
    {
      _id: "wish003",
      item: "https://picsum.photos/200?random=18",
      title: "Smart Fitness Band",
      price: 999,
      stock: "Limited",
      addedOn: "2025-07-27",
    },
    {
      _id: "wish004",
      item: "https://picsum.photos/200?random=19",
      title: "Cotton Printed T-Shirt",
      price: 499,
      stock: "In Stock",
      addedOn: "2025-07-25",
    },
    {
      _id: "wish005",
      item: "https://picsum.photos/200?random=20",
      title: "Wireless Bluetooth Speaker",
      price: 1999,
      stock: "Out of Stock",
      addedOn: "2025-07-23",
    },
  ];

  const paymentMethods = [
    {
      _id: "pay001",
      icon: "💳",
      method: "Credit Card",
      provider: "Visa",
      lastUsed: "2025-07-30",
      status: "Active",
    },
    {
      _id: "pay002",
      icon: "🏦",
      method: "Net Banking",
      provider: "HDFC Bank",
      lastUsed: "2025-07-28",
      status: "Inactive",
    },
    {
      _id: "pay003",
      icon: "📱",
      method: "UPI",
      provider: "PhonePe",
      lastUsed: "2025-07-27",
      status: "Active",
    },
    {
      _id: "pay004",
      icon: "💳",
      method: "Debit Card",
      provider: "MasterCard",
      lastUsed: "2025-07-25",
      status: "Expired",
    },
    {
      _id: "pay005",
      icon: "💼",
      method: "Wallet",
      provider: "Paytm",
      lastUsed: "2025-07-22",
      status: "Active",
    },
  ];

  const passwords = [
    {
      _id: "pass001",
      icon: "🔐",
      type: "Account Password",
      hint: "Your pet’s name",
      lastChanged: "2025-07-30",
      status: "Strong",
    },
    {
      _id: "pass002",
      icon: "🛡️",
      type: "Payment PIN",
      hint: "Last 4 digits of phone",
      lastChanged: "2025-07-28",
      status: "Weak",
    },
    {
      _id: "pass003",
      icon: "📲",
      type: "2FA Backup Code",
      hint: "Saved in your notes",
      lastChanged: "2025-07-26",
      status: "Expired",
    },
    {
      _id: "pass004",
      icon: "🔒",
      type: "Parental Lock",
      hint: "Favorite cartoon",
      lastChanged: "2025-07-20",
      status: "Strong",
    },
    {
      _id: "pass005",
      icon: "🧾",
      type: "Invoice Access PIN",
      hint: "Year of joining",
      lastChanged: "2025-07-18",
      status: "Weak",
    },
  ];

  const getColorForOrderStatus = (status) => {
    if (status === "pending") {
      return "#EF4444"; // Red
    }
    if (status === "processing") {
      return "#F97316"; // Orange
    }
    if (status === "shipped") {
      return "#3B82F6"; // Blue
    }
    if (status === "delivered") {
      return "#22C55E"; // Green
    }
  };

  function getColorForReturnStatus(status) {
    switch (status.toLowerCase()) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "rejected":
        return "red";
      default:
        return "black";
    }
  }

  const getColorForStockStatus = (status) => {
    switch (status.toLowerCase()) {
      case "in stock":
        return "green";
      case "out of stock":
        return "red";
      case "limited":
        return "orange";
      default:
        return "gray";
    }
  };


  const handleGetOrderDetails = (id)=>{
     navigate(`/order/${id}`)
  }

  if(activeTab === "orders"){
    return (
      <>
        {" "}
        {activeTab === "orders" && loading && (
          <p className="p-40 flex justify-center items-center text-3xl animate-pulse text-slate-500">
            loading.......
          </p>
        )}
        {activeTab === "orders" && error && (
          <p className="p-40 flex justify-center items-center text-3xl animate-pulse text-slate-500">
            ERROR: {error}
          </p>
        )}
        {/* order container  */}
        {activeTab === "orders" && orders.length > 0 && (
          <div className="w-full p-6 bg-gray-800">
            <table className="w-full table-auto border border-zinc-400 bg-zinc-200">
              <thead className="bg-black text-white">
                <tr className="border-b border-zinc-400">
                  <th className="text-start uppercase border-r border-zinc-400 pl-2 py-2">
                    Item
                  </th>
                  <th className="text-start uppercase border-r border-zinc-400 pl-2 py-2 hidden lg:table-cell">
                    Order ID
                  </th>
                  <th className="text-start uppercase border-r border-zinc-400 pl-2 py-2 hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-start uppercase border-r border-zinc-400 pl-2 py-2">
                    Address
                  </th>
                  <th className="text-center uppercase border-r border-zinc-400 px-2 py-2 hidden lg:table-cell">
                    Quantity
                  </th>
                  <th className="text-center uppercase border-r border-zinc-400 px-3 py-2">
                    Price
                  </th>
                  <th className="text-center uppercase px-3 py-2">Status</th>
                </tr>
              </thead>

              <tbody className="bg-gray-100 text-slate-700 text-sm">
                {orders.map((o) =>
                  o.orderItems.map((order, index) => (
                    <tr
                      key={`${o._id}-${index}`}
                      onClick={() => handleGetOrderDetails(o._id)}
                      className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                    >
                      <td className="border-r border-zinc-400 p-2 flex items-center justify-center">
                        <img
                          src={order.image}
                          alt="product"
                          className="w-12 h-12 object-cover"
                        />
                      </td>

                      <td className="border-r border-zinc-400 pl-2 py-2 hidden lg:table-cell">
                        {o._id}
                      </td>

                      <td className="border-r border-zinc-400 pl-2 py-2 hidden lg:table-cell">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>

                      <td className="border-r border-zinc-400 px-2 py-2 capitalize">
                        {o.shippingDetails.address}, {o.shippingDetails.city},{" "}
                        {o.shippingDetails.state}, {o.shippingDetails.country}
                      </td>

                      <td className="border-r border-zinc-400 text-center px-2 py-2 hidden lg:table-cell">
                        {order.quantity}
                      </td>

                      <td className="border-r border-zinc-400 text-center px-3 py-2">
                        ₹{order.price}
                      </td>

                      <td
                        className="text-center px-3 py-2 font-bold"
                        style={{ color: getColorForOrderStatus(o.status) }}
                      >
                        {o.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }else{

  return (
    <>
     

      {/* return section  */}
      {activeTab === "returns" && (
        <div className="w-full p-6 bg-gray-800">
          <table className="bg-zinc-200 w-full table-auto border border-zinc-400">
            <thead className="text-white bg-black">
              <tr className="border-b border-zinc-400">
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Item
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2 hidden lg:table-cell">
                  Return ID
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2 hidden lg:table-cell">
                  Date
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2 hidden lg:table-cell">
                  Address
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Reason
                </th>
                <th className="text-center border-r border-zinc-400 uppercase px-2 py-2 hidden lg:table-cell">
                  Quantity
                </th>
                <th className="text-center border-r border-zinc-400 uppercase px-3 py-2">
                  Price
                </th>
                <th className="text-center border-zinc-400 uppercase px-3 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm bg-gray-100 text-slate-700">
              {returns.map((ret) => (
                <tr
                  key={ret._id}
                  className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="border-r border-zinc-400 p-2 flex justify-center items-center">
                    <img
                      src={ret.item}
                      alt="returned-product"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2 hidden lg:table-cell">
                    {ret._id}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2 hidden lg:table-cell">
                    {ret.date}
                  </td>
                  <td className="border-r border-zinc-400 px-2 py-2 hidden lg:table-cell">
                    {ret.address}
                  </td>
                  <td className="border-r border-zinc-400 px-2 py-2">
                    {ret.reason}
                  </td>
                  <td className="border-r border-zinc-400 text-center px-2 py-2 hidden lg:table-cell">
                    {ret.quantity}
                  </td>
                  <td className="border-r border-zinc-400 text-center px-3 py-2">
                    ₹{ret.price}
                  </td>
                  <td
                    className="text-center px-3 py-2 font-bold"
                    style={{ color: getColorForReturnStatus(ret.status) }}
                  >
                    {ret.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* review tab  */}
      {activeTab === "reviews" && (
        <div className="w-full p-6 bg-gray-800">
          <table className="bg-zinc-200 w-full table-auto border border-zinc-400">
            <thead className="text-white bg-black">
              <tr className="border-b border-zinc-400">
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Item
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Review
                </th>
                <th className="text-center border-r border-zinc-400 uppercase">
                  <div className="flex h-full justify-center items-center">
                    <BiLike />
                  </div>
                </th>
                <th className="text-center border-r border-zinc-400 uppercase px-3 py-2">
                  <div className="flex h-full justify-center items-center">
                    <BiDislike />
                  </div>
                </th>
                <th className="text-start border-zinc-400 uppercase pl-2 py-2 hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-sm bg-gray-100 text-slate-700">
              {reviews.map((rev) => (
                <tr
                  key={rev._id}
                  className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="border-r border-zinc-400 p-2 flex justify-center items-center">
                    <img
                      src={rev.item}
                      alt="reviewed-item"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2">
                    {rev.review}
                  </td>
                  <td className="border-r border-zinc-400 text-center px-3 py-2 text-green-500 font-bold">
                    {rev.likes}
                  </td>
                  <td className="border-r border-zinc-400 text-center px-3 py-2 text-red-500 font-bold">
                    {rev.dislikes}
                  </td>
                  <td className="pl-2 py-2 hidden lg:table-cell">{rev.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* wishlist tab  */}
      {activeTab === "wishlist" && (
        <div className="w-full p-6 bg-gray-800">
          <table className="bg-zinc-200 w-full table-auto border border-zinc-400">
            <thead className="text-white bg-black">
              <tr className="border-b border-zinc-400">
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Item
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Title
                </th>
                <th className="text-center border-r border-zinc-400 uppercase px-3 py-2">
                  Price
                </th>
                <th className="text-center border-r border-zinc-400 uppercase px-3 py-2">
                  Stock
                </th>
                <th className="text-start border-zinc-400 uppercase pl-2 py-2 hidden lg:table-cell">
                  Added On
                </th>
              </tr>
            </thead>
            <tbody className="text-sm bg-gray-100 text-slate-700">
              {wishlist.map((wish) => (
                <tr
                  key={wish._id}
                  className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="border-r border-zinc-400 p-2 flex justify-center items-center">
                    <img
                      src={wish.item}
                      alt="wishlist-item"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2">
                    {wish.title}
                  </td>
                  <td className="border-r border-zinc-400 text-center px-3 py-2">
                    ₹{wish.price}
                  </td>
                  <td
                    className="border-r border-zinc-400 text-center px-3 py-2 font-bold"
                    style={{ color: getColorForStockStatus(wish.stock) }}
                  >
                    {wish.stock}
                  </td>
                  <td className="pl-2 py-2 hidden lg:table-cell">
                    {wish.addedOn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* payment tab  */}
      {activeTab === "payment" && (
        <div className="w-full p-6 bg-gray-800">
          <table className="bg-zinc-200 w-full table-auto border border-zinc-400">
            <thead className="text-white bg-black">
              <tr className="border-b border-zinc-400">
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Icon
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Method
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Provider
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2 lg:hidden">
                  Last Used
                </th>
                <th className="text-center border-zinc-400 uppercase px-3 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm bg-gray-100 text-slate-700">
              {paymentMethods.map((pay) => (
                <tr
                  key={pay._id}
                  className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="border-r border-zinc-400 text-center text-xl px-2 py-2">
                    {pay.icon}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2">
                    {pay.method}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2">
                    {pay.provider}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2 lg:hidden">
                    {pay.lastUsed}
                  </td>
                  <td
                    className="text-center px-3 py-2 font-semibold"
                    style={{
                      color:
                        pay.status === "Active"
                          ? "green"
                          : pay.status === "Expired"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {pay.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* password tab  */}
      {activeTab === "password" && (
        <div className="w-full p-6 bg-gray-800">
          <table className="bg-zinc-200 w-full table-auto border border-zinc-400">
            <thead className="text-white bg-black">
              <tr className="border-b border-zinc-400">
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Icon
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Type
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2">
                  Hint
                </th>
                <th className="text-start border-r border-zinc-400 uppercase pl-2 py-2 lg:hidden">
                  Last Changed
                </th>
                <th className="text-center border-zinc-400 uppercase px-3 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm bg-gray-100 text-slate-700">
              {passwords.map((pwd) => (
                <tr
                  key={pwd._id}
                  className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="border-r border-zinc-400 text-center text-xl px-2 py-2">
                    {pwd.icon}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2">
                    {pwd.type}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2">
                    {pwd.hint}
                  </td>
                  <td className="border-r border-zinc-400 pl-2 py-2 lg:hidden">
                    {pwd.lastChanged}
                  </td>
                  <td
                    className="text-center px-3 py-2 font-semibold"
                    style={{
                      color:
                        pwd.status === "Strong"
                          ? "green"
                          : pwd.status === "Weak"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {pwd.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};}

export default ProfileTabs;
