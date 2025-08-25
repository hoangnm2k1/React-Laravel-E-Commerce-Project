import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import { AdminAuthProvider } from "./components/context/AdminAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { ToastContainer, toast } from "react-toastify";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Dashboard from "./components/admin/Dashboard";
import Home from "./components/Home";
import Login from "./components/admin/Login";
import Product from "./components/Product";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Shop from "./components/Shop";

import { default as UserLogin } from "./components/Login";

import { default as ShowBrands } from "./components/admin/brand/Show";
import { default as CreateBrand } from "./components/admin/brand/Create";
import { default as EditBrand } from "./components/admin/brand/Edit";

import { default as ShowCategories } from "./components/admin/category/Show";
import { default as CreateCategory } from "./components/admin/category/Create";
import { default as EditCategory } from "./components/admin/category/Edit";

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
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/login" element={<UserLogin />} />

          <Route
            path="/account"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />

          <Route
            path="/order/confirmation/:id"
            element={
              <RequireAuth>
                <Confirmation />
              </RequireAuth>
            }
          />

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
                  <EditProduct placeholder="" />
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
