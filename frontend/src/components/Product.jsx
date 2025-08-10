import React from "react";
import { useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { apiUrl } from "./common/Http";
import { useEffect } from "react";
import { set } from "react-hook-form";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const params = useParams();

  const fetchProductDetails = () => {
    fetch(`${apiUrl}/get-product/${params.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          console.error("Failed to fetch product details");
        }
      });
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <Layout>
      <div className="container product-details">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product Title
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  {productImages &&
                    productImages.map((image, index) => (
                      <SwiperSlide>
                        <div className="content">
                          <img
                            src={image.image_url}
                            alt=""
                            className="w-100"
                            height={100}
                            key={`image-${index}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {productImages &&
                    productImages.map((image, index) => (
                      <SwiperSlide>
                        <div className="content">
                          <img
                            src={image.image_url}
                            alt=""
                            className="w-100"
                            key={`image-${index}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
          {product != null ? (
            <div className="col-md-7">
              <h2>{product.title}</h2>
              <div className="d-flex">
                <Rating size={20} readonly initialValue={rating} />
                <span className="pt-1 ps-2">10 Reviews</span>
              </div>
              <div className="price h3 py-3">
                ${product.price} &nbsp;
                {product.compare_price && (
                  <span className="text-decoration-line-through">
                    ${product.compare_price}
                  </span>
                )}
              </div>
              <div className="desc">{product.short_description}</div>
              <div className="pt-3">
                <strong>Select Size</strong>
                <div className="sizes pt-2">
                  {productSizes &&
                    productSizes.map((productSize, index) => (
                      <button
                        className="btn btn-size me-2"
                        key={`size-${index}`}
                      >
                        {productSize.size.name}
                      </button>
                    ))}
                </div>
                <div className="add-to-cart my-4">
                  <button className="btn btn-primary text-uppercase">
                    Add to Cart
                  </button>
                </div>
                <hr />
                <div>
                  <strong>SKU: {product.sku && product.sku}</strong>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                {product && product.description ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></div>
                ) : (
                  <p>Ask admin to add description</p>
                )}
              </Tab>
              <Tab eventKey="reviews" title="Reviews (10)">
                Reviews
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
