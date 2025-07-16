import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import { useFetcher } from "react-router-dom";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      const result = await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div>
      <h2>Order Management</h2>
      <div>
        <select>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button>Show</button>
      </div>
      {orders &&
        orders.map((order) => (
          <li>
            {order._id}-{order.orderValue}-{order.status}-
            {order.status === "Pending" && (
              <>
                <button onClick={() => updateOrder("cancelled", order._id)}>
                  Cancel
                </button>
                -
                <button onClick={() => updateOrder("completed", order._id)}>
                  Complete
                </button>
              </>
            )}
          </li>
        ))}
    </div>
  );
}