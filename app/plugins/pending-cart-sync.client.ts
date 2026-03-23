import { watch } from 'vue'

import { PENDING_CART_KEY, type PendingCartItem, useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

export default defineNuxtPlugin(() => {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const resumePendingCart = () => {
    const rawItem = sessionStorage.getItem(PENDING_CART_KEY)

    if (!rawItem) {
      return
    }

    sessionStorage.removeItem(PENDING_CART_KEY)

    try {
      const item = JSON.parse(rawItem) as PendingCartItem
      const quantity = Math.max(1, Number(item.quantity || 1))

      for (let index = 0; index < quantity; index += 1) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })
      }
    } catch {
      sessionStorage.removeItem(PENDING_CART_KEY)
    }
  }

  watch(
    isAuthenticated,
    (loggedIn) => {
      if (loggedIn) {
        resumePendingCart()
      }
    },
    { immediate: true },
  )
})
