import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, User } from 'lucide-react';

interface OrderForm {
  name: string;
  phone: string;
  email: string;
  pickupTime: string;
  specialInstructions: string;
}

const Checkout = () => {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<OrderForm>({
    name: '',
    phone: '',
    email: '',
    pickupTime: '',
    specialInstructions: ''
  });

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Generate slots for today and tomorrow
    for (let day = 0; day < 2; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      
      const startHour = day === 0 ? Math.max(8, currentHour + (currentMinute > 30 ? 2 : 1)) : 8;
      const endHour = 20; // 8 PM
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeDate = new Date(date);
          timeDate.setHours(hour, minute, 0, 0);
          
          const timeString = timeDate.toLocaleString('en-US', {
            weekday: day === 0 ? undefined : 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          
          slots.push({
            value: timeDate.toISOString(),
            label: timeString
          });
        }
      }
    }
    
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.email) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, phone, and email are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare order data for Supabase
      const orderData = {
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        pickupTime: form.pickupTime,
        specialInstructions: form.specialInstructions,
        items: state.items,
        total: state.total * 1.085, // Including tax
      };

      // Get auth token if user is logged in
      const token = user ? (await supabase.auth.getSession()).data.session?.access_token : null;

      // Submit order to Supabase Edge Function
      const response = await supabase.functions.invoke('submit-order', {
        body: { orderData },
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to submit order');
      }

      if (!response.data?.success) {
        throw new Error('Order submission failed');
      }

      clearCart();
      
      const pickupMessage = form.pickupTime 
        ? `Your order will be ready for pickup at ${new Date(form.pickupTime).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}.`
        : 'We will contact you to confirm pickup time.';
      
      toast({
        title: "Order confirmed!",
        description: `Thank you ${form.name}! ${pickupMessage}`,
      });

      navigate('/order-confirmation', { 
        state: { 
          orderId: response.data.orderId,
          pickupTime: form.pickupTime,
          customerName: form.name
        } 
      });
      
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Order failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-primary mb-2">
            Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your order details below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Select value={form.pickupTime} onValueChange={(value) => handleInputChange('pickupTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup time (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeSlots().map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {slot.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={form.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Any special requests or dietary restrictions..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing Order...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Place Order
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8.5%)</span>
                  <span>${(state.total * 0.085).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">
                    ${(state.total * 1.085).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold mb-2">Pickup Information</h4>
                <p className="text-sm text-muted-foreground">
                  📍 Harvest Moon Deli<br />
                  123 Main Street, Downtown<br />
                  Phone: (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;