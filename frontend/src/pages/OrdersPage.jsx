import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiClock, FiCheckCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function OrdersPage() {
  const navigate = useNavigate();
  const { orders, services } = useCart();
  const [displayOrders, setDisplayOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Initialize with demo orders
  useEffect(() => {
    if (orders && orders.length > 0) {
      setDisplayOrders(orders);
    } else {
      // Fallback: Create demo orders from scratch
      const demoOrders = createDemoOrders(services);
      setDisplayOrders(demoOrders);
      localStorage.setItem('orders', JSON.stringify(demoOrders));
    }
  }, [orders, services]);

  // Create demo orders
  const createDemoOrders = (servicesList) => {
    if (!servicesList || servicesList.length === 0) return [];
    
    return [
      {
        orderId: 'ORD-1704505200000',
        items: [
          servicesList.find(s => s._id === "1") || { ...servicesList[0], _id: "1", hours: 8 },
          servicesList.find(s => s._id === "21") || { ...servicesList[5], _id: "21", hours: 4 }
        ].map(item => ({ ...item, hours: item.hours || 5 })),
        totalAmount: 760,
        totalHours: 12,
        status: 'completed',
        date: '12/28/2024',
        time: '10:30:45 AM',
        estimatedCompletion: '01/04/2025'
      },
      {
        orderId: 'ORD-1704678600000',
        items: [servicesList.find(s => s._id === "13") || { ...servicesList[10], _id: "13", hours: 3 }].map(item => ({ ...item, hours: item.hours || 3 })),
        totalAmount: 180,
        totalHours: 3,
        status: 'in-progress',
        date: '01/01/2025',
        time: '2:15:30 PM',
        estimatedCompletion: '01/08/2025'
      },
      {
        orderId: 'ORD-1704765000000',
        items: [
          servicesList.find(s => s._id === "9") || { ...servicesList[15], _id: "9", hours: 1 },
          servicesList.find(s => s._id === "10") || { ...servicesList[16], _id: "10", hours: 2 }
        ].map(item => ({ ...item, hours: item.hours || 2 })),
        totalAmount: 330,
        totalHours: 3,
        status: 'confirmed',
        date: '01/03/2025',
        time: '11:45:20 AM',
        estimatedCompletion: '01/10/2025'
      },
      {
        orderId: 'ORD-1704851400000',
        items: [servicesList.find(s => s._id === "6") || { ...servicesList[20], _id: "6", hours: 10 }].map(item => ({ ...item, hours: item.hours || 10 })),
        totalAmount: 800,
        totalHours: 10,
        status: 'confirmed',
        date: '01/05/2025',
        time: '3:30:15 PM',
        estimatedCompletion: '01/12/2025'
      },
      {
        orderId: 'ORD-1704937800000',
        items: [
          servicesList.find(s => s._id === "37") || { ...servicesList[25], _id: "37", hours: 2 },
          servicesList.find(s => s._id === "39") || { ...servicesList[27], _id: "39", hours: 3 }
        ].map(item => ({ ...item, hours: item.hours || 3 })),
        totalAmount: 380,
        totalHours: 5,
        status: 'completed',
        date: '12/25/2024',
        time: '9:20:45 AM',
        estimatedCompletion: '01/01/2025'
      },
      {
        orderId: 'ORD-1705024200000',
        items: [servicesList.find(s => s._id === "29") || { ...servicesList[30], _id: "29", hours: 5 }].map(item => ({ ...item, hours: item.hours || 5 })),
        totalAmount: 250,
        totalHours: 5,
        status: 'in-progress',
        date: '01/04/2025',
        time: '4:00:00 PM',
        estimatedCompletion: '01/11/2025'
      }
    ];
  };

  const loadDemoOrders = () => {
    const demoOrders = createDemoOrders(services);
    setDisplayOrders(demoOrders);
    localStorage.setItem('orders', JSON.stringify(demoOrders));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="inline mr-2" />;
      case 'in-progress':
        return <FiClock className="inline mr-2" />;
      case 'confirmed':
        return <FiPackage className="inline mr-2" />;
      case 'cancelled':
        return <FiAlertCircle className="inline mr-2" />;
      default:
        return <FiPackage className="inline mr-2" />;
    }
  };

  if (!displayOrders || displayOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </button>

          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders. Start exploring our services!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/services')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
              >
                Browse Services
              </button>
              <button
                onClick={loadDemoOrders}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
              >
                <FiRefreshCw /> Load Demo Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <FiArrowLeft className="mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div key={order.orderId} className="border rounded-lg overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.orderId ? null : order.orderId
                    )
                  }
                  className="w-full p-4 hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <div className="flex-grow text-left">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-bold text-lg">{order.orderId}</h3>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Order Date:</strong> {order.date} at {order.time}
                      </p>
                      <p>
                        <strong>Items:</strong> {order.items.length} service{order.items.length !== 1 ? 's' : ''} • <strong>Total Hours:</strong> {order.totalHours}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">
                      ${(order.totalAmount * 1.1).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600">
                      Estimated: {order.estimatedCompletion}
                    </p>
                  </div>
                </button>

                {/* Order Details (Expandable) */}
                {expandedOrder === order.orderId && (
                  <div className="bg-gray-50 border-t p-4">
                    <h4 className="font-bold text-lg mb-4">Services in Order:</h4>
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-semibold">{item.name}</h5>
                              <p className="text-sm text-gray-600">
                                Provider: <strong>{item.provider}</strong>
                              </p>
                              <p className="text-sm text-gray-600">
                                Category: <strong>{item.category}</strong>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${item.price}/{item.priceType}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.hours} {item.priceType}(s)
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 border-t pt-2">
                            {item.description}
                          </p>
                          <div className="text-right mt-2 font-bold text-indigo-600">
                            Subtotal: ${(item.price * item.hours).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white p-4 rounded-lg border-t">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (10%):</span>
                          <span>${(order.totalAmount * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total:</span>
                          <span className="text-indigo-600">
                            ${(order.totalAmount * 1.1).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded text-sm text-gray-700 mb-4">
                        <p className="mb-2">
                          <strong>Estimated Completion Date:</strong> {order.estimatedCompletion}
                        </p>
                        <p>
                          Our service providers will contact you to confirm the appointment time.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
                          Contact Provider
                        </button>
                        <button className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 rounded-lg transition">
                          Track Order
                        </button>
                        {order.status === 'confirmed' && (
                          <button className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded-lg transition">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/services')}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
