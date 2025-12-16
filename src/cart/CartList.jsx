import CartItem from './CartItem'

export default function CartList({ items, increase, decrease, remove }) {
  return items.map(item => (
    <CartItem
      key={item.id}
      item={item}
      onPlus={() => increase(item.id)}
      onMinus={() => decrease(item.id)}
      onRemove={() => remove(item.id)}
    />
  ))
}
