import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    if (qty > 1) {
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-cafe-800 mb-6 border-b pb-2 border-cafe-200">My Cart</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-cafe-600 text-lg">Your cart is empty</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 bg-cafe-500 hover:bg-cafe-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-cafe-200">
            {cart.map(
              (value) =>
                value.qty > 0 && (
                  <li key={value._id} className="py-4 flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-1/3 mb-2 md:mb-0">
                      <h3 className="font-medium text-cafe-800">{value.productName}</h3>
                      <p className="text-cafe-500">${value.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => decrement(value._id, value.qty)}
                        className="bg-cafe-100 hover:bg-cafe-200 text-cafe-800 font-bold py-1 px-3 rounded-full transition-colors"
                        disabled={value.qty <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{value.qty}</span>
                      <button 
                        onClick={() => increment(value._id, value.qty)}
                        className="bg-cafe-100 hover:bg-cafe-200 text-cafe-800 font-bold py-1 px-3 rounded-full transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right w-full md:w-auto mt-2 md:mt-0">
                      <span className="font-medium text-cafe-700">
                        ${(value.price * value.qty).toFixed(2)}
                      </span>
                    </div>
                  </li>
                )
            )}
          </ul>

          <div className="mt-6 pt-4 border-t border-cafe-200">
            <h5 className="text-xl font-semibold text-cafe-800">
              Order Total: ${orderValue.toFixed(2)}
            </h5>
            
            <div className="mt-6">
              {user?.token ? (
                <button 
                  onClick={placeOrder}
                  className="w-full md:w-auto bg-cafe-600 hover:bg-cafe-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                >
                  Place Order
                </button>
              ) : (
                <button 
                  onClick={() => navigate("/login")}
                  className="w-full md:w-auto bg-accent-400 hover:bg-accent-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                >
                  Login to Order
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}