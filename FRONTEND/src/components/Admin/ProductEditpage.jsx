import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";


const ProductEditpage = ({editProduct}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  
   const {selectedProduct , loading, error} = useSelector(state => state.products)
  
  const [productDetails, setProductDetails] = useState({
      name: "",
      description: "",
      price: "",
      countInStock: "",
      sku: "",
      sizes: [],
      colors: [],
      images: []
  })

  const [uploading, setUploading] = useState(false);

  useEffect(()=>{
    if(id){
      dispatch(fetchProductDetails(id))
    }
  },[dispatch, id])

  useEffect(()=>{
    if(selectedProduct){
      setProductDetails(selectedProduct)
    }
  },[selectedProduct])



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await dispatch(updateProduct({ id, productData: productDetails })).unwrap();
    console.log("Product updated:", res);
    // Optionally: navigate("/admin/products");
  } catch (err) {
    console.error("Update failed:", err);
  }
};

  const handleChange = (e) => {
      const {name, value} = e.target;
      console.log({
          name: name,
          value: value
      }); 
      setProductDetails(prev => ({...prev, [name]: value})) 
      console.log(productDetails);
      
  }

  const handleImageUpload = async (e) => {
      const file = e.target.files[0]; 
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);

      try {
        setUploading(true);
        const {data}  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
          headers: { "Content-Type" : "multipart/form-data"}
        });
        setProductDetails((prev)=>({...prev, images: [...prev.images,  data.imageUrl ]}));
        setUploading(false)
      } catch (error) {
        console.error(error);
        setUploading(false)
      } 
  }

   const handleImageDelete = (indexToDelete) => {
     setProductDetails((prev) => ({
       ...prev,
       images: prev.images.filter((_, index) => index !== indexToDelete),
     }));
   };
  return (
    <div>
      <h2 className="text-2xl p-5 font-bold capitalize">
        edit product details
      </h2>
      <div className="p-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 border border-slate-300 shadow-2xl text-slate-800"
        >
          <label className="block mt-3 text-slate-500 text-sm capitalize">
            product name
          </label>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            description
          </label>
          <textarea
            type="text"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            price
          </label>
          <input
            type="text"
            name="price"
            onChange={handleChange}
            value={productDetails.price}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            count in stock
          </label>
          <input
            type="text"
            name="countInStock"
            value={productDetails.countInStock}
            onChange={handleChange}
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />
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
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            sizes (comma separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productDetails.sizes.join(" , ").toLocaleUpperCase()}
            onChange={(e) =>
              setProductDetails((prev) => ({
                ...prev,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              }))
            }
            className="border border-slate-300 outline-none w-full px-2 py-1 font-bold text-slate-600"
          />
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            colors (comma separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productDetails.colors.join(" , ").toLocaleUpperCase()}
            onChange={(e) =>
              setProductDetails((prev) => ({
                ...prev,
                colors: e.target.value.split(",").map((color) => color.trim()),
              }))
            }
            className="border border-slate-300 outline-none w-full px-2 py-1"
          />
          <label className="block mt-5 text-slate-500 text-sm capitalize">
            add images
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            name="images"
            className="border border-slate-100 shadow-2xl outline-none w-full px-2 py-1 text-xs text-slate-500 bg-slate-100"
          />
          <div className="flex gap-3 flex-wrap justify-center p-5 overflow-x-scroll my-scrollbar">
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

                {/* ❌ DELETE ICON */}
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute inset-0 bg-black/50 cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4xl flex justify-center items-center"
                >
                  <MdOutlineDeleteOutline/>
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 font-bold py-2 my-3 cursor-pointer transition-all duration-300 active:scale-95"
          >
            update product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductEditpage