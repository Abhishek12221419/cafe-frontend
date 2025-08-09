import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load orders. Please try again later.");
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-light text-cafe-800 mb-8 border-b pb-2 border-cafe-200">
        My Orders
      </h3>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-cafe-600 text-lg">You haven't placed any orders yet</p>
          <a 
            href="/" 
            className="mt-4 inline-block bg-cafe-600 hover:bg-cafe-700 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Browse Menu
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-cafe-200">
              {/* Order Header */}
              <div className="bg-cafe-100 px-6 py-4 flex flex-wrap justify-between items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-cafe-600">Order ID</p>
                  <p className="font-medium text-cafe-800">{order._id}</p>
                </div>
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-cafe-600">Total</p>
                  <p className="font-medium text-cafe-800">${order.orderValue.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-cafe-600">Status</p>
                  <p className={`font-medium ${
                    order.status === 'completed' ? 'text-green-600' : 
                    order.status === 'cancelled' ? 'text-red-600' : 
                    'text-accent-500'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-cafe-200">
                  <thead className="bg-cafe-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-cafe-200">
                    {order.items.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-cafe-800">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-cafe-600">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-cafe-600">
                          {item.qty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cafe-800">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}