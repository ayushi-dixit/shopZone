import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';
import './Checkout.css';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const shipping = total > 999 ? 0 : 99;
  const tax = Math.round(total * 0.18);
  const grandTotal = total + shipping + tax;

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', payment: 'card'
  });
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) {
    return (
      <div className="checkout-empty container">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="order-success container">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, <strong>{form.name || 'Customer'}</strong>! Your order has been confirmed.</p>
        <p className="order-id">Order ID: #SZ{Date.now().toString().slice(-8)}</p>
        <div className="success-actions">
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.phone.length < 10) e.phone = 'Valid phone required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.pincode || form.pincode.length < 6) e.pincode = 'Valid pincode required';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    dispatch(clearCart());
    setPlaced(true);
  };

  const Field = ({ name, label, type = 'text', placeholder }) => (
    <div className={`field ${errors[name] ? 'error' : ''}`}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => {
          setForm(f => ({ ...f, [name]: e.target.value }));
          setErrors(err => ({ ...err, [name]: undefined }));
        }}
      />
      {errors[name] && <span className="err-msg">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="checkout-page container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <section className="form-section">
            <h3>Personal Information</h3>
            <div className="fields-row">
              <Field name="name" label="Full Name" placeholder="John Doe" />
              <Field name="email" label="Email" type="email" placeholder="john@example.com" />
            </div>
            <Field name="phone" label="Phone Number" type="tel" placeholder="9876543210" />
          </section>

          <section className="form-section">
            <h3>Delivery Address</h3>
            <Field name="address" label="Street Address" placeholder="123, MG Road" />
            <div className="fields-row">
              <Field name="city" label="City" placeholder="Mumbai" />
              <Field name="state" label="State" placeholder="Maharashtra" />
            </div>
            <Field name="pincode" label="Pincode" placeholder="400001" />
          </section>

          <section className="form-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              {[
                { value: 'card', label: '💳 Credit / Debit Card' },
                { value: 'upi', label: '📱 UPI' },
                { value: 'cod', label: '💵 Cash on Delivery' },
              ].map(opt => (
                <label key={opt.value} className={`payment-opt ${form.payment === opt.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={() => setForm(f => ({ ...f, payment: opt.value }))}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </section>

          <button type="submit" className="btn-primary place-order-btn">
            Place Order · ₹{grandTotal.toLocaleString()}
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity}</p>
                </div>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-rows">
            <div className="summary-row"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="summary-row"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="summary-divider" />
            <div className="summary-row total"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
