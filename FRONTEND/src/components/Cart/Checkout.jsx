import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState("");

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || !cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const validateShippingDetails = () => {
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
    } = shippingAddress;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim() ||
      !country.trim() ||
      !phone.trim()
    ) {
      toast("Please fill in all fields.",{duration: 1000});
      return false;
    }

    // Phone validation: at least 10 digits
    if (!/^\d{10,}$/.test(phone)) {
      toast("Please enter a valid phone number (at least 10 digits).", {duration: 1000});
      return false;
    }

    // Postal code validation: 4-10 digits/letters
    if (!/^[a-zA-Z0-9]{4,10}$/.test(postalCode)) {
      toast("Please enter a valid postal code.", {duration: 1000});
      return false;
    }

    return true;
  };


  const subTotalAmount = Math.floor(
    cart.products.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0)
  );

  const shippingCharges = subTotalAmount > 1000 ? 40 : 120;
  const taxes = Math.round((30 / 100) * subTotalAmount);

  const orderTotal = subTotalAmount + shippingCharges + taxes;

  const discount = Math.ceil(orderTotal - Math.floor(orderTotal / 100) * 100);

  const finalAmount = orderTotal - discount;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateShippingDetails()){
    setIsSubmitting(true);
    console.log(shippingAddress);

    if (cart && cart.products.length > 0) {
      // 3-second delay before checkout
      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingDetails: shippingAddress,
            paymentMethod: "credit card",
            totalPrice: finalAmount,
          })
        );

        console.log("res-payload:", res);

        if (res.payload && res.payload._id) {
          setCheckoutId(res.payload._id);
          navigate("/order-confirmation");
        } else {
          console.log("Payment failed or no payload received");
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    }
  }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <p className="p-12 flex items-center justify-center text-4xl">
        loading....
      </p>
    );
  }
  if (error) {
    return (
      <p className="p-12 flex items-center justify-center text-4xl">{error}</p>
    );
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <p className="p-12 flex items-center justify-center text-4xl">
        your cart is empty ........
      </p>
    );
  }

  return (
    <div className="">
      {/* overlay */}
      {isSubmitting && (
        <div className="fixed h-full w-full bg-black/80 flex justify-center items-center inset-0 z-100">
          <p className="text-white text-5xl font-bold w-3/4 text-center animate-pulse">
            hold on your payment is in process . . .
          </p>
        </div>
      )}
      <div
        className={`flex flex-col-reverse p-6 lg:p-8 lg:flex-row overflow-hidden`}
      >
        {/* left - shipping address form */}
        <div className="p-8 grow">
          <p className="text-3xl font-bold uppercase tracking-wider">
            checkout
          </p>
          <div className="flex flex-col w-full my-5">
            <label className="block text-sm">your email</label>
            <input
              type="email"
              readOnly
              placeholder="example@gmail.com"
              className="border rounded border-gray-200 py-1 px-2 outline-none text-gray-500"
              value={user.email}
            />
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <p className="font-bold capitalize">enter your details</p>
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="block text-sm">first name</label>
                <input
                  type="text"
                  placeholder=""
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className="border rounded border-gray-200 py-1 px-2 outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm">last name</label>
                <input
                  type="text"
                  placeholder=""
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className="border rounded border-gray-200 py-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="block text-sm">address</label>
              <input
                type="text"
                placeholder=""
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="border rounded border-gray-200 py-1 px-2 outline-none"
              />
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="block text-sm">city</label>
                <input
                  type="text"
                  placeholder=""
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className="border rounded border-gray-200 py-1 px-2 outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm">state</label>
                <input
                  type="text"
                  placeholder=""
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value,
                    })
                  }
                  className="border rounded border-gray-200 py-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="block text-sm">postal code</label>
                <input
                  type="text"
                  placeholder=""
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className="border rounded border-gray-200 py-1 px-2 outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm">country</label>
                <input
                  type="text"
                  placeholder=""
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  className="border rounded border-gray-200 py-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="block text-sm">phone</label>
              <input
                type="number"
                placeholder=""
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="border rounded border-gray-200 py-1 px-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white font-bold py-2 rounded transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:opacity-90"
            >
              proceed to pay
            </button>
          </form>
        </div>

        {/* right  */}
        <div className="p-8 bg-slate-200 grow text-xs md:text-sm">
          <p className="text-3xl font-bold">order summary</p>
          {/* items list  */}
          <div>
            {cart?.products.map((item, idx) => (
              <div
                key={idx}
                className="mt-3 shadow-[0px_6px_5px_0.1px_rgba(255,255,255,0.06)] border border-slate-400 border-x-transparent flex justify-between p-3"
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
    </div>
  );
};

export default Checkout;
