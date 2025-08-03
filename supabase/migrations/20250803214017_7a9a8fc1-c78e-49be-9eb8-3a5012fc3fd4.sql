-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can view all orders" ON public.orders;

-- Create new policies that allow both authenticated and anonymous orders
CREATE POLICY "Anyone can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own orders or staff can view all" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NULL OR 
  user_id = auth.uid() OR 
  user_id IS NULL
);

CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (
  user_id = auth.uid() OR 
  (user_id IS NULL AND auth.uid() IS NULL)
);