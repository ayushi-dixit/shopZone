import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist, selectWishlist } from '../redux/wishlistSlice';
import './ProductCard.css';

export default function ProductCard({ product, delay = 0 }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const isWished = wishlist.some(i => i.id === product.id);

  const handleAdd = e => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleWish = e => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`wish-btn ${isWished ? 'wished' : ''}`}
          onClick={handleWish}
          title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWished ? '♥' : '♡'}
        </button>
        {product.featured && <span className="card-tag">Featured</span>}
        {product.stock <= 10 && <span className="card-tag stock-tag">Low Stock</span>}
      </div>
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-rating">
          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          <span>{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>
        <div className="card-footer">
          <span className="card-price">₹{product.price.toLocaleString()}</span>
          <button className="add-btn" onClick={handleAdd}>+ Cart</button>
        </div>
      </div>
    </Link>
  );
}
