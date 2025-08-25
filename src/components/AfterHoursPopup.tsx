import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface AfterHoursPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AfterHoursPopup = ({ isOpen, onClose }: AfterHoursPopupProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  // Store hours (can be moved to a config file)
  const storeHours = {
    monday: { open: '7:00', close: '19:00' },
    tuesday: { open: '7:00', close: '19:00' },
    wednesday: { open: '7:00', close: '19:00' },
    thursday: { open: '7:00', close: '19:00' },
    friday: { open: '7:00', close: '20:00' },
    saturday: { open: '8:00', close: '20:00' },
    sunday: { open: '9:00', close: '18:00' }
  };

  // Generate available pickup dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        }),
        dayName
      });
    }
    
    return dates;
  };

  // Generate available pickup times for selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof storeHours;
    const hours = storeHours[dayName];
    
    if (!hours) return [];
    
    const times = [];
    const [openHour, openMinute] = hours.open.split(':').map(Number);
    const [closeHour, closeMinute] = hours.close.split(':').map(Number);
    
    // Generate 30-minute intervals
    for (let hour = openHour; hour < closeHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === closeHour - 1 && minute >= closeMinute) break;
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        times.push({
          value: timeString,
          label: displayTime
        });
      }
    }
    
    return times;
  };

  const availableDates = getAvailableDates();
  const availableTimes = getAvailableTimes();

  const handleScheduleOrder = () => {
    if (selectedDate && selectedTime) {
      // Store the scheduled pickup info (you might want to add this to cart context)
      localStorage.setItem('scheduledPickup', JSON.stringify({
        date: selectedDate,
        time: selectedTime
      }));
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            We're Currently Closed
          </DialogTitle>
          <DialogDescription>
            Don't worry! You can still place your order and schedule a pickup time during our business hours.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Cart Status */}
          {totalItems > 0 && (
            <div className="bg-secondary/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShoppingBag className="h-4 w-4" />
                You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
              </div>
            </div>
          )}

          {/* Store Hours */}
          <div className="space-y-2">
            <h4 className="font-medium">Our Store Hours:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <span>Mon - Thu:</span>
                <span>7:00 AM - 7:00 PM</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Fri - Sat:</span>
                <span>7:00 AM - 8:00 PM</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Sunday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Schedule Pickup */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Your Pickup
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Pickup Date</label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDate && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Pickup Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {totalItems > 0 ? (
              <>
                <Button 
                  onClick={handleScheduleOrder}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full"
                >
                  Schedule Order for Pickup
                </Button>
                <Link to="/cart" onClick={onClose}>
                  <Button variant="outline" className="w-full">
                    Review Cart
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/menu" onClick={onClose}>
                  <Button className="w-full">
                    Browse Menu & Place Order
                  </Button>
                </Link>
                <Button 
                  onClick={handleScheduleOrder}
                  disabled={!selectedDate || !selectedTime}
                  variant="outline"
                  className="w-full"
                >
                  Just Schedule Pickup Time
                </Button>
              </>
            )}
            
            <Button variant="ghost" onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AfterHoursPopup;
