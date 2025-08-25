import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { apiUrl, userToken } from "./common/Http";
import { toast } from "react-toastify";

const Confirmation = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = () => {
    fetch(`${apiUrl}/get-order-details/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setLoading(false);
        if (result.status == 200) {
          setOrder(result.order);
          setItems(result.order.order_items);
        } else {
          toast.error(result.message);
        }
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      <div className="container py-5">
        {loading == true && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <div className="visually-hidden">
                <span>Loading...</span>
              </div>
            </div>
          </div>
        )}
        {loading == false && order && (
          <div>
            <div className="text-center fw-bold text-success">
              <h1 className="primary-text">Thank You!</h1>
              <p className="text-muted text-center">
                You have successfully placed your order.
              </p>
            </div>

            <div className="card shadow">
              <div className="card-body">
                <h2 className="fw-bold">Order Summary</h2>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <p>
                      <strong>Order ID: </strong> #{order.id}
                    </p>
                    <p>
                      <strong>Date: </strong> {order.created_at}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      {order.status == "pending" && (
                        <span className="badge bg-warning">Pending</span>
                      )}

                      {order.status == "shipped" && (
                        <span className="badge bg-warning">Shipped</span>
                      )}

                      {order.status == "delivered" && (
                        <span className="badge bg-success">Delivered</span>
                      )}

                      {order.status == "cancelled" && (
                        <span className="badge bg-danger">Cancelled</span>
                      )}
                    </p>
                    <p>
                      <strong>Payment Method: </strong> COD
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <strong>Customer: </strong> {order.name}
                    </p>
                    <p>
                      <strong>Address: </strong> {order.address}, {order.city},{" "}
                      {order.state} {order.zip}
                    </p>
                    <p>
                      <strong>Contact: </strong> {order.mobile}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th style={{ width: 150 }}>Price</th>
                          <th style={{ width: 150 }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items &&
                          items.map((item, index) => (
                            <tr key={`item-${index}`}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>${item.price}</td>
                              <td>${item.price * item.quantity}</td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="text-end fw-bold">
                            Subtotal
                          </td>
                          <td>${order.subtotal}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="text-end fw-bold">
                            Shipping
                          </td>
                          <td>${order.shipping}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="text-end fw-bold">
                            Grand Total
                          </td>
                          <td>
                            <strong>${order.grand_total}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary">
                      View Order Details
                    </button>
                    <Link to="/" className="btn btn-outline-secondary ms-2">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading == false && !order && (
          <div className="text-center fw-bold text-muted">
            <h1 className="primary-text">Order Not Found</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Confirmation;
