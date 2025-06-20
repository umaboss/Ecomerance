'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/data';
import {
  Star as StarIcon,
  ShoppingCart,
  Heart,
  Share,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [shared, setShared] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedFeatures, setExpandedFeatures] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/products')} 
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-md"
          >
            Browse Products
          </button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize
    }, quantity);
  };

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= product.stock) setQuantity(newQty);
  };

  const handleWishlistToggle = () => setWishlist(prev => !prev);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const toggleFeatures = () => setExpandedFeatures(!expandedFeatures);

  return (
    <Layout title={`${product.name} - Genroar`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-primary-600 transition">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-primary-600 transition">Products</a>
          <span className="mx-2">/</span>
          <a href={`/categories/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-primary-600 transition capitalize">{product.category}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-contain w-full h-full transition-opacity duration-300"
                priority
              />
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  NEW
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto py-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === idx 
                      ? 'border-primary-600 ring-2 ring-primary-400' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumb ${idx}`} 
                    width={64} 
                    height={64} 
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              {/* Rating and SKU */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary-700">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600">{product.shortDescription || 'No description available.'}</p>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary-600' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedSize === size
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 py-4">
              <span className="text-sm font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  disabled={quantity <= 1}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 w-12 text-center bg-white">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)} 
                  disabled={quantity >= product.stock}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg shadow-md transition disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button 
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border hover:bg-gray-50 transition ${wishlist ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-600 border-gray-200'}`}
              >
                <Heart className={`w-5 h-5 ${wishlist ? 'fill-current' : ''}`} />
              </button>

              <button 
                onClick={handleShare}
                className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition relative"
              >
                <Share className="w-5 h-5" />
                {shared && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded shadow whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500">For orders over $50. Delivery in 2-3 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">2-Year Warranty</p>
                  <p className="text-xs text-gray-500">Coverage for manufacturer defects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>

            {/* Key Features (Collapsible) */}
            <div className="border rounded-lg overflow-hidden">
              <button 
                onClick={toggleFeatures}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <span className="font-medium">Key Features</span>
                {expandedFeatures ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedFeatures && (
                <ul className="p-4 pt-0 space-y-2">
                  {(product.features || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {(!product.features || product.features.length === 0) && (
                    <li className="text-gray-500 text-sm">No features listed for this product.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specs'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({product.reviews || 0})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p>{product.description || 'No detailed description available.'}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Technical Specifications</h3>
                {product.specifications ? (
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="py-3 pr-4 text-sm font-medium text-gray-900">{key}</td>
                          <td className="py-3 pl-4 text-sm text-gray-500">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No specifications available.</p>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">What's in the Box</h3>
                {product.includedItems && product.includedItems.length > 0 ? (
                  <ul className="space-y-2">
                    {product.includedItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No included items listed.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                {product.reviews > 0 ? (
                  <p className="text-gray-600">Reviews functionality will be implemented here.</p>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;