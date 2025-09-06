import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";

const Shipping = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/get-shipping`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status == 200) {
            reset({
              shipping_charge: result.shipping.shipping_charge,
            });
          } else {
            console.log("Failed to fetch shipping charge");
          }
        });
    },
  });

  const saveShipping = async (data) => {
    setDisable(true);
    const res = await fetch(`${apiUrl}/save-shipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
        } else {
          toast.error("Failed to save shipping charge");
        }
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Shipping</h4>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveShipping)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Shipping Charge
                    </label>
                    <input
                      {...register("shipping_charge", {
                        required: "The shipping charge field is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "The shipping charge must be a number",
                        },
                      })}
                      type="text"
                      className={`form-control ${
                        errors.shipping_charge && "is-invalid"
                      }`}
                      placeholder="Shipping Charge"
                    />
                    {errors.shipping_charge && (
                      <p className="invalid-feedback">
                        {String(errors.shipping_charge.message)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
