import ProductsGrid from "./ProductsGrid";

const SimilarProducts = ({loading, similarProducts}) => {

    
  return (
    <section data-scroll>
      <p className="text-3xl mt-12 font-bold capitalize text-center mb-8">
        You may also like
      </p>
      <div className="mb-5">
        <ProductsGrid loading={loading} products={similarProducts} />
      </div>
    </section>
  );
}

export default SimilarProducts