import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Eye, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Add your animation trigger here if using Framer Motion
  };

  return (
    <Link href={`/products/${product.slug}`} className="group relative">
      <div className="relative bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 h-full flex flex-col isolate">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-400/10 rounded-full filter blur-3xl"></div>
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden aspect-square bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={product.featured}
          />
          
          {/* Premium Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.originalPrice > product.price && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
                <Zap className="w-3 h-3 mr-1 fill-white" />
                {Math.round((1 - product.price/product.originalPrice) * 100)}% OFF
              </div>
            )}
            {product.isNew && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                NEW ARRIVAL
              </div>
            )}
          </div>
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button 
                onClick={handleAddToCart}
                className="bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-xl hover:bg-primary-50 hover:text-primary-600 transition-all hover:scale-110"
                title="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-xl hover:bg-rose-50 hover:text-rose-600 transition-all hover:scale-110">
                <Heart className="w-5 h-5" />
              </button>
              <button className="bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all hover:scale-110">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 pt-4 flex flex-col flex-grow">
          {/* Category */}
          {product.category && (
            <span className="text-xs font-medium text-primary-600 mb-1.5 uppercase tracking-wider">
              {product.category}
            </span>
          )}
          
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Indicator */}
            {product.stock < 10 && product.stock > 0 && (
              <div className="mt-2">
                <div className="text-xs text-rose-600 font-medium">
                  Only {product.stock} left in stock!
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-rose-500 h-1.5 rounded-full" 
                    style={{ width: `${(product.stock/10)*100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Mobile Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:shadow-md transition-all flex items-center justify-center gap-2 sm:hidden"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Premium Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary-500 rotate-45 transform origin-center"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;