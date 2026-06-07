import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">◆</span>
          <span className="logo-text">ShopZone</span>
          <p>Premium products, delivered with care.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/products?category=Electronics">Electronics</Link>
          <Link to="/products?category=Accessories">Accessories</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="footer-links">
          <h4>Account</h4>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
        <div className="footer-links">
          <h4>Tech Stack</h4>
          <p>React.js</p>
          <p>Redux Toolkit</p>
          <p>React Router v6</p>
          <p>Context API</p>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 ShopZone. Built with React & Redux.</p>
      </div>
    </footer>
  );
}
