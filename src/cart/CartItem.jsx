export default function CartItem({ item, onPlus, onMinus, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />

      <div className="cart-info">
        <p className="cart-title">{item.title}</p>
        <p className="cart-price">${item.price}</p>

        <div className="cart-controls">
          <button onClick={onMinus} className="icon-btn">
            <svg viewBox="0 0 24 24" className="icon">
              <rect x="5" y="11" width="14" height="2"/>
            </svg>
          </button>

          <span className="cart-qty">{item.quantity}</span>

          <button onClick={onPlus} className="icon-btn">
            <svg viewBox="0 0 24 24" className="icon">
              <rect x="11" y="5" width="2" height="14"/>
              <rect x="5" y="11" width="14" height="2"/>
            </svg>
          </button>

          <button onClick={onRemove} className="icon-btn danger">
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M3 6h18"/>
              <path d="M8 6v14"/>
              <path d="M16 6v14"/>
              <path d="M5 6l1 14c0 .6.4 1 1 1h10c.6 0 1-.4 1-1l1-14"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
