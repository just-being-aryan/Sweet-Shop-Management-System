import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package } from 'lucide-react';

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: string) => void;
  isAdmin?: boolean;
  onEdit?: (sweet: Sweet) => void;
}

export const SweetCard: React.FC<SweetCardProps> = ({ 
  sweet, 
  onPurchase, 
  isAdmin = false, 
  onEdit 
}) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <Card className="group hover:shadow-sweet transition-all duration-300 hover:scale-105 overflow-hidden bg-gradient-to-br from-card to-card/50">
      <div className="aspect-square overflow-hidden">
        <img
          src={sweet.image || `https://picsum.photos/300/300?random=${sweet.id}`}
          alt={sweet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-candy-pink transition-colors">
            {sweet.name}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {sweet.category}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-candy-pink">
            ${sweet.price.toFixed(2)}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Package className="h-4 w-4 mr-1" />
            <span className={isOutOfStock ? 'text-destructive' : 'text-candy-purple'}>
              {sweet.quantity} left
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="purchase"
            className="flex-1"
            disabled={isOutOfStock}
            onClick={() => onPurchase(sweet.id)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          
          {isAdmin && onEdit && (
            <Button 
              variant="sweet"
              size="sm"
              onClick={() => onEdit(sweet)}
            >
              Edit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};