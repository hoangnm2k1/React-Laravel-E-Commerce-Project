import React from "react";
import { useState } from "react";
import { apiUrl } from "./Http";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  const fetchLatestProducts = async () => {
    const res = await fetch(`${apiUrl}/get-latest-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setLatestProducts(result.data);
        } else {
          console.error("Failed to fetch latest products");
        }
      });
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-4">
          {latestProducts &&
            latestProducts.map((product) => (
              <div className="col-md-3 col-6" key={`product-${product.id}`}>
                <Link to={`/product/${product.id}`}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-100"
                      />
                    </div>
                    <div className="card-body pt-3">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                      <div className="price">
                        ${product.price} &nbsp;
                        {product.compare_price && (
                          <span className="text-decoration-line-through">
                            ${product.compare_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
