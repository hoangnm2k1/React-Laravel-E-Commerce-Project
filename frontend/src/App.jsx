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
import { default as CreateCategory } from "./components/admin/category/Create";
import { default as EditCategory } from "./components/admin/category/Edit";

import { default as ShowBrands } from "./components/admin/brand/Show";
import { default as CreateBrand } from "./components/admin/brand/Create";
import { default as EditBrand } from "./components/admin/brand/Edit";

import { default as ShowProducts } from "./components/admin/product/Show";
import { default as CreateProduct } from "./components/admin/product/Create";
import { default as EditProduct } from "./components/admin/product/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
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
                  <CreateCategory />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <EditCategory />
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
                  <CreateBrand />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/brands/edit/:id"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <EditBrand />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/products/"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <ShowProducts />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/products/create"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <CreateProduct placeholder="" />
                </AdminRequireAuth>
              </AdminAuthProvider>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminAuthProvider>
                <AdminRequireAuth>
                  <EditProduct />
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
