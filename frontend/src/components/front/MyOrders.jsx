import React from "react";
import Layout from "../common/Layout";
import { Link } from "react-router-dom";
import UserSidebar from "../common/UserSidebar";
import { useState } from "react";
import { apiUrl, userToken } from "../common/Http";
import { use } from "react";
import { useEffect } from "react";
import Loader from "../common/Loader";
import NoState from "../common/NoState";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchOrders = async () => {
    setLoader(true);
    const res = fetch(`${apiUrl}/get-orders`, {
      method: "GET",
      headers: { Authorization: `Bearer ${userToken()}` },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoader(false);
        if (result.status == 200) {
          console.log(result.data);
          setOrders(result.data);
        } else {
          console.log("Error fetching orders");
        }
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">My Orders</h4>
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loader && <Loader />}
                {loader == false && orders.length == 0 && (
                  <NoState text="No orders found" />
                )}
                {orders && orders.length > 0 && (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.map((order, index) => (
                          <tr key={`order-${index}`}>
                            <td className="badge bg-success" width={30}>
                              <Link to={`/account/orders/details/${order.id}`}>
                                {order.id}
                              </Link>
                            </td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>${order.grand_total}</td>
                            <td>{order.created_at}</td>
                            <td>
                              {order.payment_status == "paid" ? (
                                <span className="badge bg-success">Paid</span>
                              ) : (
                                <span className="badge bg-danger">
                                  Not Paid
                                </span>
                              )}
                            </td>
                            <td>
                              {order.status == "pending" && (
                                <span className="badge bg-warning">
                                  Pending
                                </span>
                              )}

                              {order.status == "shipped" && (
                                <span className="badge bg-warning">
                                  Shipped
                                </span>
                              )}

                              {order.status == "delivered" && (
                                <span className="badge bg-success">
                                  Delivered
                                </span>
                              )}

                              {order.status == "cancelled" && (
                                <span className="badge bg-danger">
                                  Cancelled
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
