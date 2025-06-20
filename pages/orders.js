import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { orders } from '../lib/data';
import { formatPrice, formatDate } from '../lib/utils';
import { Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';

const Orders = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Filter orders by current user
  const userOrders = orders.filter(order => order.userId === user?.id);

  // Filter by status
  const filteredOrders = selectedStatus === 'all' 
    ? userOrders 
    : userOrders.filter(order => order.status === selectedStatus);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="My Orders - Genroar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-2">Track and manage your orders</p>
          </div>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {selectedStatus === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${selectedStatus} orders found.`
              }
            </p>
            <button
              onClick={() => router.push('/products')}
              className="btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="card p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.orderDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t pt-4 mb-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t pt-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap gap-3">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  
                  {order.status === 'delivered' && (
                    <>
                      <button className="btn-secondary flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Invoice</span>
                      </button>
                      <button className="btn-secondary">
                        Reorder Items
                      </button>
                    </>
                  )}
                  
                  {order.status === 'shipped' && (
                    <button className="btn-primary">
                      Track Package
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;