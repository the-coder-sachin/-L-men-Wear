import { useEffect, useRef, useState } from "react";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSimilarProducts,
  fetchProductDetails,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import SimilarProducts from "./SimilarProducts";
import LoadingSpinner from "../Common/LoadingSpinner";

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const imageRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [currentImg, setCurrentImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToBag, setIsAddingToBag] = useState(false);

  const fetchProductId = productId || id;
   
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [fetchProductId, id]);

  useEffect(() => {
    if (fetchProductId) {
      dispatch(fetchProductDetails(fetchProductId));
      dispatch(fetchSimilarProducts({ id: fetchProductId }));
    }
  }, [dispatch, fetchProductId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setCurrentImg(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleMouseMove = (e) => {
    const { left, top } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setPosition({ x, y });
  };

  const addToBag = (e) => {
    // Check if color is required
    if (selectedProduct.colors?.length > 0 && !selectedColor) {
      toast.error("Please choose a color", {duration: 1000});
      return;
    }

    // Check if size is required
    if (selectedProduct.size?.length > 0 && !selectedSize) {
      toast.error("Please choose a size", {duration: 1000});
      return;
    }

    setIsAddingToBag(true);
     dispatch(
      addToCart({
        productId: fetchProductId,
        quantity,
        size: selectedSize || null,
        color: selectedColor || null,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success(`Adding ${selectedProduct.name} to your bag`, {duration: 1000});
      })
      .finally(() => {
        setIsAddingToBag(false);
      });
  };


  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!selectedProduct) {
    return <p>No product found.</p>;
  }

  return (
    <section data-scroll className="overflow-hidden">
      
      <div className="flex flex-col md:flex-row mt-5">
        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row gap-5 px-10 items-center justify-center">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 justify-center">
            {selectedProduct?.images?.map((img, i) => (
              <img
                key={i}
                onClick={() => setCurrentImg(img)}
                src={img}
                alt="product"
                className="size-16 border border-slate-200 object-cover object-top"
              />
            ))}
          </div>

          {/* Main Image */}
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            className="size-[350px] relative"
          >
            <img
              src={currentImg}
              alt="product"
              className="object-cover h-full min-w-full"
            />
            {showZoom && (
              <div
                className="zoom-box absolute size-[280px] bg-no-repeat pointer-events-none z-[10] rounded-full border-2 border-slate-300 shadow-2xl"
                style={{
                  backgroundImage: `url(${currentImg})`,
                  backgroundSize: `700%`,
                  backgroundPosition: `${
                    (position.x / imageRef.current.offsetWidth) * 100
                  }% ${(position.y / imageRef.current.offsetHeight) * 100}%`,
                  top: position.y - 140,
                  left: position.x - 140,
                }}
              ></div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col px-10 pt-10 gap-1 justify-center">
          <h3 className="text-4xl font-extrabold mb-2 capitalize">
            {selectedProduct.name}
          </h3>
          <p className="text-lg font-semibold">
            Exclusive Offer ${selectedProduct.price}
          </p>
          <p className="text-slate-700 text-sm">
            MRP: <span>${selectedProduct.mrp}</span>
          </p>
          <p className="text-sm font-semibold leading-4">
            {selectedProduct.description}
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {/* Material */}
            {selectedProduct.material && (
              <div className="flex gap-2 items-center">
                <p className="uppercase text-sm text-slate-600">Material:</p>
                <div className="font-semibold">{selectedProduct.material}</div>
              </div>
            )}

            {/* Color */}
            {selectedProduct?.colors.length > 0 && (
              <div className="flex gap-2 items-center">
                <p className="uppercase text-sm text-slate-500">Color:</p>
                <div className="flex gap-2">
                  {selectedProduct?.colors?.map((color, i) => (
                    <span
                      onClick={() => setSelectedColor(color)}
                      key={i}
                      style={{ backgroundColor: color }}
                      className={`size-5 border cursor-pointer transition-transform ${
                        selectedColor === color ? "scale-150" : ""
                      }`}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {selectedProduct?.sizes.length > 0 && (
              <div className="flex gap-2 items-center">
                <p className="text-sm uppercase text-slate-600">Size:</p>
                <div className="flex gap-2">
                  {selectedProduct?.sizes?.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(s)}
                      className={`px-1 text-sm border border-slate-600/30 flex justify-center items-center transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 active:scale-90 uppercase inter ${
                        selectedSize === s ? "bg-black text-white" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex gap-2 items-center ">
              <p className="text-sm uppercase text-slate-600">Quantity:</p>
              <div className="flex border border-slate-600/30 w-fit gap-1 overflow-hidden text-sm">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="cursor-pointer w-full px-1 transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 active:scale-90"
                >
                  <TiMinusOutline />
                </button>
                <span className="text-black font-bold select-none px-2">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="cursor-pointer w-full px-1 transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 active:scale-90"
                >
                  <TiPlusOutline />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToBag}
            disabled={isAddingToBag}
            className={`bg-black text-white py-2 font-bold uppercase tracking-wider my-4 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              isAddingToBag &&
              "bg-black/60 hover:scale-100 active:scale-100 cursor-not-allowed"
            }`}
          >
            {isAddingToBag ? "Adding..." : "Add to Bag"}
          </button>
        </div>
      </div>
      <SimilarProducts loading={loading} similarProducts={similarProducts} />
    </section>
  );
};

export default ProductDetail;
