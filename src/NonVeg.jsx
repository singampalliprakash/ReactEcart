import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'; // Toastify import
import 'react-toastify/dist/ReactToastify.css';          // Toastify styles
import './NonVeg.css';
import './App.css';
import { AddToCart } from './store';

const priceRanges = [
  { value: "1 - 100", min: 1, max: 100 },
  { value: "101 - 200", min: 101, max: 200 },
  { value: "201 - 350", min: 201, max: 350 },
  { value: "351 - 600", min: 351, max: 600 },
];

const NonVegProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.NonVeg);

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleCheckboxChange = (value) => {
    if (selectedRanges.includes(value)) {
      setSelectedRanges(selectedRanges.filter(item => item !== value));
    } else {
      setSelectedRanges([...selectedRanges, value]);
    }
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      style: {
        background: '#ffffff',
        color: '#000000',
        fontWeight: '500',
        border: '1px solid #ccc',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      },
    });
  };

  const activeRanges = priceRanges.filter(range =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts = selectedRanges.length === 0
    ? products
    : products.filter(product =>
        activeRanges.some(range =>
          product.price >= range.min && product.price <= range.max
        )
      );

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
        onClick={() => handleAddToCart(product)}
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
      <ToastContainer /> {/* Toast Container */}

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

      {/* Filter Section */}
      <div className="price-filter-container" style={{ textAlign: 'center' }}>
        <h2>Filter by Price: </h2>
        <div style={{ display: 'inline-flex', gap: '10px' }}>
          {priceRanges.map(range => (
            <label key={range.value} style={{ fontSize: '1rem' }}>
              <input
                type="checkbox"
                checked={selectedRanges.includes(range.value)}
                onChange={() => handleCheckboxChange(range.value)}
                style={{ marginRight: '5px' }}
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
      <div className="products-container">{nonVegListItems}</div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        {paginationButtons}

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

export default NonVegProducts;
