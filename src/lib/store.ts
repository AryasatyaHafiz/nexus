import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'Electronics',
    stock: 15,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-canceling wireless headphones',
    price: 199.99,
    category: 'Electronics',
    stock: 32,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 349.99,
    category: 'Furniture',
    stock: 8,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },
  
  updateProduct: (id, productData) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, ...productData, updatedAt: new Date() }
          : product
      ),
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },
  
  getProduct: (id) => {
    return get().products.find((product) => product.id === id);
  },
}));