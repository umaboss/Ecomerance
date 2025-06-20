'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../lib/data';
import { Filter, SortAsc } from 'lucide-react';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const category = categories.find(c => c.slug === slug);

  useEffect(() => {
    if (category) {
      let filtered = products.filter(product => product.categoryId === category.id);
      
      // Filter by price range
      filtered = filtered.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });

      setFilteredProducts(filtered);
    }
  }, [category, sortBy, priceRange]);

  if (!category) {
    return (
      <Layout title="Category Not Found">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/categories')} className="btn-primary">
            Browse Categories
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${category.name} - Genroar`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-gray-600 mb-4">
            Showing {filteredProducts.length} products in {category.name}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Price:</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-32"
              />
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SortAsc className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <button 
              onClick={() => setPriceRange([0, 500])}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;