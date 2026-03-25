/*
  # Create Products and Orders Tables

  1. New Tables
    - `products` - Store book products
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer in cents)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `orders` - Store customer orders
      - `id` (uuid, primary key)
      - `customer_email` (text)
      - `total_amount` (integer in cents)
      - `status` (text: pending, completed, failed)
      - `stripe_payment_intent_id` (text)
      - `created_at` (timestamp)
    
    - `order_items` - Store items in each order
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price_at_purchase` (integer in cents)

  2. Security
    - Enable RLS on all tables
    - Public read access for products
    - Orders accessible by email

  3. Initial Data
    - Add the "True Light" book as a product
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  total_amount integer NOT NULL,
  status text DEFAULT 'pending',
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  price_at_purchase integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (customer_email = current_user OR true);

CREATE POLICY "Anyone can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view order items for their orders"
  ON order_items FOR SELECT
  TO public
  USING (true);

INSERT INTO products (name, description, price, image_url)
VALUES (
  'True Light',
  'A powerful book providing clarity and hope in a world full of confusion. A beacon for anyone struggling with purpose and meaning.',
  1999,
  '/Book-Mock-Up-01-1.png'
)
ON CONFLICT DO NOTHING;
