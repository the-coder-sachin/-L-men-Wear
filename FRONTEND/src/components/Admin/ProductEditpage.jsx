import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";


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

function getContrastColor(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#36454F" : "#BEBEBE";
}

const ProductEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct } = useSelector((state) => state.products);

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    sizes: [],
    colors: [],
    images: [],
    material: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductDetails(selectedProduct);
    }
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(productDetails);
      
      await dispatch(
        updateProduct({ id, productData: productDetails })
      ).unwrap();
      navigate("/admin/products");
    } catch (err) {
      console.error("Update failed:", err);
    }
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
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = (indexToDelete) => {
    setProductDetails((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleClearSelection = (field) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? [] : "",
    }));
  };

  return (
    <div>
      <h2 className="text-2xl p-5 font-bold capitalize">
        Edit Product Details
      </h2>
      <div className="p-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 border border-slate-300 shadow-2xl text-slate-800"
        >
          {/* Reset Button */}
          <button
            type="button"
            onClick={() => setProductDetails(selectedProduct)}
            className="text-red-500 underline mb-4"
          >
            Reset Changes
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
            Price ($)
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
            MRP ($)
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
            Count In Stock
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

          {/* Material */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Material
          </label>
          <div className="flex flex-wrap gap-2">
            {materialOptions.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() =>
                  setProductDetails((prev) => ({
                    ...prev,
                    material: prev.material === m ? "" : m,
                  }))
                }
                className={`border px-2 py-1 cursor-pointer ${
                  productDetails.material === m
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
            onClick={() => handleClearSelection("material")}
            className="text-blue-500 text-sm underline mt-2 cursor-pointer"
          >
            Clear Material
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
            onClick={() =>
              setProductDetails((prev) => ({ ...prev, sizes: sizeOptions }))
            }
            className="text-green-700 text-sm bg-green-200 mt-2 cursor-pointer px-1 mr-5"
          >
            All Sizes Available
          </button>
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
                style={{
                  backgroundColor: c,
                  color: getContrastColor(c),
                }}
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

          {/* Images */}
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            Add Images
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            name="images"
            className="border border-slate-100 shadow-2xl outline-none w-full px-2 py-1 text-xs text-slate-500 bg-slate-100"
          />
          <div className="flex gap-3 flex-wrap justify-center p-5 overflow-x-scroll my-scrollbar">
            {uploading && "Uploading..."}
            {productDetails.images.map((image, index) => (
              <div
                key={index}
                className="relative group size-28 bg-slate-100 rounded overflow-hidden"
              >
                <img
                  src={typeof image === "string" ? image : image.url}
                  alt="img"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute inset-0 bg-black/50 cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4xl flex justify-center items-center"
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-400 font-bold py-2 my-3 cursor-pointer transition-all duration-300 active:scale-95"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
