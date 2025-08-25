import { useState, useEffect } from 'react';

interface StoreHours {
  [key: string]: { open: string; close: string };
}

const storeHours: StoreHours = {
  monday: { open: '07:00', close: '19:00' },
  tuesday: { open: '07:00', close: '19:00' },
  wednesday: { open: '07:00', close: '19:00' },
  thursday: { open: '07:00', close: '19:00' },
  friday: { open: '07:00', close: '20:00' },
  saturday: { open: '08:00', close: '20:00' },
  sunday: { open: '09:00', close: '18:00' }
};

export const useStoreHours = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);

  const checkStoreStatus = () => {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    const todayHours = storeHours[dayName];
    if (!todayHours) {
      setIsOpen(false);
      return false;
    }

    const isCurrentlyOpen = currentTime >= todayHours.open && currentTime <= todayHours.close;
    setIsOpen(isCurrentlyOpen);
    
    return isCurrentlyOpen;
  };

  const showAfterHoursPopup = () => {
    setShouldShowPopup(true);
  };

  const hideAfterHoursPopup = () => {
    setShouldShowPopup(false);
  };

  useEffect(() => {
    // Check store status immediately
    checkStoreStatus();
    
    // Check every minute
    const interval = setInterval(checkStoreStatus, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    isOpen,
    shouldShowPopup,
    showAfterHoursPopup,
    hideAfterHoursPopup,
    storeHours
  };
};
