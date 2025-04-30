import React from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Orders.css"; // Custom CSS for Orders

function ViewOrders() {
  const { getOrdersForCaterer } = useData();
  const { user } = useAuth();

  // Redirect to login if not authenticated as a caterer
  if (!user || user.role !== "caterer") {
    return <Navigate to="/login" />;
  }

  const catererOrders = getOrdersForCaterer(user.id);

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders for My Products</h2>
      {catererOrders.length === 0 ? (
        <p className="orders-list">
          No orders have been placed for your products yet.
        </p>
      ) : (
        <div className="orders-list">
          {catererOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h3 className="order-id">Order ID: {order.id}</h3>
              <p className="order-date">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p>Customer ID: {order.customerId}</p> {/* Display customer ID */}
              <div className="order-items">
                <h4>Items from your catering:</h4>
                <ul>
                  {/* Filter items in this order that belong to the current caterer */}
                  {order.items
                    .filter((item) => item.catererId === user.id)
                    .map((item, index) => (
                      <li key={index}>
                        {item.productName} ({item.quantity}) - ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                </ul>
              </div>
              {/* Note: The total shown here is the total for the *entire* order, not just the caterer's items */}
              {/* You might want to calculate a caterer-specific subtotal if needed */}
              <p className="order-total">
                Order Total: ₹{order.total.toFixed(2)}
              </p>
              <p
                className={`order-status status-${order.status.toLowerCase()}`}
              >
                Status: {order.status}
              </p>
              {/* Add options to update order status if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewOrders;
