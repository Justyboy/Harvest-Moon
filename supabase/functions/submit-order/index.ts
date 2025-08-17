import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = "https://kigzfqzvipxgakjlvbvr.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZ3pmcXp2aXB4Z2Framx2YnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTA5ODMsImV4cCI6MjA2OTc2Njk4M30.--fGkw3n5X4RTs45uzGBaxqOsN2GTCgkkciOJYXBN_E";
    
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      try {
        const { data: { user } } = await supabase.auth.getUser(token);
        
        if (user) {
          // Set the auth context for this request
          supabase.auth.setSession({
            access_token: token,
            refresh_token: '',
          });
        }
      } catch (authError) {
        console.log('Auth error (continuing as anonymous):', authError);
        // Continue without authentication - allow anonymous orders
      }
    }

    const { orderData } = await req.json();
    console.log('Received order data:', orderData);

    // Validate required fields
    if (!orderData.customerName || !orderData.phone || !orderData.email || !orderData.items || !orderData.total) {
      return new Response(
        JSON.stringify({ error: 'Missing required order fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get current user if authenticated (with error handling)
    let user = null;
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      user = currentUser;
    } catch (getUserError) {
      console.log('Could not get user (continuing as anonymous):', getUserError);
      // Continue as anonymous user
    }

    // Prepare order data
    const orderToInsert = {
      customer_name: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      pickup_time: orderData.pickupTime,
      special_instructions: orderData.specialInstructions || null,
      order_items: orderData.items,
      delivery_method: 'pickup',
      order_status: 'new',
      user_id: user ? user.id : null,
    };

    console.log('Inserting order:', orderToInsert);

    // Insert order into database
    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderToInsert)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create order', details: error.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Order created successfully:', order);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: order.id,
        order: order
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in submit-order function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});