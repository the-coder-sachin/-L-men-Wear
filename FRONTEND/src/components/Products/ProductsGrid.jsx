import { Link } from "react-router-dom";

const ProductsGrid = ({products}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        {products.map((product) => (
          // img
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="w-fit mx-auto"
          >
            <div className="cards mx-auto relative">
              <div className="img h-[210px] w-[160px] sm:size-[250px]">
                <img
                  src={product.images[0]}
                  alt="img"
                  className="h-full w-full"
                />
              </div>
              {/* details  */}
              <div className="absolute text-xs sm:text-sm inset-x-0 bottom-0 backdrop-blur-[1.4px] bg-black/50 p-2 text-white">
                <p className="font-semibold capitalize text-nowra">{`${product.name.slice(
                  0,
                  80
                )} . ..`}</p>
                <p className="font-semibold uppercase ">
                  <span className="">exclusive offer: </span>
                  <span className="text-base">${product.price}</span>
                </p>
                <div className="flex items-center justify-between">
                  <p className="uppercase text-[10px]">
                    regular price: <span>{product.mrp}</span>
                  </p>
                  <p className="animate-pulse uppercase border border-dashed px-1 flex justify-center items-center text-nowrap text-[10px] absolute bottom-1 right-1">
                    {" "}
                    {Math.ceil(
                      ((product.mrp - product.price) / product.mrp) * 100
                    )}
                    % off
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsGrid