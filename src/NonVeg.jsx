import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NonVeg.css';
import './App.css';
import { AddToCart } from './store';

const NonVegProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.NonVeg);

  const [maxPrice, setMaxPrice] = useState(900);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => product.price <= maxPrice);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const nonVegListItems = currentItems.map((product) => (
    <div key={product.name} className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => dispatch(AddToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  ));

  const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        margin: '0 5px',
        fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
      }}
    >
      {index + 1}
    </button>
  ));

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          color: '#dc3545',
          marginTop: '30px',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        Non-Veg Items
      </h1>

      {/* Price Slider */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Filter by Price</h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>₹1</span>

          <input
            type="range"
            min="1"
            max="600"
            step="1"
            value={maxPrice}
            onChange={handlePriceChange}
            style={{ width: '50%' }}
          />

          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>₹{maxPrice}</span>
        </div>
      </div>

      {/* Product Cards */}
      <div className="products-container">{nonVegListItems}</div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {paginationButtons}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default NonVegProducts;
