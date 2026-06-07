# ShopZone – E-Commerce Frontend

**Minor Project: E-commerce Frontend with Redux/Context**

A fully functional, modern e-commerce frontend built with React.js, Redux Toolkit, and React Router v6.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Run

```bash
# 1. Extract the ZIP
# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app opens at `http://localhost:3000`

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React.js 18 | UI Components |
| Redux Toolkit | Global State Management |
| React Router v6 | Navigation & Routing |
| CSS3 | Styling & Responsiveness |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js         # Responsive navigation bar
│   ├── Footer.js         # Footer with links
│   └── ProductCard.js    # Reusable product card
├── pages/
│   ├── Home.js           # Landing page with featured products
│   ├── Products.js       # Product listing with filter/sort
│   ├── ProductDetail.js  # Individual product page
│   ├── Cart.js           # Shopping cart
│   ├── Wishlist.js       # Saved products
│   └── Checkout.js       # Order form & placement
├── redux/
│   ├── store.js          # Redux store configuration
│   ├── cartSlice.js      # Cart state & actions
│   └── wishlistSlice.js  # Wishlist state & actions
└── data/
    └── products.js       # Product data
```

---

## ✅ Features

- **Home Page** – Hero section, categories, featured & top-rated products
- **Product Listing** – Category filter, price range, sort by price/rating/name
- **Search** – Search products by name, category, or description
- **Product Detail** – Full detail view with quantity selector
- **Add to Cart / Remove** – Redux-powered cart management
- **Wishlist** – Toggle products in/out of wishlist
- **Cart Page** – Quantity update, remove items, order summary
- **Checkout** – Form validation, payment method selection, order placement
- **Responsive Design** – Works on mobile, tablet, and desktop

---

## 🎓 Concepts Demonstrated

- Functional components with Hooks (`useState`, `useEffect`, `useMemo`)
- Redux Toolkit (`createSlice`, `configureStore`, `useSelector`, `useDispatch`)
- React Router v6 (`BrowserRouter`, `Routes`, `Route`, `useParams`, `useNavigate`, `useSearchParams`)
- Component reusability (ProductCard used across multiple pages)
- Conditional rendering
- Props and state management
- Dynamic routing (`/products/:id`)

---

## 👨‍💻 Submitted by

Student Name: _______________  
Course: Minor Project – E-commerce Frontend with Redux/Context  
Deadline: 08/06/2026
