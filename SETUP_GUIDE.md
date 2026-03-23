# Vixel - Nuxt 3 + Supabase + Stripe Integration Guide

## ✅ What's Been Completed

### 1. **Environment & Configuration**
- ✅ Updated `.env.local` with correct Supabase and Stripe credentials
- ✅ Configured `nuxt.config.ts` with proper runtime config (server-only and public keys)
- ✅ Installed `@supabase/ssr` for SSR-safe PKCE handling

### 2. **Supabase Authentication**
- ✅ Created new `useSupabaseClient()` composable using `@supabase/ssr` for browser-safe client
- ✅ Created `useAuth()` composable with methods:
  - `fetchUser()` - Get current authenticated user
  - `signIn(email, password)` - Email/password authentication
  - `signUp(email, password, fullName)` - New user registration
  - `signInWithGoogle(redirectUrl)` - Google OAuth (PKCE-safe!)
  - `signOut()` - Logout
  - Redirect management functions
- ✅ Fixed OAuth callback handling in `/auth/callback` page
- ✅ Updated auth-init plugin to skip callback page (prevents PKCE verifier loss)

### 3. **Server Utilities**
- ✅ Created `server/utils/supabase.ts` with:
  - `useSupabaseServerAdmin()` - Server-side admin client (uses service_role key)
  - `createServerSupabaseClient(token)` - Client with user auth token

## 📋 What Still Needs to Be Done

### 1. **Supabase Tables Setup** (Manual)
Create these tables in your Supabase dashboard:

```sql
-- Profiles table (linked to auth.users)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Cart items table
CREATE TABLE cart_items (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id bigint NOT NULL,
  product_name text NOT NULL,
  price integer NOT NULL,
  image text,
  quantity integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE orders (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id text,
  total_amount integer NOT NULL,
  currency text DEFAULT 'usd',
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id bigserial PRIMARY KEY,
  order_id bigint NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id bigint NOT NULL,
  product_name text NOT NULL,
  price integer NOT NULL,
  quantity integer NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
```

Enable RLS (Row-Level Security) on these tables for security.

### 2. **Auto-Create Profile on Sign-Up**
Create a database trigger or use a Supabase function to automatically create a profile when a user signs up.

```sql
-- After user creates auth account, auto-create profile
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (new.id, COALESCE(new.user_metadata->>'name', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_on_signup();
```

### 3. **Cart Management Composable** (Almost done!)
The `useCart()` composable needs updating:
- Fetch cart items from `cart_items` table
- Add/remove/update items
- Sync with Supabase

Update `app/composables/useCart.ts`:
```ts
export function useCart() {
  const supabase = useSupabaseClient()
  const { user } = useAuth()
  const cartItems = ref([])

  const fetchCart = async () => {
    if (!user.value) return
    
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.value.id)
    
    if (error) {
      console.error('Error fetching cart:', error)
      return
    }
    
    cartItems.value = data || []
  }

  const addItem = async (productId, name, price, image) => {
    if (!user.value) throw new Error('Not authenticated')
    
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.value.id,
        product_id: productId,
        product_name: name,
        price,
        image,
        quantity: 1,
      })
    
    if (error) throw error
    await fetchCart()
  }

  // Add updateItem, removeItem, clearCart methods...

  return {
    cartItems: readonly(cartItems),
    fetchCart,
    addItem,
    // ... other methods
  }
}
```

### 4. **Stripe Payment Integration**
Create API route `server/api/checkout.post.ts`:

```ts
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { amount, currency = 'usd' } = body

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata: {
      userId: body.userId,
      orderId: body.orderId,
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
  }
})
```

### 5. **Checkout Page with Stripe**
Create `app/pages/checkout.vue` with:
- Display cart items
- Stripe Elements integration
- Process payment
- Create order in Supabase on success

## 🚀 Next Steps

### 1. **Test Google OAuth**
```bash
npm run dev
```
- Go to http://localhost:3000/login
- Click "Continue with Google"
- You should be redirected to Google, then back to `/products` after login
- Check browser DevTools console for debug logs

### 2. **Create Supabase Tables**
Run the SQL above in your Supabase dashboard SQL editor.

### 3. **Implement Cart Management**
Update `app/composables/useCart.ts` with the code above.

### 4. **Build Stripe Integration**
Create the checkout API route and page (templates provided above).

### 5. **Create Order on Payment Success**
In checkout.vue or API route:
```ts
const { data: order, error } = await supabase
  .from('orders')
  .insert({
    user_id: user.value!.id,
    stripe_payment_intent_id: paymentIntent.id,
    total_amount: totalPrice,
    status: 'completed',
  })
  .select()
  .single()
```

## 🔑 Key Files

### Client-Side (Safe)
- `app/composables/useSupabaseClient.ts` - Browser client
- `app/composables/useAuth.ts` - Auth logic
- `app/pages/login.vue` - Login form with Google OAuth
- `app/pages/auth/callback.vue` - OAuth callback handler

### Server-Side (Secure)
- `server/utils/supabase.ts` - Admin client for server operations
- `server/api/checkout.post.ts` - Create Stripe payment intent
- `server/api/create-payment-intent.post.ts` - Store orders in Supabase

## ⚠️ Important Security Notes

✅ **Never expose these to the client:**
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`

✅ **These are safe for client code:**
- `SUPABASE_ANON_KEY` (public)
- `STRIPE_PUBLISHABLE_KEY` (public)

The `.env.local` has them all, but the `nuxt.config.ts` ensures:
- Server-only keys are in `runtimeConfig` (not public)
- Public keys are in `runtimeConfig.public`

##  Testing Checklist

- [ ] Google OAuth redirects correctly
- [ ] User is created in Supabase auth
- [ ] Profile is auto-created
- [ ] Cart items can be added/removed
- [ ] Stripe payment intent is created
- [ ] Order is created after payment
- [ ] Session persists on page reload

Good luck! 🚀
