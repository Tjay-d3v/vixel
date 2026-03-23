import { ref, computed, watch } from 'vue'

export interface CartItem {
  id: string
  productId: number
  productName: string
  productImage: string
  sellPrice: number
  qty: number
}

const isClient = typeof window !== 'undefined'
const LOCAL_CART_KEY = 'vixel:cart'

// Local cart state
const cartItems = ref<CartItem[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// Initialize from localStorage
if (isClient) {
  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY)
    cartItems.value = stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('[Cart] Error loading from localStorage:', err)
    cartItems.value = []
  }
}

// Save to localStorage whenever cart changes
watch(
  cartItems,
  (newCart) => {
    if (isClient) {
      try {
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
      } catch (err) {
        console.error('[Cart] Error saving to localStorage:', err)
      }
    }
  },
  { deep: true }
)

export function useCart() {
  const supabase = useSupabaseClient()
  const { user, isAuthenticated } = useAuth()

  /**
   * Initialize cart from localStorage or Supabase
   */
  const initializeCart = async () => {
    try {
      if (isAuthenticated.value && user.value) {
        // Load from Supabase
        await fetchCartFromSupabase()
      }
      // localStorage is already loaded on init
    } catch (err) {
      console.error('[Cart] Error initializing cart:', err)
    }
  }

  /**
   * Fetch cart from Supabase
   */
  const fetchCartFromSupabase = async () => {
    if (!isAuthenticated.value || !user.value) {
      return
    }

    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.value.id)

      if (err) throw err

      cartItems.value = (data || []).map((item: any) => ({
        id: item.id.toString(),
        productId: item.product_id,
        productName: item.product_name,
        productImage: item.image || '',
        sellPrice: item.price,
        qty: item.quantity,
      }))
    } catch (err) {
      console.error('[Cart] Error fetching from Supabase:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load cart'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Add item to cart
   */
  const addToCart = async (product: { id: number; name: string; price: number; image: string }) => {
    try {
      error.value = null
      
      const existing = cartItems.value.find((item) => item.productId === product.id)

      if (isAuthenticated.value && user.value) {
        // Update in Supabase
        if (existing) {
          const { error: err } = await supabase
            .from('cart_items')
            .update({ quantity: existing.qty + 1 })
            .eq('user_id', user.value.id)
            .eq('product_id', product.id)

          if (err) throw err
          existing.qty += 1
        } else {
          const { error: err } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.value.id,
              product_id: product.id,
              product_name: product.name,
              image: product.image,
              price: product.price,
              quantity: 1,
            })

          if (err) throw err
          cartItems.value.push({
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            sellPrice: product.price,
            qty: 1,
          })
        }
      } else {
        // Update localStorage only
        if (existing) {
          existing.qty += 1
        } else {
          cartItems.value.push({
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            sellPrice: product.price,
            qty: 1,
          })
        }
      }

      console.log('[Cart] Added item:', product.name)
      return true
    } catch (err) {
      console.error('[Cart] Error adding to cart:', err)
      error.value = err instanceof Error ? err.message : 'Failed to add item'
      return false
    }
  }

  /**
   * Remove item from cart
   */
  const removeFromCart = async (id: number) => {
    try {
      error.value = null
      
      if (isAuthenticated.value && user.value) {
        const { error: err } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.value.id)
          .eq('product_id', id)

        if (err) throw err
      }

      cartItems.value = cartItems.value.filter((item) => item.productId !== id)
    } catch (err) {
      console.error('[Cart] Error removing from cart:', err)
      error.value = err instanceof Error ? err.message : 'Failed to remove item'
    }
  }

  /**
   * Update quantity
   */
  const updateQuantity = async (productId: number, qty: number) => {
    try {
      error.value = null
      const item = cartItems.value.find((i) => i.productId === productId)
      
      if (!item) throw new Error('Item not found')
      if (qty <= 0) {
        await removeFromCart(productId)
        return
      }

      if (isAuthenticated.value && user.value) {
        const { error: err } = await supabase
          .from('cart_items')
          .update({ quantity: qty })
          .eq('user_id', user.value.id)
          .eq('product_id', productId)

        if (err) throw err
      }

      item.qty = qty
    } catch (err) {
      console.error('[Cart] Error updating quantity:', err)
      error.value = err instanceof Error ? err.message : 'Failed to update quantity'
    }
  }

  /**
   * Increase quantity
   */
  const increaseQty = (id: number) => {
    const item = cartItems.value.find((item) => item.productId === id)
    if (item) {
      updateQuantity(id, item.qty + 1)
    }
  }

  /**
   * Decrease quantity
   */
  const decreaseQty = (id: number) => {
    const item = cartItems.value.find((item) => item.productId === id)
    if (item) {
      updateQuantity(id, Math.max(1, item.qty - 1))
    }
  }

  /**
   * Clear cart
   */
  const clearCart = async () => {
    try {
      error.value = null
      
      if (isAuthenticated.value && user.value) {
        const { error: err } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.value.id)

        if (err) throw err
      }

      cartItems.value = []
    } catch (err) {
      console.error('[Cart] Error clearing cart:', err)
      error.value = err instanceof Error ? err.message : 'Failed to clear cart'
    }
  }

  /**
   * Merge local cart into Supabase (called on login)
   */
  const mergeLocalCart = async (): Promise<void> => {
    if (!isAuthenticated.value || !user.value || cartItems.value.length === 0) return

    try {
      error.value = null
      
      for (const item of cartItems.value) {
        // Check if item exists in Supabase
        const { data: existing } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.value.id)
          .eq('product_id', item.productId)
          .single()

        if (existing) {
          // Update quantity
          await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + item.qty })
            .eq('user_id', user.value.id)
            .eq('product_id', item.productId)
        } else {
          // Insert new
          await supabase
            .from('cart_items')
            .insert({
              user_id: user.value.id,
              product_id: item.productId,
              product_name: item.productName,
              image: item.productImage,
              price: item.sellPrice,
              quantity: item.qty,
            })
        }
      }

      // Reload from Supabase
      await fetchCartFromSupabase()
      console.log('[Cart] Merged local cart into Supabase')
    } catch (err) {
      console.error('[Cart] Error merging cart:', err)
      error.value = err instanceof Error ? err.message : 'Failed to merge cart'
    }
  }

  /**
   * Computed properties
   */
  const cart = computed(() => cartItems.value)
  const totalQuantity = computed(() => cartItems.value.reduce((sum, item) => sum + item.qty, 0))
  const subtotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.sellPrice * item.qty, 0))

  return {
    cart,
    cartItems,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    totalQuantity,
    subtotal,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    updateQuantity,
    initializeCart,
    fetchCartFromSupabase,
    mergeLocalCart,
  }
}
