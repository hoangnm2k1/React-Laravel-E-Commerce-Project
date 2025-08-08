import React from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/men/eight.jpg";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { apiUrl } from "./common/Http";
import { set } from "react-hook-form";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterParams, setFilterParams] = useSearchParams([]);
  const [checkedCategories, setCheckedCategories] = useState(() => {
    const category = filterParams.get("category");
    return category ? category.split(",") : [];
  });
  const [checkedBrands, setCheckedBrands] = useState(() => {
    const brand = filterParams.get("brand");
    return brand ? brand.split(",") : [];
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-categories`);
      const data = await response.json();
      if (data.status === 200) {
        setCategories(data.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-brands`);
      const data = await response.json();
      if (data.status === 200) {
        setBrands(data.data);
      } else {
        console.error("Failed to fetch brands");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      let filter = [];
      let params = "";

      if (checkedCategories.length) {
        filter.push(["category", checkedCategories.join(",")]);
      }

      if (checkedBrands.length) {
        filter.push(["brand", checkedBrands.join(",")]);
      }

      if (filter.length) {
        params = new URLSearchParams(filter).toString();
        setFilterParams(params);
      } else {
        setFilterParams("");
      }

      const response = await fetch(`${apiUrl}/get-products?${params}`);
      const data = await response.json();
      if (data.status === 200) {
        setProducts(data.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckedCategories((pre) => [...pre, value]);
    } else {
      setCheckedCategories((pre) => pre.filter((id) => id != value));
    }
  };

  const handleBrand = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckedBrands((pre) => [...pre, value]);
    } else {
      setCheckedBrands((pre) => pre.filter((id) => id != value));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCategories, checkedBrands]);

  return (
    <>
      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className="py-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shop
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className="mb-3">Categories</h3>
                  <ul>
                    {categories &&
                      categories.map((category) => (
                        <li className="mb-2" key={`category-${category.id}`}>
                          <input
                            type="checkbox"
                            value={category.id}
                            onChange={handleCategory}
                            checked={checkedCategories.includes(
                              category.id.toString()
                            )}
                          />
                          <label htmlFor="" className="ps-2">
                            {category.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className="mb-3">Brands</h3>
                  <ul>
                    {brands &&
                      brands.map((brand) => (
                        <li className="mb-2" key={`brand-${brand.id}`}>
                          <input
                            type="checkbox"
                            value={brand.id}
                            onChange={handleBrand}
                            checked={checkedBrands.includes(
                              brand.id.toString()
                            )}
                          />
                          <label htmlFor="" className="ps-2">
                            {brand.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {products &&
                  products.map((product) => (
                    <div
                      className="col-md-4 col-6"
                      key={`product-${product.id}`}
                    >
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to="/product">
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="w-100"
                            />
                          </Link>
                        </div>
                        <div className="card-body pt-3">
                          <Link to="/product">{product.title}</Link>
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
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
