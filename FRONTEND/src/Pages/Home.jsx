import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import FeatureSection from "../components/Products/FeatureSection";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetail from "../components/Products/ProductDetail";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // fetch best seller Product
    const fetchBestSellerProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best-seller product:", error);
      }
    };

    fetchBestSellerProduct(); // ✅ You were missing this
  }, [dispatch]);

  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <p className="text-3xl font-bold text-center md:mt-12 md:mb-0 my-5 capitalize">
        Best Seller of the Season
      </p>
      {bestSellerProduct && <ProductDetail productId={bestSellerProduct._id} />}
      <FeatureSection />
    </>
  );
};

export default Home;
