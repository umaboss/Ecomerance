import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../lib/data';
import { Filter, Grid, List, SortAsc, X, Star } from 'lucide-react';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy.startsWith('min-rating-')) {
      const minRating = parseInt(sortBy.split('-')[2]);
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    if (sortBy === 'in-stock') {
      filtered = filtered.filter(product => product.stock > 0);
    }

    if (!sortBy.startsWith('min-rating') && sortBy !== 'in-stock') {
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
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, sortBy, searchQuery, selectedBrand]);

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500]);
    setSortBy('name');
    setSearchQuery('');
    setSelectedBrand('');
  };

  return (
    <Layout title="Products - Genroar">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600 text-sm">Showing {filteredProducts.length} products</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4 lg:mt-0">
            <div className="flex border rounded-md overflow-hidden shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Sort by Rating</option>
            </select>

            <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary flex items-center space-x-2 lg:hidden">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`w-full lg:w-64 ${showFilters ? '' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 border rounded-xl shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={resetFilters} className="text-primary-500 text-sm hover:underline">Clear All</button>
              </div>

              <div>
                <h4 className="font-medium mb-3">Search</h4>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input type="radio" name="category" value="" checked={selectedCategory === ''} onChange={(e) => setSelectedCategory(e.target.value)} className="accent-primary-500" />
                    <span className="ml-2">All</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center">
                      <input type="radio" name="category" value={cat.name} checked={selectedCategory === cat.name} onChange={(e) => setSelectedCategory(e.target.value)} className="accent-primary-500" />
                      <span className="ml-2">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input type="radio" name="brand" value="" checked={selectedBrand === ''} onChange={(e) => setSelectedBrand(e.target.value)} className="accent-primary-500" />
                    <span className="ml-2">All Brands</span>
                  </label>
                  {["Nike", "Adidas", "Puma", "Apple"].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input type="radio" name="brand" value={brand} checked={selectedBrand === brand} onChange={(e) => setSelectedBrand(e.target.value)} className="accent-primary-500" />
                      <span className="ml-2">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Rating</h4>
                <div className="flex flex-col gap-2 text-yellow-500 text-sm">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setSortBy(`min-rating-${rating}`)}
                      className="hover:text-yellow-600 flex items-center gap-1"
                    >
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} view={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SortAsc className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">No products found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or sorting</p>
                <button onClick={resetFilters} className="btn-primary">Reset Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
