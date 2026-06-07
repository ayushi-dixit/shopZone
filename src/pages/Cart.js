import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems, selectCartTotal,
  removeFromCart, updateQuantity, clearCart
} from '../redux/cartSlice';
import './Cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const shipping = total > 999 ? 0 : 99;
  const tax = Math.round(total * 0.18);

  if (items.length === 0) {
    return (
      <div className="cart-empty container">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button className="clear-btn" onClick={() => dispatch(clearCart())}>
          Clear All
        </button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item fade-in">
              <Link to={`/products/${item.id}`} className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-info">
                <Link to={`/products/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p className="cart-item-cat">{item.category}</p>
                <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="cart-item-actions">
                <div className="qty-control">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <p className="cart-item-total">₹{(item.price * item.quantity).toLocaleString()}</p>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18% GST)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(total + shipping + tax).toLocaleString()}</span>
            </div>
          </div>

          {shipping > 0 && (
            <p className="shipping-tip">
              Add ₹{(999 - total).toLocaleString()} more for free shipping!
            </p>
          )}

          <Link to="/checkout" className="btn-primary checkout-btn">
            Proceed to Checkout →
          </Link>

          <Link to="/products" className="continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
