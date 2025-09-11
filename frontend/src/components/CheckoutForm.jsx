import React from "react";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "./common/Http";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");
  const { cartData, shipping, subTotal, grandTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const result = await fetch(`${apiUrl}/get-profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            reset({
              name: res.data.name,
              email: res.data.email,
              mobile: res.data.mobile,
              address: res.data.address,
              city: res.data.city,
              state: res.data.state,
              zip: res.data.zip,
            });
          } else {
            console.log(res.message);
          }
        });
    },
  });

  const saveOrder = async (formData, paymentStatus) => {
    const orderData = {
      ...formData,
      subtotal: subTotal(),
      grand_total: grandTotal(),
      shipping: shipping(),
      discount: 0,
      payment_status: paymentStatus,
      payment_method: paymentMethod,
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
      if (result.status == 200) {
        console.log("Order saved successfully:", result);

        toast.success(result.message);
        localStorage.removeItem("cart");
        setLoading(false);
        navigate(`/order/confirmation/${result.order.id}`);
      } else {
        console.error("Order save failed:", result);
        toast.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Save order error:", error);
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  const processOrder = async (data) => {
    setLoading(true);
    setPaymentStatus("");

    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty");
      setLoading(false);
      return;
    }

    try {
      if (paymentMethod == "cod") {
        setPaymentStatus("Payment successful!");
        await saveOrder(data, "not_paid");
      } else {
        if (!stripe || !elements) {
          setPaymentStatus("Stripe is not ready. Please try again later.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${apiUrl}/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
          body: JSON.stringify({ amount: grandTotal() * 100 }),
        });

        const result = await response.json();

        if (!result.client_secret) {
          console.error("No client secret received:", result);
          setPaymentStatus("Unable to process payment. Please try again.");
          setLoading(false);
          return;
        }

        const clientSecret = result.client_secret;
        const cardElement = elements.getElement(CardElement);

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                line1: data.address,
                city: data.city,
                state: data.state,
                postal_code: data.zip,
              },
            },
          },
        });

        if (paymentResult.error) {
          setPaymentStatus(`Payment failed: ${paymentResult.error.message}`);
          setLoading(false);
        } else if (paymentResult.paymentIntent.status === "succeeded") {
          setPaymentStatus("Payment successful!");
          await saveOrder(data, "paid");
        }
      }
    } catch (error) {
      console.error("Process order error:", error);
      toast.error("An error occurred. Please try again.");
      setPaymentStatus("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(cartData);
  }, []);

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
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
                    className={`form-control ${errors.mobile && "is-invalid"}`}
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
                        <img src={item.image_url} width={80} alt={item.name} />
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
                          <div className="item-quantity">X {item.quantity}</div>
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
                id="pm-cod"
                value={"cod"}
                checked={paymentMethod == "cod"}
                onChange={handlePaymentMethod}
              />
              <label htmlFor="pm-cod" className="form-label ps-2">
                Cash on Delivery (COD)
              </label>
              <input
                type="radio"
                className="form-check-input ms-3"
                name="payment_method"
                id="pm-stripe"
                value={"stripe"}
                checked={paymentMethod == "stripe"}
                onChange={handlePaymentMethod}
              />
              <label htmlFor="pm-stripe" className="form-label ps-2">
                Credit Card
              </label>
            </div>

            {paymentMethod == "stripe" && (
              <div className="border p-3 mt-3">
                <CardElement />
              </div>
            )}

            <div className="d-flex justify-content-end py-3">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
            {paymentStatus && (
              <p className="alert alert-info mt-3">{paymentStatus}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
