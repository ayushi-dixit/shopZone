import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Home.css';

const featured = products.filter(p => p.featured);
const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <span className="badge">New Arrivals 2026</span>
          <h1 className="hero-title">
            Curated for<br />
            <span className="gold-text">Discerning Taste</span>
          </h1>
          <p className="hero-sub">
            Premium products handpicked for quality, design, and performance. Shop with confidence.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">Explore Products</Link>
            <Link to="/products?category=Electronics" className="btn-secondary">Electronics →</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>1200+</strong><span>Products</span></div>
            <div className="stat"><strong>4.8★</strong><span>Avg Rating</span></div>
            <div className="stat"><strong>Free</strong><span>Shipping</span></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} className="cat-card">
              <span>{cat}</span>
              <span className="cat-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="see-all">See All →</Link>
        </div>
        <div className="products-grid">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div className="promo-text">
            <h2>Free Shipping on Orders Above ₹999</h2>
            <p>Use code <strong>SHOPZONE2026</strong> for extra 10% off your first order</p>
          </div>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </section>

      {/* Top Rated */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Top Rated</h2>
          <Link to="/products" className="see-all">See All →</Link>
        </div>
        <div className="products-grid">
          {topRated.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </section>
    </div>
  );
}
