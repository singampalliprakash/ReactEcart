import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Veg.css';
import './App.css';
import { AddToCart } from './store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const priceRanges = [
  { value: "1 - 100", min: 1, max: 100 },
  { value: "101 - 200", min: 101, max: 200 },
  { value: "201 - 350", min: 201, max: 350 },
  { value: "351 - 600", min: 351, max: 600 },
];

const Veg = () => {
  const dispatch = useDispatch();
  const vegProducts = useSelector((state) => state.products.Veg);

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleCheckboxChange = (value) => {
    if (selectedRanges.includes(value)) {
      const updated = selectedRanges.filter(item => item !== value);
      setSelectedRanges(updated);
    } else {
      setSelectedRanges([...selectedRanges, value]);
    }
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handleClearAll = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const activeRanges = priceRanges.filter(range =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts = selectedRanges.length === 0
    ? vegProducts
    : vegProducts.filter(product =>
        activeRanges.some(range =>
          product.price >= range.min && product.price <= range.max
        )
      );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} />

      <h1
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          color: '#28a745',
          marginTop: '30px',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        Fresh Vegetables
      </h1>

      {/* Filter Section */}
      <div className="price-filter-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Filter by Price:</h2>
        <div style={{ display: 'inline-flex', gap: '10px' }}>
          {priceRanges.map(range => (
            <label key={range.value} style={{ fontSize: '1rem' }}>
              <input
                type="checkbox"
                checked={selectedRanges.includes(range.value)}
                onChange={() => handleCheckboxChange(range.value)}
                style={{ marginRight: '5px', transform: 'scale(1.2)' }}
              />
              {range.value}
            </label>
          ))}
        </div>

        {selectedRanges.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              marginLeft: '20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Product Cards */}
      <div className="products-container">
        {currentItems.map((product) => (
          <div key={product.name} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Veg;
