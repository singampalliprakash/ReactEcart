import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, DecCart, IncCart, RemoveFromCart } from './store';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import QRCode from 'react-qr-code';
import { OrderDetails as AddOrder } from './store';
import './CartComponent.css';
import confetti from 'canvas-confetti';

function CartComponent() {
  const cartObjects = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cuponCodeRef = useRef();
  const emailRef = useRef();

  const [manualDiscountPercent, setManualDiscountPercent] = useState(0);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCouponApply = () => {
    const couponCode = cuponCodeRef.current.value.trim().toUpperCase();
    switch (couponCode) {
      case "RATANSIR10":
        setCouponDiscountPercent(10);
        break;
      case "RATANSIR20":
        setCouponDiscountPercent(20);
        break;
      case "RATANSIR30":
        setCouponDiscountPercent(30);
        break;
      case "ANUMADAM40":
        setCouponDiscountPercent(40);
        break;
      default:
        setCouponDiscountPercent(0);
        alert("❌ Invalid Coupon Code!");
    }
  };

  const calculateAmount = () => {
    const totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalDiscountPercent = manualDiscountPercent + couponDiscountPercent;
    const discount = totalPrice * (totalDiscountPercent / 100);
    const priceAfterDiscount = totalPrice - discount;
    const taxPrice = priceAfterDiscount * 0.05;
    const finalPrice = priceAfterDiscount + taxPrice;
    return { totalPrice, discount, priceAfterDiscount, taxPrice, finalPrice, totalDiscountPercent };
  };

  const { totalPrice, discount, priceAfterDiscount, taxPrice, finalPrice } = calculateAmount();
  const totalItems = cartObjects.reduce((total, item) => total + item.quantity, 0);

  const handleCompletePurchase = () => {
    const orderId = 'ORD-' + new Date().getTime();
    const purchaseDateTime = new Date().toLocaleString();
    const orderDetailsObject = {
      orderId: orderId,
      date: purchaseDateTime,
      items: [...cartObjects],
      finalPrice: finalPrice.toFixed(2),
    };

    dispatch(AddOrder(orderDetailsObject));
    dispatch(clearCart());
    setPurchaseComplete(true);
    setShowThankYou(true);
    alert("✅ Purchase Completed!\n\nThank you for shopping with eCart!");

    setRemainingTime(9); // countdown from 9
  let countdown = 9;

  // Timer to countdown from 9 to 0
  const countdownTimer = setInterval(() => {
    countdown -= 1;
    setRemainingTime(countdown);

    // Final blast when countdown hits 0
    if (countdown <= 0) {
      clearInterval(countdownTimer);
      clearInterval(confettiTimer);
      bigFinalBlast(); // custom final effect
      setTimeout(() => navigate("/orders"), 1000);
    }
  }, 1000);

  // Continuous confetti bursts
  const confettiTimer = setInterval(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      startVelocity: 30,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      }
    });
  }, 300); // repeat burst every 300ms

  // Final blast animation function
  const bigFinalBlast = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 90,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.4
          },
          scalar: 1.2,
          shapes: ['circle', 'square']
        });
      }, i * 200);
    }
  };


    const templateParams = {
      order_id: orderId,
      orders: cartObjects.map(item => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity
      })),
      cost: {
        shipping: 50,
        tax: taxPrice.toFixed(2),
        total: finalPrice.toFixed(2),
        discount: discount.toFixed(2)
      },
      email: customerEmail,
      coupon_code: couponDiscountPercent > 0 ? `✔️ Applied (${couponDiscountPercent}%)` : '❌ Not Applied'
    };

    emailjs.send(
      'service_dt1ax77',
      'template_ulw1nvk',
      templateParams,
      'uG006gjzHxEcvR3xq'
    )
      .then(() => {
        console.log('✅ Email sent successfully');
        alert('Order confirmation email sent!');
      })
      .catch((error) => {
        console.error('❌ Email sending failed:', error);
        alert('Failed to send confirmation email.');
      });
  };

  const emptyCartMessage = cartObjects.length === 0 && !purchaseComplete && (
    <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#ef4444' }} >
      🛒 Your cart is empty.
    </p>
  );

  const listItems = cartObjects.map((item, index) => (
    <li key={index} className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-info-row">
        <span className="item-name">{item.name}</span>
        <div className="quantity-controls">
          <button className="btn-decrease" onClick={() => dispatch(DecCart(item))}>-</button>
          <span className="item-quantity">{item.quantity}</span>
          <button className="btn-increase" onClick={() => dispatch(IncCart(item))}>+</button>
        </div>
        <button className="btn-remove" onClick={() => dispatch(RemoveFromCart(item))}>Remove</button>
        <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </li>
  ));

  return (
    <div className="cart-container">
      <h1>🛒 Cart Items</h1>

      {cartObjects.length > 0 && (
        <p className="total-items">Total Items: {totalItems}</p>
      )}

      {showThankYou && (
        <div className="thank-you-container">
          <div className="ribbon"></div>
          <h2 className="thank-you-message">
            🎉 Thank you for your purchase! Redirecting to orders in <span>{remainingTime}</span> seconds...
          </h2>
          <div className="balloon balloon1"></div>
          <div className="balloon balloon2"></div>
          <div className="balloon balloon3"></div>
          <div className="balloon balloon4"></div>
        </div>
      )}

      {emptyCartMessage}

      {cartObjects.length > 0 && (
        <>
          <ol className="cart-list">{listItems}</ol>
          <div className="price-summary">
            <div className="summary-header">
              <h2>🧾 Order Summary</h2>
            </div>
            <div className="summary-section">
              <p className="label">Total Price:</p>
              <p className="value">₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className="discount-buttons">
              <button onClick={() => setManualDiscountPercent(10)}>10% Off</button>
              <button onClick={() => setManualDiscountPercent(20)}>20% Off</button>
              <button onClick={() => setManualDiscountPercent(30)}>30% Off</button>
            </div>
            {manualDiscountPercent > 0 && (
              <div className="summary-section">
                <p className="label">Manual Discount ({manualDiscountPercent}%):</p>
                <p className="value discount">-₹{(totalPrice * (manualDiscountPercent / 100)).toFixed(2)}</p>
              </div>
            )}
            <input
              type="text"
              ref={cuponCodeRef}
              placeholder="Enter coupon code"
              className="coupon-input"
            />
            <button onClick={handleCouponApply} className="btn-apply">
              Apply Coupon
            </button>
            {couponDiscountPercent > 0 && (
              <div className="summary-section">
                <p className="label">Coupon Discount ({couponDiscountPercent}%):</p>
                <p className="value discount">-₹{(totalPrice * (couponDiscountPercent / 100)).toFixed(2)}</p>
              </div>
            )}

            <div className="summary-section">
              <p className="label">Price After Discount:</p>
              <p className="value">₹{priceAfterDiscount.toFixed(2)}</p>
            </div>
            <div className="summary-section">
              <p className="label">Tax (5%):</p>
              <p className="value">₹{taxPrice.toFixed(2)}</p>
            </div>
            <div className="summary-section final">
              <p className="label">Final Price:</p>
              <p className="value">₹{finalPrice.toFixed(2)}</p>
            </div>

            <div className="checkout-container">
              <label>Enter your Gmail to receive order confirmation</label>
              <input
                type="email"
                ref={emailRef}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="form-control"
                placeholder="you@example.com"
              />
            </div>

            <div className="payment-method p-4 bg-white rounded-2xl shadow-md max-w-md mx-auto mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Payment Method:</h3>
              <div className="button-group flex gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod(prev => (prev === 'qr' ? null : 'qr'))}
                  className={`flex-1 py-2 px-4 rounded-lg text-white font-medium transition-colors ${paymentMethod === 'qr' ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}`}
                >
                  📱 QR Code
                </button>
                <button
                  onClick={() => setPaymentMethod(prev => (prev === 'card' ? null : 'card'))}
                  className={`flex-1 py-2 px-4 rounded-lg text-white font-medium transition-colors ${paymentMethod === 'card' ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}`}
                >
                  💳 Card
                </button>
              </div>

              {paymentMethod === 'qr' && (
                <div className="qr-section text-center">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Scan QR to Pay ₹{finalPrice.toFixed(2)}
                  </h2>
                  <div className="inline-block bg-white p-4 rounded-xl shadow-md">
                    <QRCode
                      value={`upi://pay?pa=8985653771@ybl&pn=Ratan Store&am=${finalPrice.toFixed(2)}&cu=INR`}
                      size={200}
                      fgColor="#1d4ed8"
                      bgColor="#ffffff"
                      level="H"
                    />
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    UPI ID: <strong className="text-gray-800">PrakashSingampalli@ybl</strong>
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-section">
                  <h2>Enter Card Details</h2>
                  <form>
                    <div>
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="Enter the name" />
                    </div>
                    <div>
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" />
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxLength="5" />
                      </div>
                      <div className="field">
                        <label>CVV</label>
                        <input type="password" placeholder="•••" maxLength="3" />
                      </div>
                    </div>
                    <button type="submit">💳 Pay ₹{finalPrice.toFixed(2)}</button>
                  </form>
                </div>
              )}
            </div>
            <button className="btn btn-primary mt-3" onClick={handleCompletePurchase}>
              Complete Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartComponent;
