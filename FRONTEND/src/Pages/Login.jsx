import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { google, login } from "../assets";

import { loginUser } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user, guestId} = useSelector(state => state.auth);
  const {cart} = useSelector(state => state.cart);

  // get redirect parameter and check if it's checkout or something else
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(()=>{
    if(user){
      if(cart?.products?.length > 0 && guestId){
        dispatch(mergeCart({guestId, user})).then(()=>{
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        })
      }else{
        navigate(isCheckoutRedirect ? "/checkout" : "/")
      }
    }
  },[user, guestId, cart, navigate, dispatch, isCheckoutRedirect])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}))
  };

  useEffect(() => {
    console.log("Component mounted");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex ">
      {/* login form  */}
      <div className="flex justify-center w-full ">
        <form
          onSubmit={handleSubmit}
          className="shrink-0 w-3/4 flex flex-col justify-center my-12"
        >
          <p className="text-4xl font-bold">Access Your Closet!</p>
          <p className="text-slate-600 mb-6">please enter your details</p>

          <a
            href="https://accounts.google.com/v3/signin/accountchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AdBytiMIueiqOTvlB2bUqmr6we2jeG2SC4p4KmqeQIblWhR9azfPyFY4ZH8iAlRPYBeYK8BuN0XUkQ&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S235287054%3A1754163434937473"
            className="border border-slate-300 px-2 py-1 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <img src={google} alt="google" className="size-4" />
            <span>sign in with google</span>
          </a>

          <div className="flex items-center gap-3 my-2">
            <span className="bg-slate-400 h-[0.5px] w-full"></span>
            <span>or</span>
            <span className="bg-slate-400 h-[0.5px] w-full"></span>
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
            <Link className="text-sky-600 text-sm underline">
              forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="py-2 bg-black text-white font-bold transition-all duration-300  cursor-pointer active:scale-95 hover:scale-105 my-3"
          >
            Sign in
          </button>
          <div className="flex justify-center items-center gap-1">
            <p className="text-sm">don’t have an account?</p>
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-sky-600 underline text-sm">
              sign up
            </Link>
          </div>
        </form>
      </div>
      {/* login image  */}
      <div className="hidden md:block w-full h-[520px] overflow-hidden">
        <img
          src={login}
          alt="banner image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
