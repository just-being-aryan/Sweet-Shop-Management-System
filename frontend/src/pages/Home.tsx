import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SweetCard } from '@/components/sweets/SweetCard';
import { SearchAndFilter } from '@/components/sweets/SearchAndFilter';
import { useSweets } from '@/hooks/useSweet';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Star, Gift } from 'lucide-react';

export const Home: React.FC = () => {
  const { 
    sweets, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    purchaseSweet 
  } = useSweets();
  
  const { user, isAdmin } = useAuth();

  const handlePurchase = async (sweetId: string) => {
    if (!user) {
      return;
    }
    await purchaseSweet(sweetId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="bg-gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Sweet Dreams
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the finest collection of artisanal sweets and confections
          </p>
          <div className="flex justify-center space-x-8 text-sm opacity-80">
            <div className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Premium Quality
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Handcrafted
            </div>
            <div className="flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Perfect Gifts
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />

        {!user && (
          <div className="text-center mb-8 p-6 bg-gradient-secondary rounded-lg">
            <h3 className="text-lg font-semibold text-candy-chocolate mb-2">
              Sign in to start shopping
            </h3>
            <p className="text-candy-chocolate/80 mb-4">
              Create an account or sign in to purchase our delicious sweets
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="caramel">Sign In</Button>
              <Button variant="candy">Register</Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchase={handlePurchase}
              isAdmin={isAdmin}
            />
          ))}
        </div>

        {sweets.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍭</div>
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              No sweets found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};