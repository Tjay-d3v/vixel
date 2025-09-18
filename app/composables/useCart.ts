export const useCart = () => {
  // persisted state (Nuxt useState)
  const cart = useState('cart', () => [] as Array<{ id:number; productName:string; sellPrice:number; productImage:string; qty:number }>)

  const addToCart = (product: { id:number; productName:string; sellPrice:number; productImage:string }, qty = 1) => {
    const found = cart.value.find(i => i.id === product.id)
    if (found) {
      found.qty += qty
    } else {
      cart.value.push({ ...product, qty })
    }
  }

  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter(i => i.id !== id)
  }

  const increaseQty = (id: number) => {
    const p = cart.value.find(i => i.id === id)
    if (p) p.qty++
  }

  const decreaseQty = (id: number) => {
    const p = cart.value.find(i => i.id === id)
    if (p && p.qty > 1) p.qty--
  }

  const clearCart = () => { cart.value = [] }

  const subtotal = computed(() => cart.value.reduce((s, i) => s + i.sellPrice * i.qty, 0))

  return { cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, subtotal }
}
