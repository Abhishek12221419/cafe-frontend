import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(Math.ceil(result.data.total / limit));
    } catch (err) {
      console.log(err);
      setError("Failed to load orders. Please try again.");
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [status, page, limit]);

  const updateOrder = async (newStatus, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Failed to update order status.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-light text-cafe-800 mb-6 border-b pb-2 border-cafe-200">
        Order Management
      </h2>

      {/* Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-cafe-700">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            onChange={(e) => setStatus(e.target.value)}
            className="border border-cafe-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-500"
          >
            <option value="">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm font-medium text-cafe-700">
            Items per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-cafe-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-500"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4 mb-8">
        {orders.length === 0 ? (
          <div className="text-center py-8 bg-cafe-50 rounded-lg">
            <p className="text-cafe-600">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-cafe-200">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-cafe-800">Order #{order._id.slice(-6).toUpperCase()}</h3>
                    <p className="text-sm text-cafe-600">Customer: {order.email}</p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-lg font-semibold text-cafe-800 mt-1">${order.orderValue.toFixed(2)}</p>
                  </div>
                </div>

                {order.status === "Pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => updateOrder("cancelled", order._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Cancel Order
                    </button>
                    <button
                      onClick={() => updateOrder("completed", order._id)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-cafe-200 pt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-cafe-100 text-cafe-400 cursor-not-allowed' : 'bg-cafe-200 hover:bg-cafe-300 text-cafe-700'}`}
        >
          Previous
        </button>
        <span className="text-sm text-cafe-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-md ${page === totalPages || totalPages === 0 ? 'bg-cafe-100 text-cafe-400 cursor-not-allowed' : 'bg-cafe-200 hover:bg-cafe-300 text-cafe-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}