import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart</h1>
          <p className="text-muted-foreground">
            {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8">Add some delicious sweets to get started!</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-candy-pink to-candy-purple hover:from-candy-pink/80 hover:to-candy-purple/80 text-white"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.sweet.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.sweet.image || `https://picsum.photos/200/200?random=${item.sweet.id}`}
                          alt={item.sweet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground truncate">
                              {item.sweet.name}
                            </h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {item.sweet.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.sweet.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.sweet.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold text-lg min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.sweet.id, item.quantity + 1)}
                              disabled={item.quantity >= item.sweet.quantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              ${item.sweet.price.toFixed(2)} each
                            </p>
                            <p className="text-lg font-bold text-candy-pink">
                              ${(item.sweet.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.quantity >= item.sweet.quantity && (
                          <p className="text-sm text-amber-600 mt-2">
                            Maximum available quantity reached
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-candy-pink">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {user ? (
                    <div className="space-y-3">
                      <Button 
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-candy-pink to-candy-purple hover:from-candy-pink/80 hover:to-candy-purple/80 text-white font-bold"
                        size="lg"
                      >
                        Order Now - ${totalPrice.toFixed(2)}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Secure checkout with contact and address details
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        onClick={() => navigate('/login')}
                        className="w-full bg-gradient-to-r from-candy-pink to-candy-purple hover:from-candy-pink/80 hover:to-candy-purple/80 text-white"
                        size="lg"
                      >
                        Sign In to Checkout
                      </Button>
                      <p className="text-sm text-muted-foreground text-center">
                        or <button onClick={() => navigate('/register')} className="text-candy-pink hover:underline">create an account</button>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};