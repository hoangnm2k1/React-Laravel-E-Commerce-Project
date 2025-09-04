import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/Http";
import Loader from "../../common/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState(null);
  const [loader, setLoader] = useState(false);
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchOrder = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/orders/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setLoader(false);
          setOrder(result.order);
          setItems(result.order.order_items);
          reset({
            status: result.order.status,
            payment_status: result.order.payment_status,
          });
        } else {
          console.error("Failed to fetch order:", result.message);
        }
      });
  };

  const updateOrder = async (data) => {
    setLoader(true);
    try {
      const res = await fetch(`${apiUrl}/update-order/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status == 200) {
        setLoader(false);
        fetchOrder();
        toast.success(result.message);
      } else {
        setLoader(false);
        console.error("Failed to update order");
      }
    } catch (error) {
      setLoader(false);
      console.error("Update order error:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Orders</h4>
            <Link to="/admin/orders" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-9">
                <div className="card shadow">
                  <div className="card-body p-4">
                    {loader && <Loader />}
                    {order && (
                      <div className="row">
                        <div className="col-md-4">
                          <h3>Order ID: #{order.id}</h3>
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
                        </div>
                        <div className="col-md-4">
                          <div className="text-secondary">Date</div>
                          <h4 className="pt-2">{order.created_at}</h4>
                        </div>
                        <div className="col-md-4">
                          <div className="text-secondary">Payment Status</div>
                          <h4 className="pt-2">
                            {order.payment_status == "paid" ? (
                              <span className="badge bg-success">Paid</span>
                            ) : (
                              <span className="badge bg-danger">Not Paid</span>
                            )}
                          </h4>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="py-5">
                              <strong>{order.name}</strong>
                              <div>{order.email}</div>
                              <div>{order.mobile}</div>
                              <div>
                                {order.address}, {order.city} {order.state}{" "}
                                {order.zip}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="text-secondary pt-5">
                              Payment Method
                            </div>
                            <div>COD</div>
                          </div>
                        </div>
                        {items && (
                          <div className="row">
                            <h3 className="pb-2 ">
                              <strong>Items</strong>
                            </h3>
                            <div className="row justify-content-end">
                              <div className="col-lg-12">
                                {items.map((item, index) => (
                                  <div
                                    key={`item-${index}`}
                                    className="d-flex justify-content-between border-bottom pb-2 mb-2"
                                  >
                                    <div className="d-flex">
                                      {item.product.image && (
                                        <img
                                          width="70"
                                          className="me-3"
                                          src={item.product.image_url}
                                          alt=""
                                        />
                                      )}
                                      <div className="d-flex flex-column">
                                        <div className="mb-2">
                                          <span>{item.name}</span>
                                        </div>
                                        {item.size && (
                                          <div>
                                            <button className="btn btn-size">
                                              {item.size}
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="d-flex">
                                      <div>X {item.quantity}</div>
                                      <div className="ps-3">${item.price}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="row justify-content-end">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                  <div>Subtotal</div>
                                  <div>${order.subtotal}</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                  <div>Shipping</div>
                                  <div>${order.shipping}</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                  <div>
                                    <strong>Grand Total</strong>
                                  </div>
                                  <div>${order.grand_total}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit(updateOrder)}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <select
                          {...register("status", { required: true })}
                          id="status"
                          className="form-control"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="payment-status">
                          Payment Status
                        </label>
                        <select
                          {...register("payment_status", { required: true })}
                          id="payment-status"
                          className="form-control"
                        >
                          <option value="paid">Paid</option>
                          <option value="not_paid">Not paid</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
