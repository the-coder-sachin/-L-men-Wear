import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const AddProductPage = () => {
  const { user } = useSelector((state) => state.auth);

  const genderOptions = ["men", "women", "unisex"];
  const colorOptions = [
    "#0D0D0D",
    "#FFFFFF",
    "#FFFFF0",
    "#F5F5DC",
    "#E3BC9A",
    "#C19A6B",
    "#5C4033",
    "#3D2C1F",
    "#36454F",
    "#BEBEBE",
    "#C0C0C0",
    "#D4AF37",
    "#000080",
    "#191970",
    "#87CEEB",
    "#808000",
    "#F0E68C",
    "#228B22",
    "#50C878",
    "#800020",
    "#722F37",
    "#800000",
    "#B22222",
    "#B7410E",
    "#E2725B",
    "#FFA500",
    "#FFE5B4",
    "#FADADD",
    "#FFC0CB",
    "#FFB6C1",
    "#D8A39D",
    "#E0B0FF",
    "#C8A2C8",
    "#E6E6FA",
    "#800080",
    "#FFDB58",
    "#FFFF00",
    "#FFFDD0",
    "#1560BD",
    "#483C32",
  ];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const materialOptions = [
    "Cotton",
    "Organic Cotton",
    "Linen",
    "Silk",
    "Satin",
    "Wool",
    "Cashmere",
    "Merino Wool",
    "Mohair",
    "Alpaca",
    "Leather",
    "Suede",
    "Denim",
    "Tweed",
    "Velvet",
    "Chiffon",
    "Georgette",
    "Jersey",
    "Viscose",
    "Rayon",
    "Modal",
    "Lyocell (TENCEL™)",
    "Polyester",
    "Nylon",
    "Acrylic",
    "Elastane (Spandex)",
    "Cupro",
    "Bamboo",
    "Hemp",
    "Lace",
    "Mesh",
  ];

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    gender: "",
    mrp: "",
    sku: "",
    sizes: [],
    colors: [],
    material: [],
    images: [],
    user: user.id,
  });

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productDetails));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProductDetails((prev) => ({
        ...prev,
        images: [...prev.images, data.imageUrl],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleClearSelection = (field) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? [] : "",
    }));
  };

  const isSubmitDisabled = () => {
    const { name, description, price, mrp, countInStock, sku, images } =
      productDetails;
    return (
      !name ||
      !description ||
      !price ||
      !mrp ||
      !countInStock ||
      !sku ||
      images.length === 0
    );
  };
  function getContrastColor(hex) {
    // Remove "#" if present
    hex = hex.replace("#", "");

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white based on brightness
    return brightness > 150 ? "#36454F" : "#BEBEBE";
  }

  return (
    <div>
      <h2 className="text-2xl p-5 font-bold capitalize">Add Product Details</h2>
      <div className="p-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 border border-slate-300 shadow-2xl text-slate-800"
        >
          {/* Form Reset Button */}
          <button
            type="button"
            onClick={() =>
              setProductDetails({
                name: "",
                description: "",
                price: "",
                countInStock: "",
                gender: "",
                mrp: "",
                sku: "",
                sizes: [],
                colors: [],
                materials: [],
                images: [],
                user: user.id,
              })
            }
            className="text-red-500 underline mb-4"
          >
            Reset Form
          </button>

          {/* Product Name */}
          <label className="block mt-3 text-slate-500 text-sm capitalize">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />

          {/* Description */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Description
          </label>
          <textarea
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />

          {/* Price */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />

          {/* MRP */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            MRP
          </label>
          <input
            type="number"
            name="mrp"
            value={productDetails.mrp}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />

          {/* Gender */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Gender
          </label>
          <select
            name="gender"
            value={productDetails.gender}
            onChange={handleChange}
            className="block border border-slate-300 w-full"
          >
            <option value="">Select Gender</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleClearSelection("gender")}
            className="text-blue-500 text-sm underline mt-2 cursor-pointer"
          >
            Clear Gender
          </button>

          {/* Count in Stock */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Count in Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productDetails.countInStock}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />

          {/* SKU */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productDetails.sku}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />

          {/* Materials */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Materials
          </label>
          <div className="flex flex-wrap gap-2">
            {materialOptions.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() =>
                  setProductDetails((prev) => ({
                    ...prev,
                    materials: prev.materials.includes(m)
                      ? prev.materials.filter((mat) => mat !== m)
                      : [...prev.materials, m],
                  }))
                }
                className={`border px-2 py-1 cursor-pointer ${
                  productDetails.materials.includes(m)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleClearSelection("materials")}
            className="text-blue-500 text-sm underline mt-2 cursor-pointer"
          >
            Clear Materials
          </button>

          {/* Sizes */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Sizes
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  setProductDetails((prev) => ({
                    ...prev,
                    sizes: prev.sizes.includes(s)
                      ? prev.sizes.filter((sz) => sz !== s)
                      : [...prev.sizes, s],
                  }))
                }
                className={`border px-2 py-1 cursor-pointer ${
                  productDetails.sizes.includes(s)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleClearSelection("sizes")}
            className="text-blue-500 text-sm underline mt-2 cursor-pointer"
          >
            Clear Sizes
          </button>

          {/* Colors */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Colors
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() =>
                  setProductDetails((prev) => ({
                    ...prev,
                    colors: prev.colors.includes(c)
                      ? prev.colors.filter((col) => col !== c)
                      : [...prev.colors, c],
                  }))
                }
                style={{ backgroundColor: c, }}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  productDetails.colors.includes(c)
                    ? "border-4 border-blue-500"
                    : ""
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleClearSelection("colors")}
            className="text-blue-500 text-sm underline mt-2 cursor-pointer"
          >
            Clear Colors
          </button>

          {/* Image Upload */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Add Images
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            name="images"
            className="border cursor-pointer border-slate-100 shadow-2xl outline-none w-full px-2 py-1 text-xs text-slate-500 bg-slate-100"
          />
          <div className="flex gap-3 flex-wrap justify-center p-5 overflow-x-scroll my-scrollbar">
            {uploading && "Uploading..."}
            {productDetails.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt="img"
                className="size-28 bg-slate-100"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitDisabled()}
            className={`w-full py-2 my-3 transition-all duration-300 ${
              isSubmitDisabled()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-400 cursor-pointer"
            }`}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
