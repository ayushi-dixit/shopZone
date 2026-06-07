import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist, selectWishlist } from '../redux/wishlistSlice';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);

  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="not-found container">
        <h2>Product not found</h2>
        <button className="btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWished = wishlist.some(i => i.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="detail-page container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Products</Link>
        <span>›</span>
        <Link to={`/products?category=${product.category}`}>{product.category}</Link>
        <span>›</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.name} />
          {product.featured && <span className="detail-tag">Featured</span>}
        </div>

        {/* Info */}
        <div className="detail-info">
          <span className="badge">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating">
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
            <span>{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <p className="detail-price">₹{product.price.toLocaleString()}</p>

          <p className="detail-desc">{product.description}</p>

          <div className="detail-stock">
            <span className={`stock-dot ${product.stock > 10 ? 'in' : 'low'}`} />
            {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
          </div>

          <div className="detail-qty">
            <label>Quantity</label>
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`btn-primary detail-add ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              className={`wish-large ${isWished ? 'wished' : ''}`}
              onClick={() => dispatch(toggleWishlist(product))}
            >
              {isWished ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
          </div>

          <Link to="/cart" className="btn-secondary buy-now" style={{textAlign:'center',display:'block'}}>
            Go to Cart →
          </Link>

          <div className="detail-perks">
            <div className="perk">🚚 Free delivery above ₹999</div>
            <div className="perk">↩ 30-day easy returns</div>
            <div className="perk">🔒 Secure checkout</div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related-section">
          <h2>You May Also Like</h2>
          <div className="products-grid">
            {related.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 80} />)}
          </div>
        </section>
      )}
    </div>
  );
}
