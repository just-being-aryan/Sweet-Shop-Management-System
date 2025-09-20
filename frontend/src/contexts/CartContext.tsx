import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartItem {
  sweet: Sweet;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (sweet: Sweet, quantity?: number) => void;
  removeFromCart: (sweetId: string) => void;
  updateQuantity: (sweetId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartItem: (sweetId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sweetDreamsCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweetDreamsCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (sweet: Sweet, quantity: number = 1) => {
    // Basic check - if no token exists, user is not authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to cart",
        variant: "destructive",
      });
      return;
    }
    
    if (sweet.quantity === 0) {
      toast({
        title: "Out of Stock",
        description: `${sweet.name} is currently out of stock`,
        variant: "destructive",
      });
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.sweet.id === sweet.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > sweet.quantity) {
          toast({
            title: "Insufficient Stock",
            description: `Only ${sweet.quantity} ${sweet.name} available`,
            variant: "destructive",
          });
          return prevItems;
        }
        
        toast({
          title: "Cart Updated",
          description: `${sweet.name} quantity updated in cart`,
        });
        
        return prevItems.map(item =>
          item.sweet.id === sweet.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantity > sweet.quantity) {
          toast({
            title: "Insufficient Stock",
            description: `Only ${sweet.quantity} ${sweet.name} available`,
            variant: "destructive",
          });
          return prevItems;
        }
        
        toast({
          title: "Added to Cart",
          description: `${sweet.name} added to cart`,
        });
        
        return [...prevItems, { sweet, quantity }];
      }
    });
  };

  const removeFromCart = (sweetId: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.sweet.id === sweetId);
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.sweet.name} removed from cart`,
        });
      }
      return prevItems.filter(item => item.sweet.id !== sweetId);
    });
  };

  const updateQuantity = (sweetId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }

    setItems(prevItems => {
      const item = prevItems.find(item => item.sweet.id === sweetId);
      if (item && quantity > item.sweet.quantity) {
        toast({
          title: "Insufficient Stock",
          description: `Only ${item.sweet.quantity} ${item.sweet.name} available`,
          variant: "destructive",
        });
        return prevItems;
      }

      return prevItems.map(item =>
        item.sweet.id === sweetId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.sweet.price * item.quantity), 0);
  };

  const getCartItem = (sweetId: string) => {
    return items.find(item => item.sweet.id === sweetId);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCartItem,
  };

  return (
    <CartContext.Provider value={value}>
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