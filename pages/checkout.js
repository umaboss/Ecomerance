import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';
import { CreditCard, Truck, Shield, Check } from 'lucide-react';

const Checkout = () => {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
    setTimeout(() => {
      router.push('/orders');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <Layout title="Checkout - Genroar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products before checkout</p>
          <button onClick={() => router.push('/products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  if (orderComplete) {
    return (
      <Layout title="Order Complete - Genroar">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and you will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Redirecting to your orders...</p>
            <button onClick={() => router.push('/orders')} className="btn-primary">
              View My Orders
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout - Genroar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {!isAuthenticated && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-4">Account Information</h2>
                <div className="space-y-4">
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="input-field" required />
                  <p className="text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-primary-500 hover:text-primary-600">Sign in</a>
                  </p>
                </div>
              </div>
            )}

            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Truck className="w-6 h-6 mr-2" /> Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="input-field" required />
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="input-field" required />
                </div>
                <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleInputChange} className="input-field" required />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="input-field" required />
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="input-field" required />
                  <input type="text" name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleInputChange} className="input-field" required />
                </div>
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="input-field" required />
              </form>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2" /> Payment Information
              </h2>
              <div className="space-y-4">
                <input type="text" name="nameOnCard" placeholder="Name on Card" value={formData.nameOnCard} onChange={handleInputChange} className="input-field" required />
                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="input-field" required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className="input-field" required />
                  <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="input-field" required />
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" /> Your payment information is secure and encrypted
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <button onClick={handleSubmit} disabled={isProcessing} className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
              </button>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" /> Secure Checkout
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• SSL encrypted payment processing</p>
                <p>• Your data is safe and secure</p>
                <p>• 30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
