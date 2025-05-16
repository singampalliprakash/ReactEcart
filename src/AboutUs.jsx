import React from 'react';
import './AboutUs.css';


function AboutUs() {
  return (
    <div className="about-container">
      <h2>About Fresher Market</h2>
      <p>
        At <strong>Fresher Market</strong>, we are dedicated to delivering the freshest vegetables,
        quality non-veg items, wholesome dairy products, and delicious chocolates directly to your
        doorstep. Our mission is to provide a convenient, healthy, and delightful shopping experience for every customer.
      </p>
      <p>
        We partner with trusted farmers and suppliers to ensure that everything you buy from us meets
        the highest standards of taste, hygiene, and nutrition. Your satisfaction is our top priority.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2884/2884864.png"
        alt="About Us"
        className="about-image"      />
    </div>
  );
}

export default AboutUs;
