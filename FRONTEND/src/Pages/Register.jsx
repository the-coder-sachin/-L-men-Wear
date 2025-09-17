import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { google, login } from "../assets";
import { registerUser } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";


const Register = () => {
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const { user, guestId } = useSelector((state) => state.auth);
const { cart } = useSelector((state) => state.cart);

// get redirect parameter and check if it's checkout or something else
const redirect = new URLSearchParams(location.search).get("redirect") || "/";
const isCheckoutRedirect = redirect.includes("checkout");

useEffect(() => {
  if (user) {
    if (cart?.products?.length > 0 && guestId) {
      dispatch(mergeCart({ guestId, user })).then(() => {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      });
    } else {
      navigate(isCheckoutRedirect ? "/checkout" : "/");
    }
  }
}, [user, guestId, cart, navigate, dispatch, isCheckoutRedirect]);

const handleSubmit = (e)=>{
    e.preventDefault();
    let name = firstName + " " + lastName
    dispatch(registerUser({ name, email, password}))
}

 useEffect(() => {
   console.log("Component mounted");
   window.scrollTo(0, 0);
 }, []);

    return (
      <div className="flex ">
        {/* register form  */}
        <div className="flex justify-center w-full">
          <form
            onSubmit={handleSubmit}
            className="shrink-0 w-3/4 flex flex-col justify-center my-12"
          >
            <p className="text-4xl font-bold">Get Your New Closet!</p>
            <p className="text-slate-600 mb-6">please enter your details</p>

            <div className="mb-3">
              <label htmlFor="firstName">first name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="py-2 px-2 pl-4 outline-none border border-slate-300 block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="py-2 px-2 pl-4 outline-none border border-slate-300 block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-2 px-2 pl-4 outline-none border border-slate-300 block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-2 px-2 pl-4 outline-none border border-slate-300 block w-full"
              />
            </div>
            <div className="flex text-xs gap-6 justify-between">
              <div className="flex items-center gap-1">
                <input type="checkbox" className="" />
                <span>remember for 10 days?</span>
              </div>
            </div>
            <button
              type="submit"
              className="py-2 bg-black text-white font-bold transition-all duration-300  cursor-pointer active:scale-95 hover:scale-105 my-3"
            >
              Sign up
            </button>
            <div className="flex justify-center items-center gap-1">
              <p className="text-sm">already have an account?</p>
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-sky-600 underline text-sm">
                sign in
              </Link>
            </div>
          </form>
        </div>
        {/* login image  */}
        <div className="hidden lg:block w-full h-[600px] overflow-hidden ">
          <img
            src={login}
            alt="banner image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
}

export default Register