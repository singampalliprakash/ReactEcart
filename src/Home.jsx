import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const products = useSelector((state) => state.products);

  const categories = [
    { name: 'Veg Items', path: '/veg', description: 'Explore a variety of fresh, organic vegetables.' },
    { name: 'Non-Veg Items', path: '/nonveg', description: 'Premium meats and seafood at unbeatable quality.' },
    { name: 'Milk Products', path: '/milk', description: 'Dairy delights, fresh from the farm to your table.' },
    { name: 'Chocolates', path: '/chocolate', description: 'Treat yourself to our finest chocolate collection.' }
  ];

  const interleaveProducts = () => {
    const keys = ['veg', 'nonVeg', 'milk', 'chocolate'];
    const arrays = keys.map(key => products[key] || []);
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    const interleaved = [];

    for (let i = 0; i < maxLength; i++) {
      for (let j = 0; j < arrays.length; j++) {
        if (arrays[j][i]) {
          interleaved.push(arrays[j][i]);
        }
      }
    }

    return interleaved;
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="home-heading">
          Welcome to <span className="green-text">eCart</span>
        </h1>
        <p className="home-subheading">
          Shop smarter. Live better. Choose your category below.
        </p>
      </div>

      {/* Category Cards */}
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <h3 className="category-title">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <Link to={category.path}>
              <button className="explore-button">Explore</button>
            </Link>
          </div>
        ))}
      </div>

      {/* All Products */}
      <h2 className="products-heading">All Products</h2>
      <div className="products-grid">
        {interleaveProducts().map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
