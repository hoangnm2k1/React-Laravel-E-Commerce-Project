import React from "react";
import { useEffect } from "react";
import { apiUrl } from "./Http";
import { useState } from "react";

const FeatureProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchFeaturedProducts = async () => {
    const res = await fetch(`${apiUrl}/get-featured-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setFeaturedProducts(result.data);
        } else {
          console.error("Failed to fetch featured products");
        }
      });
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <section className="section-2 pb-5 pt-3">
      <div className="container">
        <h2>Feature Products</h2>
        <div className="row mt-4">
          {featuredProducts &&
            featuredProducts.map((product) => (
              <div className="col-md-3 col-6" key={`product-${product.id}`}>
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={product.image_url} alt="" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="">{product.title}</a>
                    <div className="price">
                      ${product.price} &nbsp;
                      {product.compare_price && (
                        <span className="text-decoration-line-through">
                          $80
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
