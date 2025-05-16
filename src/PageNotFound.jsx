import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'; // Import the CSS file

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <h1 className="page-not-found-heading">404</h1>
      <p className="page-not-found-subheading">Oops! Page not found.</p>
      <p className="page-not-found-description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="page-not-found-button">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
