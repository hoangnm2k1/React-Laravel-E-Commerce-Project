import React from "react";
import Layout from "./common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl } from "./common/Http";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          const userInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          toast.success("Registered successfully");
          navigate("/account/login");
        } else {
          toast.error("Failed to register: ");
        }
      });
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center login-page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3 className="border-bottom pb-2 mb-3">Register</h3>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Username
                </label>
                <input
                  {...register("name", {
                    required: "The username field is required",
                  })}
                  type="text"
                  className={`form-control ${errors.username && "is-invalid"}`}
                  placeholder="username"
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {String(errors.username.message)}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
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
                  className={`form-control ${errors.email && "is-invalid"}`}
                  placeholder="email"
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {String(errors.email.message)}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "The password field is required",
                  })}
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  placeholder="password"
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {String(errors.password.message)}
                  </div>
                )}
              </div>
              <button className="btn btn-secondary w-100 mt-1">Register</button>
              <div className="d-flex justify-content-center pt-4 pb-2">
                Already have an account? &nbsp;{" "}
                <Link to="/account/login">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
