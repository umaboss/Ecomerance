import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products, categories } from '../lib/data';
import { ChevronRight, Star, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(products.filter(product => product.featured));
  }, []);

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Quality Products',
      description: 'Carefully curated product selection'
    }
  ];

  return (
    <Layout title="Genroar - Your Online Shopping Destination">
      {/* Hero Section */}
      <section className="relative bg-[url('/assets/banner.jpeg')] h-[95vh] bg-cover bg-center z-0 text-white">
  {/* Gradient Overlay at Bottom */}
  <div className="absolute bottom-0 left-0 right-0 h-16 " />

  {/* Buttons Centered at Bottom */}
  <div className="absolute bottom-[35%] left-1/2 transform -translate-x-1/2 z-20">
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <Link
        href="/products"
        className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
      >
        Shop Now
      </Link>
      <Link
        href="/categories"
        className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
      >
        Browse Categories
      </Link>
    </div>
  </div>
</section>


      {/* Features Section */}
   <section className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
  {/* Background bubbles */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-400 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-60 right-20 w-80 h-80 rounded-full bg-secondary-300 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full bg-accent-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section header */}
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Amazing Features</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover what makes our product stand out from the crowd
      </p>
    </div>

    {/* Features grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-white/20"
        >
          {/* Floating gradient icon */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg group-hover:shadow-primary-300/30 group-hover:scale-110 transition-all duration-500">
            <div className="text-2xl">{feature.icon}</div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              {feature.description}
            </p>
          </div>

          {/* Hover effects */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-200/50 group-hover:shadow-[inset_0_0_20px_0_rgba(99,102,241,0.1)] transition-all duration-500 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      ))}
    </div>
  </div>

  {/* Animation styles */}
  <style jsx>{`
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</section>


      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products" className="flex items-center text-primary-500 hover:text-primary-600 font-medium">
              View All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of categories and find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <ShoppingBag className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary px-8 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;