-- Add missing fields to orders table
ALTER TABLE public.orders 
ADD COLUMN email text,
ADD COLUMN pickup_time timestamp with time zone,
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Create index for better performance
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);

-- Enable realtime for orders table
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;