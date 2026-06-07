import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/cartSlice';
import { selectWishlist } from '../redux/wishlistSlice';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const cartCount = useSelector(selectCartCount);
  const wishlist = useSelector(selectWishlist);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">ShopZone</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''} end>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Products</NavLink>
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Wishlist</NavLink>

          <form className="nav-search" onSubmit={handleSearch}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
            />
            <button type="submit">🔍</button>
          </form>
        </div>

        <div className="nav-actions">
          <NavLink to="/wishlist" className="nav-icon-btn" title="Wishlist">
            ♡
            {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </NavLink>
          <NavLink to="/cart" className="nav-icon-btn cart-btn" title="Cart">
            🛒
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </NavLink>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
