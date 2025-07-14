import React from "react";
import "swiper/css";
import LatestProducts from "./LatestProducts";
import FeatureProducts from "./FeatureProducts";
import Hero from "./Hero";
import Layout from "./Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeatureProducts />
      </Layout>
    </>
  );
};

export default Home;
