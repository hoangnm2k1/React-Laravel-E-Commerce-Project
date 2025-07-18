import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/men/eight.jpg";
import { useState } from "react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
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
        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">
              <strong>Billing Details</strong>
            </h3>
            <form action="">
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    rows={3}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <h3 className="border-bottom pb-3">
              <strong>Items</strong>
            </h3>
            <table className="table">
              <tbody>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} width={80} />
                  </td>
                  <td width={600}>
                    <h4>Yello & White Dress Combination for Kids</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">S</button>
                      </div>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} width={80} />
                  </td>
                  <td width={600}>
                    <h4>Yello & White Dress Combination for Kids</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">S</button>
                      </div>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <div>
                    <strong>Subtotal</strong>
                  </div>
                  <div>$36</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>
                    <strong>Shiping</strong>
                  </div>
                  <div>$5</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>
                    <strong>Grand Total</strong>
                  </div>
                  <div>$41</div>
                </div>
              </div>
            </div>

            <h3 className="border-bottom pb-3 pt-4">
              <strong>Payment Methods</strong>
            </h3>

            <div>
              <input
                type="radio"
                name=""
                id=""
                className="form-check-input"
                value={"stripe"}
                checked={paymentMethod == "stripe"}
                onClick={handlePaymentMethod}
              />
              <label htmlFor="" className="form-label ps-2">
                Stripe
              </label>
              <input
                type="radio"
                name=""
                id=""
                className="form-check-input ms-3"
                value={"cod"}
                checked={paymentMethod == "cod"}
                onClick={handlePaymentMethod}
              />
              <label htmlFor="" className="form-label ps-2">
                COD
              </label>
            </div>
            <div className="d-flex justify-content-end py-3">
              <Link to="/checkout" className="text-decoration-none">
                <button className="btn btn-primary mt-3">Pay Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
