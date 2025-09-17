import ProductsGrid from "./ProductsGrid";

const SimilarProducts = ({loading, similarProducts}) => {

     const products = [
       {
         _id: 1,
         name: "name",
         price: 500,
         mrp: 1000,
         image: "https://picsum.photos/500?random=1",
       },
       {
         _id: 2,
         name: "name",
         price: 450,
         mrp: 780,
         image: "https://picsum.photos/500?random=2",
       },
       {
         _id: 3,
         name: "name",
         price: 790,
         mrp: 1200,
         image: "https://picsum.photos/500?random=3",
       },
       {
         _id: 4,
         name: "name",
         price: 400,
         mrp: 700,
         image: "https://picsum.photos/500?random=4",
       },
       {
         _id: 5,
         name: "name",
         price: 880,
         mrp: 880,
         image: "https://picsum.photos/500?random=5",
       },
  
     ];
  return (
    <section data-scroll>
      <p className="text-3xl mt-12 font-bold capitalize text-center mb-8">
        You may also like
      </p>
      <ProductsGrid loading={loading} products={similarProducts} />
    </section>
  );
}

export default SimilarProducts