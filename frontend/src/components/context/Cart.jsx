import { useState } from "react";
import { CartContext } from "./CartContext";
import { set } from "react-hook-form";

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product, size = null) => {
    let updatedCart = [...cartData];

    if (updatedCart.length === 0) {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
        productId: product.id,
        size: size,
        title: product.title,
        price: product.price,
        quantity: 1,
        image_url: product.image_url,
      });
    } else {
      if (size !== null) {
        const isProductInCart = updatedCart.find(
          (item) => item.productId === product.id && item.size === size
        );

        if (isProductInCart) {
          updatedCart = updatedCart.map((item) => {
            if (item.productId === product.id && item.size === size) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else {
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
            productId: product.id,
            size: size,
            title: product.title,
            price: product.price,
            quantity: 1,
            image_url: product.image_url,
          });
        }
      } else {
        const isProductInCart = updatedCart.find(
          (item) => item.productId === product.id && item.size === null
        );

        if (isProductInCart) {
          updatedCart = updatedCart.map((item) => {
            if (item.productId === product.id && item.size === null) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else {
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
            productId: product.id,
            size: size,
            title: product.title,
            price: product.price,
            quantity: 1,
            image_url: product.image_url,
          });
        }
      }
    }

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const shipping = () => {
    return 0;
  };

  const subTotal = () => {
    let subTotal = 0;
    cartData.map((item) => {
      subTotal += item.price * item.quantity;
    });

    return subTotal;
  };

  const grandTotal = () => {
    return subTotal() + shipping();
  };

  const updateCartItem = (itemId, newQuantity) => {
    let updatedCart = [...cartData];
    updatedCart = updatedCart.map((item) => {
      if (item.id == itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteCartItem = (itemId) => {
    let updatedCart = cartData.filter((item) => item.id !== itemId);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    cartData.map((item) => {
      totalQuantity += parseInt(item.quantity);
    });
    return totalQuantity;
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartData,
        subTotal,
        grandTotal,
        shipping,
        updateCartItem,
        deleteCartItem,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
