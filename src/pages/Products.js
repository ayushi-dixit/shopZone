import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Products.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const selectedCategory = params.get('category') || '';
  const searchQuery = params.get('search') || '';

  const filtered = useMemo(() => {
    let list = [...products];

    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [selectedCategory, searchQuery, sort, priceRange]);

  const setCategory = cat => {
    const p = new URLSearchParams(params);
    if (cat) p.set('category', cat); else p.delete('category');
    p.delete('search');
    setParams(p);
  };

  return (
    <div className="products-page container">
      <div className="products-header">
        <div>
          <h1>{searchQuery ? `Results for "${searchQuery}"` : selectedCategory || 'All Products'}</h1>
          <p>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="products-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <button
              className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setCategory('')}
            >
              All ({products.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat} ({products.filter(p => p.category === cat).length})
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h3>Max Price: ₹{priceRange[1].toLocaleString()}</h3>
            <input
              type="range"
              min={0}
              max={10000}
              step={500}
              value={priceRange[1]}
              onChange={e => setPriceRange([0, Number(e.target.value)])}
              className="price-range"
            />
            <div className="range-labels"><span>₹0</span><span>₹10,000</span></div>
          </div>

          <div className="filter-group">
            <h3>Availability</h3>
            <label className="check-label">
              <input type="checkbox" defaultChecked /> In Stock
            </label>
          </div>
        </aside>

        {/* Grid */}
        <div className="products-main">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn-primary" onClick={() => { setCategory(''); setParams({}); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 60} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
