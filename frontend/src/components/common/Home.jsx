import React from "react";
import "swiper/css";
import LatestProducts from "./LatestProducts";
import FeatureProducts from "./FeatureProducts";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <LatestProducts />
      <FeatureProducts />
      <Footer />
    </>
  );
};

export default Home;
