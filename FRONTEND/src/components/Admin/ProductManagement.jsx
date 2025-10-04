import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";

const ProductManagement = () => {
  

  const dispatch = useDispatch();
  const{products, loading, error} = useSelector(state=>state.adminProducts)
  const navigate = useNavigate();

 

  useEffect(()=>{
    dispatch(fetchAdminProducts());
  },[dispatch])

  const handleEdit = (e, productId) =>{
      e.stopPropagation();
      navigate('edit/'+ productId)
  }
  const goToProduct = (e, productId) =>{
      e.stopPropagation()
      navigate('/products/'+ productId)
  }

const handleDelete = (e, productId) => {
  e.stopPropagation();
  toast("this feature is disabled for secuirty reasons",{duration: 2000})
};

// const handleDelete = (e, productId) => {
//   e.stopPropagation();

//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this product?"
//   );

//   if (confirmDelete) {
//     dispatch(deleteProduct(productId));
//   }
// };


  return (
    <div>
      <h2 className="text-2xl font-bold capitalize p-5">product management</h2>
      <div className="p-5">
        <button
        onClick={()=>navigate('add/')}
        className="bg-black text-white hover:bg-black/90 active:scale-95 transition-all duration-300 cursor-pointer font-bold uppercase px-2 py-1 rounded">click to add a new product</button>
      </div>
      <div className="mb-20 p-5 pb-16 overflow-auto my-scrollbar text-nowrap">
        <table className="shadow-2xl min-w-full border border-slate-200">
          <thead>
            <tr className="uppercase text-sm">
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                S NO.
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                name
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                price
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                SKU
              </td>
              <td className="px-4 py-1 font-bold text-slate-600 bg-slate-200">
                action
              </td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  onClick={(e)=>goToProduct(e,product._id)}
                  className="hover:bg-slate-100 cursor-pointer"
                >
                  <td className="px-4 py-2 text-sm text-slate-700 border-b border-b-slate-200">
                    {index+1}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 border-b border-b-slate-200">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 border-b border-b-slate-200">
                    $ {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 border-b border-b-slate-200">
                    {product.sku}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 border-b border-b-slate-200">
                    <div className="flex items-center">
                      <FaRegEdit
                        onClick={(e) => handleEdit(e,product._id)}
                        className="size-4 text-amber-500"
                      />
                      <MdOutlineDeleteOutline onClick={(e)=>handleDelete(e,product._id)} className="size-5 text-red-600" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="animate-pulse text-center text-red-600 py-3 capitalize"
                >
                  no products added . . .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
