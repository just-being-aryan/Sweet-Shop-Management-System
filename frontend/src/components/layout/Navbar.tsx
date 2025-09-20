import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, LogOut, Settings, ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const cartItemsCount = getTotalItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-candy-pink" />
            <span className="text-2xl font-bold brand-name">
              Sweet Dreams
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-candy-pink"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
                {isAdmin && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => navigate('/admin')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-candy-pink to-candy-purple hover:from-candy-pink/80 hover:to-candy-purple/80 text-white" 
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};