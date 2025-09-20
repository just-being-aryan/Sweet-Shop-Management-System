import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockSweets } from './useMockMode';

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const useSweets = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { toast } = useToast();

  const fetchSweets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/api/sweets`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to fetch sweets');

      const data = await response.json();
      setSweets(data);
    } catch (error) {
      console.error('Fetch sweets error:', error);
      
      // Fallback to mock data if backend is not available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const { mockSweets } = await import('./useMockMode');
        setSweets(mockSweets);
        
        toast({
          title: "Demo Mode",
          description: "Using sample data - backend not connected",
        });
        return;
      }
      
      toast({
        title: "Error",
        description: "Failed to load sweets",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchSweets = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('name', searchQuery);
      if (categoryFilter && categoryFilter !== 'all') params.append('category', categoryFilter);

      const response = await fetch(`${API_BASE}/api/sweets/search?${params}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setSweets(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Search failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseSweet = async (id: string, quantity: number = 1) => {
    try {
      const response = await fetch(`${API_BASE}/api/sweets/${id}/purchase`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Purchase failed');

      toast({
        title: "Success",
        description: "Sweet purchased successfully!",
      });

      await fetchSweets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Purchase failed",
        variant: "destructive",
      });
    }
  };

  const addSweet = async (sweetData: Omit<Sweet, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE}/api/sweets`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(sweetData),
      });

      if (!response.ok) throw new Error('Failed to add sweet');

      toast({
        title: "Success",
        description: "Sweet added successfully!",
      });

      await fetchSweets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add sweet",
        variant: "destructive",
      });
    }
  };

  const updateSweet = async (id: string, sweetData: Partial<Sweet>) => {
    try {
      const response = await fetch(`${API_BASE}/api/sweets/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(sweetData),
      });

      if (!response.ok) throw new Error('Failed to update sweet');

      toast({
        title: "Success",
        description: "Sweet updated successfully!",
      });

      await fetchSweets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update sweet",
        variant: "destructive",
      });
    }
  };

  const deleteSweet = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/sweets/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to delete sweet');

      toast({
        title: "Success",
        description: "Sweet deleted successfully!",
      });

      await fetchSweets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sweet",
        variant: "destructive",
      });
    }
  };

  const restockSweet = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE}/api/sweets/${id}/restock`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Failed to restock sweet');

      toast({
        title: "Success",
        description: "Sweet restocked successfully!",
      });

      await fetchSweets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restock sweet",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (searchQuery || (categoryFilter && categoryFilter !== 'all')) {
      searchSweets();
    } else {
      fetchSweets();
    }
  }, [searchQuery, categoryFilter]);

  const filteredSweets = sweets.filter(sweet => {
    return (!searchQuery || sweet.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
           (!categoryFilter || categoryFilter === 'all' || sweet.category === categoryFilter);
  });

  const categories = [...new Set(sweets.map(sweet => sweet.category))];

  return {
    sweets: filteredSweets,
    isLoading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    purchaseSweet,
    addSweet,
    updateSweet,
    deleteSweet,
    restockSweet,
    refreshSweets: fetchSweets,
  };
};