import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function PaymentPage() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientSecret = params.get('clientSecret');
    const orderId = params.get('orderId');

    if (orderId) setOrderId(orderId);

    if (!clientSecret) {
      setStatus('error');
      return;
    }

    setTimeout(() => {
      setStatus('success');
    }, 2000);
  }, []);

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Processing Payment</h1>
          <p className="text-slate-600">Please wait while we process your order...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <AlertCircle size={64} className="mx-auto mb-6 text-red-500" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Error</h1>
          <p className="text-slate-600 mb-6">Something went wrong with your payment. Please try again.</p>
          <a href="/" className="inline-block bg-amber-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-600 transition">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
        <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-slate-600 mb-4">Thank you for your purchase.</p>
        {orderId && (
          <p className="text-sm text-slate-500 mb-6">Order ID: <span className="font-mono">{orderId.substring(0, 8)}</span></p>
        )}
        <p className="text-slate-600 mb-8">A confirmation email will be sent to your inbox shortly.</p>
        <a href="/" className="inline-block bg-amber-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-600 transition">
          Back to Home
        </a>
      </div>
    </div>
  );
}
