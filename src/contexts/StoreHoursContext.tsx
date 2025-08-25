import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface StoreHours {
  [key: string]: { open: string; close: string };
}

interface StoreHoursContextType {
  isOpen: boolean;
  shouldShowPopup: boolean;
  showOrderAheadPopup: () => void;
  hideOrderAheadPopup: () => void;
  storeHours: StoreHours;
}

const StoreHoursContext = createContext<StoreHoursContextType | undefined>(undefined);

const storeHours: StoreHours = {
  monday: { open: '06:00', close: '15:00' },
  tuesday: { open: '06:00', close: '15:00' },
  wednesday: { open: '06:00', close: '15:00' },
  thursday: { open: '06:00', close: '15:00' },
  friday: { open: '06:00', close: '15:00' },
  saturday: { open: '06:00', close: '15:00' },
  sunday: { open: '06:00', close: '15:00' }
};

export const StoreHoursProvider = ({ children }: { children: ReactNode }) => {
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

  const showOrderAheadPopup = () => {
    console.log('Context: showOrderAheadPopup called, setting shouldShowPopup to true');
    setShouldShowPopup(true);
  };

  const hideOrderAheadPopup = () => {
    console.log('Context: hideOrderAheadPopup called, setting shouldShowPopup to false');
    setShouldShowPopup(false);
  };

  useEffect(() => {
    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    isOpen,
    shouldShowPopup,
    showOrderAheadPopup,
    hideOrderAheadPopup,
    storeHours
  };

  console.log('StoreHoursProvider render - shouldShowPopup:', shouldShowPopup);

  return (
    <StoreHoursContext.Provider value={value}>
      {children}
    </StoreHoursContext.Provider>
  );
};

export const useStoreHours = () => {
  const context = useContext(StoreHoursContext);
  if (context === undefined) {
    throw new Error('useStoreHours must be used within a StoreHoursProvider');
  }
  return context;
};
