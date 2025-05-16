import React from 'react';
import { useSelector } from 'react-redux';
import './Orders.css';

function Orders() {
  const orders = useSelector((state) => state.Orders);



  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="no-orders">
          <h2>No orders found.</h2>
          <p>Please place an order to view it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 style={{ color: 'crimson' }}>Order History</h2>
      <ul className="orders-list">
        {orders.map((order, index) => (
          <li key={index} className="order-card">
            <h2 className="order-id">
              <i className="fas fa-box"></i> Order ID: {order.orderId}
            </h2>
            <h3 className="order-datetime">
              <i className="fas fa-calendar-alt"></i> DateTime: {order.date}
            </h3>
            <h3 className="order-amount">
              <i className="fas fa-dollar-sign"></i> Final Amount: ₹{order.finalPrice}
            </h3>
            <ul className="order-items">
              {order.items.map((item, index1) => (
                <li key={index1} className="order-item">
                  <i className="fas fa-check-circle"></i> {item.name} - Qty: {item.quantity} - Price: ₹{item.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
