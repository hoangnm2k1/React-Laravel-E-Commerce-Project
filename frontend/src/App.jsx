import { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./components/admin/Dashboard";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import { AdminAuthProvider } from "./components/context/AdminAuth";
import { default as ShowCategories } from "./components/admin/category/Show";
import { default as CreateCategories } from "./components/admin/category/Create";
import { default as EditCategories } from "./components/admin/category/Edit";
import { default as ShowBrands } from "./components/admin/brand/Show";
import { default as CreateBrands } from "./components/admin/brand/Create";
import { default as Editbrands } from "./components/admin/brand/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/admin/login"
            element={
              <AdminAuthProvider>
                <Login />
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <Dashboard />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <ShowCategories />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/categories/create"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <CreateCategories />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <EditCategories />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/brands"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <ShowBrands />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/brands/create"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <CreateBrands />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/brands/edit/:id"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <Editbrands />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
