import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { isWithinOperatingHours, getOperatingHoursLabel } from '@/utils/hours';
import { useStoreHours } from '@/contexts/StoreHoursContext';

const CartSlideOut = () => {
  const { state, updateQuantity, removeItem, setSlideOutOpen } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const { showOrderAheadPopup } = useStoreHours();

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    setIsUpdating(id);
    await new Promise(resolve => setTimeout(resolve, 200));
    updateQuantity(id, newQuantity);
    setIsUpdating(null);
  };

  const handleRemoveItem = async (id: string) => {
    setIsUpdating(id);
    await new Promise(resolve => setTimeout(resolve, 200));
    removeItem(id);
    setIsUpdating(null);
  };

  const handleClose = () => {
    setSlideOutOpen(false);
  };

  if (!state.isSlideOutOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Slide-out panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="font-handwritten text-xl font-bold text-primary">Your Cart</h2>
              <Badge variant="secondary" className="text-xs">
                {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Add some delicious items to get started!
                </p>
                <Link to="/menu" onClick={handleClose}>
                  <Button>Browse Menu</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-l"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isUpdating === item.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 w-6"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={isUpdating === item.id || item.quantity <= 1}
                              className="h-6 w-6"
                            >
                              <Minus className="h-2 w-2" />
                            </Button>
                            
                            <span className="font-semibold text-sm w-6 text-center">
                              {isUpdating === item.id ? '...' : item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={isUpdating === item.id}
                              className="h-6 w-6"
                            >
                              <Plus className="h-2 w-2" />
                            </Button>
                          </div>
                          
                          <div className="font-bold text-sm text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer with totals and checkout */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="space-y-2">
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
              
              <div className="space-y-2">
                <Link 
                  to="/checkout" 
                  className="block"
                  onClick={(e) => {
                    if (!isWithinOperatingHours()) {
                      e.preventDefault();
                      console.log('Store is closed, showing popup');
                      showOrderAheadPopup();
                    } else {
                      console.log('Store is open, proceeding to checkout');
                      handleClose();
                    }
                  }}
                >
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/cart" className="block" onClick={handleClose}>
                  <Button variant="outline" className="w-full">
                    View Full Cart
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSlideOut;
