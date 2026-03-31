import { useState } from "react";

const ITEMS = [
  { id: 1, name: "Field Watch",    price: 189, tag: "Accessories" },
  { id: 2, name: "Canvas Tote",    price: 54,  tag: "Bags" },
  { id: 3, name: "Wool Scarf",     price: 76,  tag: "Apparel" },
  { id: 4, name: "Pour-Over",      price: 42,  tag: "Kitchen" },
  { id: 5, name: "Linen Notebook", price: 28,  tag: "Stationery" },
  { id: 6, name: "Desk Lamp",      price: 135, tag: "Home" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .shop-root {
    font-family: 'DM Sans', sans-serif;
    background: #F7F4EF;
    min-height: 100vh;
    color: #1a1a1a;
  }

  .shop-wrap {
    max-width: 740px;
    margin: 0 auto;
    padding: 40px 24px 60px;
  }

  .shop-header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 32px;
  }

  .shop-title {
    font-family: 'DM Serif Display', serif;
    font-size: 32px;
    color: #1a1a1a;
    letter-spacing: -0.5px;
  }

  .shop-subtitle {
    font-size: 13px;
    color: #999;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
    gap: 12px;
    margin-bottom: 40px;
  }

  .card {
    background: #fff;
    border: 1px solid #E8E3DB;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .card:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.07);
    transform: translateY(-2px);
  }

  .tag {
    font-size: 10px;
    font-weight: 600;
    color: #b5a898;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.3;
  }

  .price {
    font-size: 13px;
    color: #666;
    font-variant-numeric: tabular-nums;
  }

  .add-btn {
    margin-top: auto;
    padding: 7px 12px;
    border: 1.5px solid #D4CEC6;
    border-radius: 8px;
    background: transparent;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    cursor: pointer;
    color: #444;
    transition: background 0.15s, border-color 0.15s;
    letter-spacing: 0.02em;
  }

  .add-btn:hover {
    background: #F0EBE3;
    border-color: #bbb;
  }

  .qty-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
  }

  .qty-btn {
    width: 28px;
    height: 28px;
    border: 1.5px solid #D4CEC6;
    border-radius: 6px;
    background: transparent;
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
    transition: background 0.15s;
    font-family: 'DM Sans', sans-serif;
  }

  .qty-btn:hover { background: #F0EBE3; }

  .qty-num {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    min-width: 16px;
    text-align: center;
  }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    margin-bottom: 16px;
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .cart-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #999;
  }

  .cart-box {
    background: #fff;
    border: 1px solid #E8E3DB;
    border-radius: 16px;
    padding: 20px 24px;
  }

  .cart-empty {
    text-align: center;
    color: #bbb;
    padding: 28px 0;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .cart-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #F0EBE3;
    font-size: 13px;
    color: #444;
  }

  .cart-row-name { color: #1a1a1a; font-weight: 500; }

  .shipping-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #F0EBE3;
    font-size: 13px;
    color: #888;
  }

  .free-tag {
    color: #6BAC84;
    font-weight: 600;
    font-size: 12px;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 17px;
    margin-top: 16px;
    font-family: 'DM Serif Display', serif;
    letter-spacing: -0.3px;
  }

  .checkout-btn {
    width: 100%;
    padding: 13px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    margin-top: 16px;
    letter-spacing: 0.04em;
    transition: background 0.2s, transform 0.1s;
  }

  .checkout-btn:hover { background: #333; }
  .checkout-btn:active { transform: scale(0.99); }
`;

function ProductCard({ product, qty, onAdd, onUpdate }) {
  return (
    <div className="card">
      <div className="tag">{product.tag}</div>
      <div className="name">{product.name}</div>
      <div className="price">${product.price}</div>
      {qty > 0 ? (
        <div className="qty-row">
          <button className="qty-btn" onClick={() => onUpdate(product.id, -1)}>−</button>
          <span className="qty-num">{qty}</span>
          <button className="qty-btn" onClick={() => onUpdate(product.id, 1)}>+</button>
        </div>
      ) : (
        <button className="add-btn" onClick={() => onAdd(product.id)}>+ Add</button>
      )}
    </div>
  );
}

function CartSection({ cart }) {
  const cartItems = ITEMS.filter(p => (cart[p.id] || 0) > 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const shipping = cartItems.length > 0 && subtotal < 100 ? 12 : 0;
  const total = subtotal + shipping;
  const itemCount = cartItems.length;

  return (
    <>
      <div className="section-title">
        Cart
        {itemCount > 0 && (
          <span className="cart-count">
            ({itemCount} item{itemCount > 1 ? "s" : ""})
          </span>
        )}
      </div>
      <div className="cart-box">
        {cartItems.length === 0 ? (
          <div className="cart-empty">Your cart is empty</div>
        ) : (
          <>
            {cartItems.map(p => (
              <div className="cart-row" key={p.id}>
                <span className="cart-row-name">{p.name} × {cart[p.id]}</span>
                <span>${(p.price * cart[p.id]).toFixed(2)}</span>
              </div>
            ))}
            <div className="shipping-row">
              <span>Shipping</span>
              <span>
                {shipping > 0
                  ? `$${shipping}`
                  : <span className="free-tag">Free ✓</span>
                }
              </span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Checkout →</button>
          </>
        )}
      </div>
    </>
  );
}

export default function Shop() {
  const [cart, setCart] = useState({});

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateCart = (id, delta) => {
    setCart(prev => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="shop-root">
        <div className="shop-wrap">
          <div className="shop-header">
            <h1 className="shop-title">Shop</h1>
            <span className="shop-subtitle">Curated goods</span>
          </div>

          <div className="grid">
            {ITEMS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                qty={cart[product.id] || 0}
                onAdd={addToCart}
                onUpdate={updateCart}
              />
            ))}
          </div>

          <CartSection cart={cart} />
        </div>
      </div>
    </>
  );
}
