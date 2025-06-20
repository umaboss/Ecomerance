// Mock data for the e-commerce site
export const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 2, name: 'Clothing', slug: 'clothing', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 4, name: 'Sports', slug: 'sports', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 5, name: 'Books', slug: 'books', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 6, name: 'Beauty', slug: 'beauty', image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500' }
];

export const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Electronics',
    categoryId: 1,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    description: 'High-quality wireless Bluetooth headphones with noise cancellation and 24-hour battery life.',
    stock: 25,
    rating: 4.5,
    reviews: 128,
    featured: true
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-t-shirt',
    price: 24.99,
    originalPrice: 34.99,
    category: 'Clothing',
    categoryId: 2,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    description: '100% organic cotton t-shirt with comfortable fit and premium quality fabric.',
    stock: 50,
    rating: 4.3,
    reviews: 89,
    featured: true
  },
  {
    id: 3,
    name: 'Modern Table Lamp',
    slug: 'modern-table-lamp',
    price: 45.99,
    originalPrice: 59.99,
    category: 'Home & Garden',
    categoryId: 3,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    description: 'Elegant modern table lamp with adjustable brightness and minimalist design.',
    stock: 15,
    rating: 4.7,
    reviews: 45,
    featured: false
  },
  {
    id: 4,
    name: 'Running Shoes',
    slug: 'running-shoes',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Sports',
    categoryId: 4,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    description: 'Comfortable running shoes with advanced cushioning and breathable material.',
    stock: 30,
    rating: 4.6,
    reviews: 156,
    featured: true
  },
  {
    id: 5,
    name: 'Programming Book Set',
    slug: 'programming-book-set',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Books',
    categoryId: 5,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    description: 'Complete set of programming books covering web development, algorithms, and best practices.',
    stock: 20,
    rating: 4.8,
    reviews: 73,
    featured: false
  },
  {
    id: 6,
    name: 'Skincare Set',
    slug: 'skincare-set',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Beauty',
    categoryId: 6,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    description: 'Complete skincare routine set with cleanser, moisturizer, and serum for all skin types.',
    stock: 35,
    rating: 4.4,
    reviews: 92,
    featured: false
  }
];

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    joinDate: '2023-06-20',
    lastLogin: '2024-01-19'
  }
];

export const orders = [
  {
    id: 'ORD-001',
    userId: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { id: 1, name: 'Wireless Bluetooth Headphones', quantity: 1, price: 79.99 },
      { id: 2, name: 'Premium Cotton T-Shirt', quantity: 2, price: 24.99 }
    ],
    total: 129.97,
    status: 'delivered',
    orderDate: '2024-01-15',
    shippingAddress: '123 Main St, City, State 12345'
  },
  {
    id: 'ORD-002',
    userId: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { id: 4, name: 'Running Shoes', quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    status: 'shipped',
    orderDate: '2024-01-18',
    shippingAddress: '123 Main St, City, State 12345'
  }
];