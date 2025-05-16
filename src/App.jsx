import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import CartComponent from './CartComponent';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PageNotFound from './PageNotFound';

import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from './store';

function App() {
  const cart = useSelector(state => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);

  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      {/* NAVIGATION */}
      <header className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          🛍️ <span className="ms-2">eCart</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="nav-links">
          <Link to="/" className="nav-button">🏠 Home</Link>
          <Link to="/veg" className="nav-button">🥦 Vegetables</Link>
          <Link to="/nonveg" className="nav-button">🍗 Meats</Link>
          <Link to="/milk" className="nav-button">🥛 Dairy</Link>
          <Link to="/chocolate" className="nav-button">🍫 Chocolates</Link>
          <Link to="/orders" className="nav-button">📦 My Orders</Link>
          <Link to="/aboutus" className="nav-button">ℹ️ About</Link>
          <Link to="/contactus" className="nav-button">📞 Help</Link>

          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="navbar-text text-white me-2">Welcome {currentUser.username}</span>
                <button className="btn btn-warning btn-sm me-3" onClick={() => dispatch(logOutUser())}>Logout</button>
              </>
            ) : (
              <Link className="btn btn-outline-light btn-sm me-3" to="/signin">🔐 Sign In</Link>
            )}

            <Link to="/cart" className="btn btn-light position-relative">
              <FaShoppingCart />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ROUTES */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
