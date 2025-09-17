import { purse1 } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { IoBagCheck } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';
import ProfileTabs from '../components/Layout/ProfileTabs';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../redux/slices/AuthSlice';
import { clearCart } from '../redux/slices/cartSlice';
import axios from 'axios';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Cache userId once from Redux user object
  const userId = user?.id;

    const [activeTab, setActiveTab] = useState('orders'); 

  // Local username state
  const [username, setUsername] = useState(user?.name || "");

  // Local userData state (name is synced with username)
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    image: user?.image || "",
  });

  const [uploading, setUploading] = useState(false);

  // Keep userData.name synced with username
  useEffect(() => {
    setUserData(prev => ({ ...prev, name: username }));
  }, [username]);

  // Redirect if no user logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  const handleUpdateProfile = () => {
    dispatch(updateUser({ id: userId, userData }))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!",{duration:1000});
      })
      .catch((error) => {
        toast.error(`Failed to update profile: ${error.message || error}`, {duration:1000});
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserData(prev => ({ ...prev, image: data.imageUrl }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleImageDelete = () => {
    setUserData(prev => ({ ...prev, image: "" }));
    handleUpdateProfile()
  };

  return (
    <div>
      {/* profile section  */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center p-5">
          <div className="flex gap-4">
            <div>
              <div className="img rounded group relative size-[70px] md:size-[100px] border-4 border-white shadow-2xl flex justify-center items-center">
                <img
                  src={userData.image || "/user.png"}
                  alt="profile"
                  className={`${
                    userData.image ? "h-full w-full" : "size-[40px]"
                  } object-cover rounded`}
                />

                {/* Show spinner overlay only when loading/uploading */}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-20">
                    <svg
                      className="animate-spin h-8 w-8 text-yellow-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </div>
                )}

                {/* File input overlay only when NOT loading */}
                {!uploading && (
                  <div className="h-full w-full bg-black/70 absolute inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center text-3xl cursor-pointer transition-all active:scale-75 duration-500">
                    <label className="text-white cursor-pointer">
                      <FaUserEdit />
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                )}
              </div>
              {userData.image && (
                <button
                  onClick={handleImageDelete}
                  className="text-rose-600 text-xs underline cursor-pointer mt-1"
                >
                  remove profile photo
                </button>
              )}
            </div>
            <div>
              <div className="flex flex-col gap-3">
                <p className="text-slate-600 text-xs">{user?.email}</p>
                <input
                  className="font-bold capitalize outline-1 rounded outline-gray-400 px-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  onClick={handleUpdateProfile}
                  className="bg-black text-yellow-300 rounded cursor-pointer transition-all active:scale-95 duration-300"
                >
                  update profile
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white capitalize px-2 py-1 rounded cursor-pointer transition-all duration-300 hover:bg-red-600 active:scale-95"
            >
              logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex w-full">
          {[
            {
              id: "orders",
              icon: <IoBagCheck className="hidden md:inline" />,
              label: "Orders",
            },
            {
              id: "returns",
              icon: <MdBlock className="hidden md:inline" />,
              label: "Returns",
            },
            {
              id: "reviews",
              icon: <MdOutlineRateReview className="hidden md:inline" />,
              label: "Reviews",
            },
            {
              id: "wishlist",
              icon: <IoIosHeart className="hidden md:inline" />,
              label: "Wishlist",
            },
            {
              id: "payment",
              icon: <FaMoneyCheckDollar className="hidden md:inline" />,
              label: "Payment",
              hiddenOnLg: true,
            },
            {
              id: "password",
              icon: <RiLockPasswordFill className="hidden md:inline" />,
              label: "Password",
              hiddenOnLg: true,
            },
          ].map(({ id, icon, label, hiddenOnLg }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-2 text-sm md:text-base border font-bold tracking-wide justify-center transition-all duration-300 active:scale-95 w-full gap-2 items-center flex
                ${
                  activeTab === id
                    ? "bg-gray-800 text-white border-gray-800"
                    : "text-slate-700 border-zinc-200 hover:bg-gray-300"
                }
                ${hiddenOnLg ? "hidden lg:flex" : ""}
              `}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* order section  */}
      <ProfileTabs activeTab={activeTab} />
    </div>
  );
};

export default Profile;
