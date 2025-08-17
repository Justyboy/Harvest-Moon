import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'sandwiches' | 'salads' | 'breakfast' | 'drinks';
  image: string;
  featured?: boolean;
  ingredients: string[] | string;
  nutritionalValues: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sodium?: number;
  };
  badge?: string | null;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  isSlideOutOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_SLIDE_OUT' }
  | { type: 'SET_SLIDE_OUT'; payload: boolean };

interface CartContextType {
  state: CartState;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  toggleSlideOut: () => void;
  setSlideOutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          isSlideOutOpen: true
        };
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          isSlideOutOpen: true
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: filteredItems,
          total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    
    case 'TOGGLE_SLIDE_OUT':
      return { ...state, isSlideOutOpen: !state.isSlideOutOpen };
    
    case 'SET_SLIDE_OUT':
      return { ...state, isSlideOutOpen: action.payload };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, isSlideOutOpen: false });

  const addItem = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleSlideOut = () => {
    dispatch({ type: 'TOGGLE_SLIDE_OUT' });
  };

  const setSlideOutOpen = (open: boolean) => {
    dispatch({ type: 'SET_SLIDE_OUT', payload: open });
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      toggleSlideOut,
      setSlideOutOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};