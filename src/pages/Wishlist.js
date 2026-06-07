import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlist, toggleWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import './Wishlist.css';

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty container">
        <div className="empty-icon">♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Save products you love to come back to them later.</p>
        <Link to="/products" className="btn-primary">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      <h1>My Wishlist <span>({wishlist.length})</span></h1>

      <div className="wishlist-grid">
        {wishlist.map((item, i) => (
          <div key={item.id} className="wish-card fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <Link to={`/products/${item.id}`} className="wish-img">
              <img src={item.image} alt={item.name} />
            </Link>
            <div className="wish-info">
              <p className="wish-cat">{item.category}</p>
              <Link to={`/products/${item.id}`}>
                <h3>{item.name}</h3>
              </Link>
              <p className="wish-price">₹{item.price.toLocaleString()}</p>
              <div className="wish-actions">
                <button
                  className="btn-primary wish-add"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to Cart
                </button>
                <button
                  className="wish-remove"
                  onClick={() => dispatch(toggleWishlist(item))}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
