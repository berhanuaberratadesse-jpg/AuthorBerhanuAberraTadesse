import { useState, useEffect } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { cartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';
import { DeliveryForm } from './DeliveryForm';
import { PaymentForm } from './PaymentForm';
import { DeliveryAddress, ShippingMethod, PaymentMethod } from '../types/checkout';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Checkout({ isOpen, onClose }: CheckoutProps) {
  const [cart, setCart] = useState(cartStore.getCart());
  const [_processing, setProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'delivery' | 'payment'>('cart');
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | undefined>();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | undefined>();

  useEffect(() => {
    if (isOpen) {
      setCart(cartStore.getCart());
    }
  }, [isOpen]);

  const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod?.price || 0;
  const totalPrice = subtotal + shippingCost;
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      cartStore.updateQuantity(productId, newQuantity);
      setCart(cartStore.getCart());
    }
  };

  const handleRemoveItem = (productId: string) => {
    cartStore.removeItem(productId);
    setCart(cartStore.getCart());
  };

  const handleDeliverySubmit = (address: DeliveryAddress, shipping: ShippingMethod) => {
    setDeliveryAddress(address);
    setShippingMethod(shipping);
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = async (paymentMethod: PaymentMethod, _useSameForBilling: boolean) => {
    if (!deliveryAddress || !shippingMethod) {
      alert('Please complete delivery information');
      return;
    }

    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setProcessing(true);

    try {
      const orderId = Math.random().toString(36).substring(2, 10);
      
      if (paymentMethod === 'shop_pay') {
        const shopifyUrl = `https://ffrg7x-m3.myshopify.com/`;
        window.open(shopifyUrl, '_blank', 'noopener,noreferrer');
        cartStore.clearCart();
        setCart(cartStore.getCart());
        onClose();
        setCheckoutStep('cart');
        return;
      }else if (paymentMethod === 'paypal' || paymentMethod === 'venmo' || paymentMethod === 'google_pay') {
        const shopifyUrl = `https://ffrg7x-m3.myshopify.com/`;
        window.open(shopifyUrl, '_blank', 'noopener,noreferrer');
        cartStore.clearCart();
        setCart(cartStore.getCart());
        onClose();
        setCheckoutStep('cart');
        return;
      } else {
                // Redirect Credit Card to Shopify exactly like Shop Pay
        const shopifyUrl = `https://ffrg7x-m3.myshopify.com/`;
        window.open(shopifyUrl, '_blank', 'noopener,noreferrer');
        
        cartStore.clearCart();
        setCart(cartStore.getCart());
        onClose();
        setCheckoutStep('cart');
        return;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex justify-between items-center rounded-t-2xl z-[70] shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart size={28} aria-hidden="true" />
            <h2 id="checkout-title" className="text-2xl font-bold">
              {checkoutStep === 'cart' && 'Your Cart'}
              {checkoutStep === 'delivery' && 'Delivery Information'}
              {checkoutStep === 'payment' && 'Payment'}
            </h2>
          </div>
          <button
            onClick={() => {
              onClose();
              setCheckoutStep('cart');
            }}
            className="p-2 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg transition"
            aria-label="Close checkout"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-6 overflow-y-auto">
          <div className="md:col-span-2">
            {checkoutStep === 'cart' && (
              <>
                {cart.items.length === 0 ? (
                  <p className="text-center text-gray-300 py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.items.map(item => (
                        <div key={item.productId} className="flex gap-4 pb-4 border-b border-slate-600">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-28 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <p className="text-amber-400 font-bold mt-2">${(item.price / 100).toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="p-1 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded transition text-white"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-6 text-center font-semibold text-white flex justify-center" aria-live="polite">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="p-1 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded transition text-white"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus size={16} />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.productId)}
                                className="ml-auto p-1 hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-400 text-red-400 rounded transition"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setCheckoutStep('delivery')}
                      className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition"
                    >
                      Proceed to Checkout
                    </button>
                  </>
                )}
              </>
            )}

            {checkoutStep === 'delivery' && (
              <DeliveryForm
                onContinue={handleDeliverySubmit}
                onBack={() => setCheckoutStep('cart')}
                initialAddress={deliveryAddress}
              />
            )}

            {checkoutStep === 'payment' && (
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                onBack={() => setCheckoutStep('delivery')}
                totalAmount={totalPrice}
              />
            )}
          </div>

          <div className="md:col-span-1">
            <div className="bg-slate-700/50 p-6 rounded-lg sticky top-0 border border-slate-600">
              <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Items ({totalItems}):</span>
                  <span className="font-semibold text-white">${(subtotal / 100).toFixed(2)}</span>
                </div>
                {shippingMethod && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Shipping ({shippingMethod.name}):</span>
                    <span className="font-semibold text-white">
                      {shippingMethod.price === 0 ? 'Free' : `$${(shippingMethod.price / 100).toFixed(2)}`}
                    </span>
                  </div>
                )}
                <div className="border-t border-slate-500 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-amber-400">${(totalPrice / 100).toFixed(2)}</span>
                </div>
              </div>

              {cart.items.length > 0 && (
                <div className="border-t border-slate-500 pt-4 mt-4">
                  <h4 className="font-semibold text-white mb-3 text-sm">Items in cart:</h4>
                  <div className="space-y-2">
                    {cart.items.map(item => (
                      <div key={item.productId} className="flex justify-between text-xs">
                        <span className="text-gray-300">{item.name} x {item.quantity}</span>
                        <span className="font-semibold text-white">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
