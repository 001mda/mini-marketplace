import { useEffect, useState } from 'react'
import CartList from './CartList'

export default function Cart() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
    window.dispatchEvent(
      new CustomEvent('cart-updated', { detail: items.reduce((s,i)=>s+i.quantity,0) })
    )
  }, [items])

  useEffect(() => {
    const handler = e => {
      setItems(prev => {
        const found = prev.find(i => i.id === e.detail.id)
        if (found) {
          return prev.map(i =>
            i.id === e.detail.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        }
        return [...prev, { ...e.detail, quantity: 1 }]
      })
    }

    window.addEventListener('add-to-cart', handler)
    return () => window.removeEventListener('add-to-cart', handler)
  }, [])

  useEffect(() => {
    document.getElementById('cart-button').onclick = () =>
      setOpen(o => !o)
  }, [])

  const increase = id =>
    setItems(items.map(i =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    ))

  const decrease = id =>
    setItems(items.map(i =>
      i.id === id && i.quantity > 1
        ? { ...i, quantity: i.quantity - 1 }
        : i
    ))

  const remove = id =>
    setItems(items.filter(i => i.id !== id))

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  )

  return (
    <div className={`cart-overlay ${open ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Cart</h3>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <p><strong>Total:</strong> ${total.toFixed(2)}</p>

      <CartList
        items={items}
        increase={increase}
        decrease={decrease}
        remove={remove}
      />
    </div>
  )
}
