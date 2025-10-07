import React from "react";
import { useState } from "react";
import Layout from "./common/Layout";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { apiUrl, userToken } from "./common/Http";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useMemo } from "react";
import { useRef } from "react";
import { set, useForm } from "react-hook-form";

const Product = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const fetchProductDetails = () => {
    fetch(`${apiUrl}/get-product/${params.id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          console.error("Failed to fetch product details");
        }
      });
  };

  const handleAddToCart = () => {
    if (productSizes.length > 0) {
      if (sizeSelected === null) {
        toast.error("Please select a size");
        return;
      } else {
        const selectedSizeObj = productSizes.find(
          (ps) => ps.size.name === sizeSelected
        );
        if (selectedSizeObj) {
          addToCart(product, selectedSizeObj.size.name);
          toast.success("Product added to cart");
        } else {
          toast.error("Invalid size selected");
        }
      }
    } else {
      addToCart(product, null);
      toast.success("Product added to cart");
    }
  };

  const fetchReview = async () => {
    const res = await fetch(`${apiUrl}/get-reviews/${params.id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setReviews(result.reviews);
          setAvgRating(result.avgRating);
          setTotalReviews(result.totalReviews);
        }
      });
  };

  const postReview = async (data) => {
    const token = userToken();
    if (!token) {
      toast.error("You must be logged in to post a review");
      navigate("/account/login");
      return;
    }
    
    const res = await fetch(`${apiUrl}/products/${params.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: myRating,
        comment: content,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success("Review submitted successfully");
          setContent("");
          setMyRating(0);
          fetchReview();
        } else {
          toast.error("Failed to submit review");
        }
      });
  };

  useEffect(() => {
    fetchProductDetails();
    fetchReview();
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
                <Rating size={20} readonly initialValue={avgRating} />
                <span className="pt-1 ps-2">{totalReviews} Reviews</span>
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
                    productSizes.map((productSize) => (
                      <button
                        className={`btn btn-size me-2 ${
                          sizeSelected === productSize.size.name
                            ? "bg-info"
                            : ""
                        }`}
                        key={`size-${productSize.size_id}`}
                        onClick={() => setSizeSelected(productSize.size.name)}
                      >
                        {productSize.size.name}
                      </button>
                    ))}
                </div>
                <div className="add-to-cart my-4">
                  <button
                    onClick={() => handleAddToCart()}
                    className="btn btn-primary text-uppercase"
                  >
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
              <Tab eventKey="reviews" title={`Reviews (${totalReviews})`}>
                <div>
                  {totalReviews === 0 ? (
                    <p>No reivews yet</p>
                  ) : (
                    reviews.map((review, idx) => (
                      <div key={idx} className="mb-3 border-bottom pb-2">
                        <div className="d-flex">
                          <span className="pt-1 me-1">
                            <strong>{review.user.name}</strong>
                          </span>
                          <Rating
                            size={16}
                            readonly
                            initialValue={review.rating}
                          />
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: review.comment }}
                        />
                        <small className="text-muted">
                          {new Date(review.created_at).toLocaleString()}
                        </small>
                      </div>
                    ))
                  )}
                </div>

                <form className="mb-4" onSubmit={handleSubmit(postReview)}>
                  <div className="mb-2">
                    <strong>
                      Your review: <span className="text-danger">*</span>
                    </strong>
                    <div>
                      <input
                        type="hidden"
                        {...register("rating", {
                          required:
                            "Please select a rating before submitting your review",
                        })}
                        value={myRating}
                      />
                      <Rating
                        size={20}
                        initialValue={myRating}
                        onClick={setMyRating}
                      />
                      {errors.rating && (
                        <small className="text-danger d-block">
                          {String(errors.rating.message)}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${
                      myRating === 0 ? "disabled" : ""
                    }`}
                    disabled={myRating === 0}
                  >
                    Submit Review
                  </button>
                </form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
