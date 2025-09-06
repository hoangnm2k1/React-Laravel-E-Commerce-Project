import React from "react";
import Layout from "../common/Layout";
import UserSidebar from "../common/UserSidebar";
import { apiUrl, userToken } from "../common/Http";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../common/Loader";

const Profile = () => {
  const [loader, setLoader] = useState(true);

  const {
    register,
    reset,
    setError,
    handleSubmit,
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
            setLoader(false);
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

  const updateProfile = async (data) => {
    const result = await fetch(`${apiUrl}/update-profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.message);
        } else {
          console.log(res);
        }
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">My Account</h4>
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          {loader && <Loader />}
          {loader == false && (
            <div className="col-md-9">
              <form onSubmit={handleSubmit(updateProfile)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          {...register("name", {
                            required: "The name field is required",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.name && "is-invalid"
                          }`}
                          id="name"
                          placeholder="Enter Name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {String(errors.name.message)}
                          </div>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "The email field is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          className={`form-control ${
                            errors.email && "is-invalid"
                          }`}
                          id="email"
                          placeholder="Enter Email"
                        />
                        {errors.email && (
                          <div className="invalid-feedback">
                            {String(errors.email.message)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          {...register("address", {
                            required: "The address field is required",
                            maxLength: {
                              value: 200,
                              message: "Address must not exceed 200 characters",
                            },
                          })}
                          className={`form-control ${
                            errors.address && "is-invalid"
                          }`}
                          id="address"
                          placeholder="Enter Address"
                        ></textarea>
                        {errors.address && (
                          <div className="invalid-feedback">
                            {String(errors.address.message)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="mobile" className="form-label">
                          Mobile
                        </label>
                        <input
                          {...register("mobile", {
                            required: "The mobile field is required",
                            maxLength: {
                              value: 100,
                              message: "Mobile must not exceed 100 characters",
                            },
                          })}
                          type="tel"
                          className={`form-control ${
                            errors.mobile && "is-invalid"
                          }`}
                          id="mobile"
                          placeholder="Enter Mobile"
                        />
                        {errors.mobile && (
                          <div className="invalid-feedback">
                            {String(errors.mobile.message)}
                          </div>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          {...register("city", {
                            required: "The city field is required",
                            maxLength: {
                              value: 100,
                              message: "City must not exceed 100 characters",
                            },
                          })}
                          type="text"
                          className={`form-control ${
                            errors.city && "is-invalid"
                          }`}
                          id="city"
                          placeholder="Enter City"
                        />
                        {errors.city && (
                          <div className="invalid-feedback">
                            {String(errors.city.message)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <input
                          {...register("state", {
                            required: "The state field is required",
                            maxLength: {
                              value: 100,
                              message: "State must not exceed 100 characters",
                            },
                          })}
                          type="text"
                          className={`form-control ${
                            errors.state && "is-invalid"
                          }`}
                          id="state"
                          placeholder="Enter State"
                        />
                        {errors.state && (
                          <div className="invalid-feedback">
                            {String(errors.state.message)}
                          </div>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="zip" className="form-label">
                          Zip Code
                        </label>
                        <input
                          {...register("zip", {
                            required: "The zip code field is required",
                            maxLength: {
                              value: 100,
                              message:
                                "Zip code must not exceed 100 characters",
                            },
                          })}
                          type="text"
                          className={`form-control ${
                            errors.zip && "is-invalid"
                          }`}
                          id="zip"
                          placeholder="Enter Zip"
                        />
                        {errors.zip && (
                          <div className="invalid-feedback">
                            {String(errors.zip.message)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary mt-4 mb-5">Update</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
