// composables/useCart.ts
import { reactive, computed, watch } from 'vue'

const isClient = process.client

interface CartItem {
  id: number
  productName: string
  productImage: string
  sellPrice: number
  qty: number
}

const state = reactive({
  cart: isClient ? JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[] : []
})

// Save to localStorage whenever cart changes
if (isClient) {
  watch(
    () => state.cart,
    (newCart) => {
      localStorage.setItem('cart', JSON.stringify(newCart))
    },
    { deep: true }
  )
}

export function useCart() {
  const cart = computed(() => state.cart)

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    const existing = state.cart.find((item) => item.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      state.cart.push({
        id: product.id,
        productName: product.name,
        productImage: product.image,
        sellPrice: product.price,
        qty: 1
      })
    }
  }

  const removeFromCart = (id: number) => {
    state.cart = state.cart.filter((item) => item.id !== id)
  }

  const increaseQty = (id: number) => {
    const item = state.cart.find((item) => item.id === id)
    if (item) item.qty += 1
  }

  const decreaseQty = (id: number) => {
    const item = state.cart.find((item) => item.id === id)
    if (item) item.qty = Math.max(1, item.qty - 1)
  }

  const clearCart = () => {
    state.cart = []
  }

  const subtotal = computed(() => state.cart.reduce((sum, item) => sum + item.sellPrice * item.qty, 0))

  return { cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, subtotal }
}
