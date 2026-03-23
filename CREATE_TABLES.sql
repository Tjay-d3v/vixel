-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id bigint NOT NULL,
  product_name text NOT NULL,
  price integer NOT NULL, -- Store in cents to avoid floating point issues
  image text,
  quantity integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id text UNIQUE,
  total_amount integer NOT NULL, -- in cents
  currency text DEFAULT 'usd',
  status text DEFAULT 'pending', -- pending, completed, failed, refunded
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id bigserial PRIMARY KEY,
  order_id bigint NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id bigint NOT NULL,
  product_name text NOT NULL,
  price integer NOT NULL,
  quantity integer NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policy for profiles: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policy for cart_items: Users can only see their own cart
CREATE POLICY "Users can view their own cart" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policy for orders: Users can only see their own orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policy for order_items: Users can view order items for their orders
CREATE POLICY "Users can view order items for their orders" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', new.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto-profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_on_signup();
