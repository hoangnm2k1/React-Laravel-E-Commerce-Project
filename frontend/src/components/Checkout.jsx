import { useNavigate } from "react-router-dom";
import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/men/eight.jpg";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "./common/Http";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartData, shipping, subTotal, grandTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const saveOrder = async (formData, paymentStatus) => {
    const orderData = {
      ...formData,
      subtotal: subTotal(),
      grand_total: grandTotal(),
      shipping: shipping(),
      discount: 0,
      payment_status: paymentStatus,
      status: "pending",
      cart: cartData,
    };

    try {
      const response = await fetch(`${apiUrl}/save-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      // console.log(result);

      if (result.status == 200) {
        toast.success(result.message);
        localStorage.removeItem("cart");
        navigate(`/order/confirmation/${result.order.id}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const processOrder = (data) => {
    if (paymentMethod == "cod") {
      saveOrder(data, "not_paid");
    }
  };

  useEffect(() => {
    console.log(cartData);
  }, []);

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <form onSubmit={handleSubmit(processOrder)}>
          <div className="row">
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong>Billing Details</strong>
              </h3>
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className={`form-control ${errors.name && "is-invalid"}`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="invalid-feedback">
                        {String(errors.email.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className={`form-control ${errors.address && "is-invalid"}`}
                    placeholder="Address"
                    rows={3}
                  ></textarea>
                  {errors.address && (
                    <p className="invalid-feedback">
                      {String(errors.address.message)}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      className={`form-control ${errors.city && "is-invalid"}`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="invalid-feedback">
                        {String(errors.city.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("state", { required: "State is required" })}
                      type="text"
                      className={`form-control ${errors.state && "is-invalid"}`}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="invalid-feedback">
                        {String(errors.state.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("zip", { required: "Zip is required" })}
                      type="text"
                      className={`form-control ${errors.zip && "is-invalid"}`}
                      placeholder="Zip"
                    />
                    {errors.zip && (
                      <p className="invalid-feedback">
                        {String(errors.zip.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("mobile", {
                        required: "Mobile is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.mobile && "is-invalid"
                      }`}
                      placeholder="Mobile"
                    />
                    {errors.mobile && (
                      <p className="invalid-feedback">
                        {String(errors.mobile.message)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong>Items</strong>
              </h3>
              <table className="table">
                <tbody>
                  {cartData &&
                    cartData.map((item, index) => (
                      <tr key={`item-${index}`}>
                        <td width={100}>
                          <img
                            src={item.image_url}
                            width={80}
                            alt={item.name}
                          />
                        </td>
                        <td width={600}>
                          <h4>{item.title}</h4>
                          <div className="d-flex align-items-center pt-3 checkout-cart-item">
                            <div className="item-price">
                              <span>${item.price}</span>
                            </div>
                            <div className="item-size">
                              {item.size ? (
                                <button className="btn btn-size">
                                  {item.size}
                                </button>
                              ) : (
                                <div className="size-placeholder"></div>
                              )}
                            </div>
                            <div className="item-quantity">
                              X {item.quantity}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>
                      <strong>Subtotal</strong>
                    </div>
                    <div>${subTotal()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>
                      <strong>Shiping</strong>
                    </div>
                    <div>${shipping()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>
                      <strong>Grand Total</strong>
                    </div>
                    <div>${grandTotal()}</div>
                  </div>
                </div>
              </div>

              <h3 className="border-bottom pb-3 pt-4">
                <strong>Payment Methods</strong>
              </h3>

              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  name="payment_method"
                  id="pm-stripe"
                  value={"stripe"}
                  checked={paymentMethod == "stripe"}
                  onChange={handlePaymentMethod}
                />
                <label htmlFor="pm-stripe" className="form-label ps-2">
                  Stripe
                </label>
                <input
                  type="radio"
                  className="form-check-input ms-3"
                  name="payment_method"
                  id="pm-cod"
                  value={"cod"}
                  checked={paymentMethod == "cod"}
                  onChange={handlePaymentMethod}
                />
                <label htmlFor="pm-cod" className="form-label ps-2">
                  COD
                </label>
              </div>
              <div className="d-flex justify-content-end py-3">
                <button type="submit" className="btn btn-primary mt-3">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
