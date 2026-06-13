export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'niche' | 'designer';
  price: number;
  tags: string[];
  image: string;
  description?: string;
  alt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
