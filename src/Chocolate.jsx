import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store'; // ✅ Import the AddToCart action
import './Chocolate.css';
import './App.css';

function Chocolate() {
  const dispatch = useDispatch();
  const chocolateProducts = useSelector((state) => state.products.chocolate);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(chocolateProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chocolateProducts.slice(indexOfFirstItem, indexOfLastItem);

  const chocolateListItems = currentItems.map((product) => (
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
      className={currentPage === index + 1 ? 'active' : ''}
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
          color: '#28a745',
          marginTop: '30px',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        Chocolate Products
      </h1>

      <div className="products-container">{chocolateListItems}</div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev"
        >
          Previous
        </button>

        {paginationButtons}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="next"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Chocolate;
