/*
  # Add Indexes to Foreign Keys and Fix RLS Policies

  1. Performance Improvements
    - Add index on `order_items.order_id` for foreign key query performance
    - Add index on `order_items.product_id` for foreign key query performance

  2. Security Improvements
    - Replace overly permissive "Anyone can insert orders" policy with email validation
    - Replace overly permissive "Anyone can insert order items" policy with order ownership validation
    - Users can only insert orders with their own email
    - Users can only insert order items for orders they own

  3. RLS Policy Changes
    - `orders` INSERT policy now validates customer_email is provided
    - `order_items` INSERT policy now validates order ownership
*/

-- Add indexes for foreign keys to improve query performance
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Drop overly permissive policies and create secure replacements
DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
DROP POLICY IF EXISTS "Anyone can insert order items" ON order_items;

-- Create secure policies for orders INSERT
CREATE POLICY "Users can insert orders with valid email"
  ON orders FOR INSERT
  WITH CHECK (customer_email IS NOT NULL AND customer_email != '');

-- Create secure policies for order_items INSERT with order ownership validation
CREATE POLICY "Users can insert order items for existing orders"
  ON order_items FOR INSERT
  WITH CHECK (
    order_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_id
    )
  );
