import { useToast } from '@/hooks/use-toast';

export const mockSweets = [
  {
    id: '1',
    name: 'Chocolate Truffles',
    category: 'Chocolate',
    price: 12.99,
    quantity: 25,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop'
  },
  {
    id: '2', 
    name: 'Strawberry Gummies',
    category: 'Gummies',
    price: 8.50,
    quantity: 40,
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Vanilla Caramels',
    category: 'Caramel',
    price: 15.75,
    quantity: 18,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Rainbow Lollipops',
    category: 'Lollipops',
    price: 6.25,
    quantity: 60,
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Dark Chocolate Bars',
    category: 'Chocolate',
    price: 9.99,
    quantity: 32,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop'
  },
  {
    id: '6',
    name: 'Mint Chocolate Chips',
    category: 'Chocolate',
    price: 11.50,
    quantity: 0,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=300&fit=crop'
  }
];

export const useMockMode = () => {
  const { toast } = useToast();

  const mockLogin = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockToken = btoa(JSON.stringify({
      id: '1',
      email: email,
      role: email.includes('admin') ? 'admin' : 'user'
    }));
    
    localStorage.setItem('token', `mock.${mockToken}.signature`);
    
    toast({
      title: "Demo Mode Login",
      description: "Successfully logged in with demo account!",
    });
  };

  const mockRegister = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mockLogin(email, password);
    
    toast({
      title: "Demo Mode Registration", 
      description: "Demo account created successfully!",
    });
  };

  return {
    mockLogin,
    mockRegister,
    mockSweets
  };
};