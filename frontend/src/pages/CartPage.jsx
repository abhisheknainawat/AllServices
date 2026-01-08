import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, checkout, cartTotal } = useCart();

  const handleCheckout = () => {
    const order = checkout();
    if (order) {
      alert(`Order placed successfully! Order ID: ${order.orderId}`);
      navigate('/orders');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
          >
            <FiArrowLeft className="mr-2" /> Back to Services
          </button>

          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiCheckCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Add some services to get started!
            </p>
            <button
              onClick={() => navigate('/services')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
            >
              Browse Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/services')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <FiArrowLeft className="mr-2" /> Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        By: {item.provider} • Category: {item.category}
                      </p>
                      <p className="text-indigo-600 font-semibold">
                        ${item.price}/{item.priceType}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                      {/* Quantity */}
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.hours - 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 border-l border-r">{item.hours}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.hours + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-max">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="font-bold text-lg">
                          ${(item.price * item.hours).toFixed(2)}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Remove from cart"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-6 text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Hours:</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.hours, 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-indigo-600">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-indigo-600">
                    ${(cartTotal * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/services')}
                className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 rounded-lg transition"
              >
                Continue Shopping
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  ✓ Free delivery within city limits<br/>
                  ✓ 24-hour cancellation policy<br/>
                  ✓ Secure payment processing<br/>
                  ✓ Satisfaction guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
