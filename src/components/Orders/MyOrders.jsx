import React from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Orders.css"; // Custom CSS for Orders (will be used by ViewOrders too)

function MyOrders() {
  const { getOrdersByCustomer } = useData();
  const { user } = useAuth();

  // Redirect to login if not authenticated as a customer
  if (!user || user.role !== "customer") {
    return <Navigate to="/login" />;
  }

  const customerOrders = getOrdersByCustomer(user.id);

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>
      {customerOrders.length === 0 ? (
        <h2 className="noOrders-list">You have not placed any orders yet.</h2>
      ) : (
        <div className="orders-list">
          {customerOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h3 className="order-id">Order ID: {order.id}</h3>
              <p className="order-date">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.productName} ({item.quantity}) - ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="order-total">Total: ₹{order.total.toFixed(2)}</p>
              <p
                className={`order-status status-${order.status.toLowerCase()}`}
              >
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
