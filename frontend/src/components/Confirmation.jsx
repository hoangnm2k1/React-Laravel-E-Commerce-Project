import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";

const Confirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (result.status === 200) {
        setOrder(result.order);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!order) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="primary-text">Thank You!</h1>
          <p>You have successfully placed your order.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>Order Summary</h3>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p><strong>Order ID:</strong> #{order.id}</p>
                    <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> <span className="badge bg-warning">{order.status}</span></p>
                    <p><strong>Payment:</strong> {order.payment_status}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Customer:</strong> {order.name}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Contact:</strong> {order.mobile}</p>
                  </div>
                </div>

                <h4>Items</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items && order.order_items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name} {item.size && `(${item.size})`}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="row">
                  <div className="col-md-6 ms-auto">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>${order.subtotal}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span>${order.shipping}</span>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-2">
                      <strong>Grand Total:</strong>
                      <strong>${order.grand_total}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Link to="/" className="btn btn-primary me-3">Continue Shopping</Link>
                  <Link to={`/orders/${order.id}`} className="btn btn-secondary">View Order Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;