import { useState } from 'react';
import { CreditCard, ShoppingBag, Wallet } from 'lucide-react';
import { PaymentMethod } from '../types/checkout';

interface PaymentFormProps {
  onSubmit: (method: PaymentMethod, useSameForBilling: boolean) => void;
  onBack: () => void;
  totalAmount: number;
}

export function PaymentForm({ onSubmit, onBack, totalAmount }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [useSameForBilling, setUseSameForBilling] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedMethod, useSameForBilling);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Payment Method</h3>
        <button
          type="button"
          onClick={onBack}
          className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition"
        >
          Back to Delivery
        </button>
      </div>

      <div className="space-y-4">
        <label className={`block border rounded-lg p-4 cursor-pointer transition ${selectedMethod === 'credit_card' ? 'bg-slate-700 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}>
          <div className="flex items-center space-x-3 mb-2">
            <input
              type="radio"
              name="payment_method"
              value="credit_card"
              checked={selectedMethod === 'credit_card'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-400"
            />
            <CreditCard className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-white">Credit Card</span>
          </div>
          <p className="text-sm text-gray-400 ml-7">You will be redirected to our secure Shopify store to complete your credit card payment.</p>
        </label>

        <label className={`block border rounded-lg p-4 cursor-pointer transition ${selectedMethod === 'shop_pay' ? 'bg-slate-700 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment_method"
              value="shop_pay"
              checked={selectedMethod === 'shop_pay'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-400"
            />
            <ShoppingBag className="w-5 h-5 text-[#5A31F4]" />
            <span className="font-semibold text-white">Shop Pay</span>
          </div>
        </label>

        <label className={`block border rounded-lg p-4 cursor-pointer transition ${selectedMethod === 'paypal' ? 'bg-slate-700 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment_method"
              value="paypal"
              checked={selectedMethod === 'paypal'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-400"
            />
            <span className="font-semibold text-[#003087]">PayPal</span>
          </div>
        </label>

        <label className={`block border rounded-lg p-4 cursor-pointer transition ${selectedMethod === 'google_pay' ? 'bg-slate-700 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment_method"
              value="google_pay"
              checked={selectedMethod === 'google_pay'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-400"
            />
            <span className="font-semibold text-white">Google Pay</span>
          </div>
        </label>

        <label className={`block border rounded-lg p-4 cursor-pointer transition ${selectedMethod === 'venmo' ? 'bg-slate-700 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment_method"
              value="venmo"
              checked={selectedMethod === 'venmo'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-400"
            />
            <Wallet className="w-5 h-5 text-[#008CFF]" />
            <span className="font-semibold text-white">Venmo</span>
          </div>
        </label>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition flex items-center justify-center gap-2"
        >
          Pay now - ${(totalAmount / 100).toFixed(2)}
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
        <CreditCard size={12} /> All transactions are secure and encrypted.
      </p>
    </form>
  );
}

// import { useState } from 'react';
// import { ChevronLeft, CreditCard, Lock } from 'lucide-react';
// import { PaymentMethod } from '../types/checkout';

// interface PaymentFormProps {
//   onSubmit: (paymentMethod: PaymentMethod, useSameForBilling: boolean) => void;
//   onBack: () => void;
//   totalAmount: number;
// }

// export function PaymentForm({ onSubmit, onBack, totalAmount }: PaymentFormProps) {
//   const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
//   const [useSameForBilling, setUseSameForBilling] = useState(true);
//   const [saveInfo, setSaveInfo] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(selectedMethod, useSameForBilling);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6" aria-label="Payment form">
//       <div>
//         <button
//           type="button"
//           onClick={onBack}
//           className="flex items-center text-amber-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1 font-semibold mb-4 transition"
//           aria-label="Go back to delivery information"
//         >
//           <ChevronLeft size={20} />
//           Back to delivery
//         </button>
//         <h3 className="text-xl font-bold text-white">Payment</h3>
//         <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">
//           <Lock size={16} aria-hidden="true" />
//           All transactions are secure and encrypted
//         </p>
//       </div>

//       <fieldset>
//         <legend className="sr-only">Select payment method</legend>
//         <div className="space-y-3">
//           <label
//             className={`flex items-center justify-between p-4 border-2 rounded-t-lg cursor-pointer transition ${
//               selectedMethod === 'credit_card'
//                 ? 'border-amber-500 bg-amber-500/20'
//                 : 'border-slate-600 hover:border-amber-400 bg-slate-700/30'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="credit_card"
//                 checked={selectedMethod === 'credit_card'}
//                 onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
//                 className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//               />
//               <span className="font-semibold text-white">Credit Card</span>
//             </div>
//             <div className="flex gap-2" aria-hidden="true">
//               <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="" className="h-6" />
//               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="" className="h-6" />
//               <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="" className="h-6" />
//             </div>
//           </label>

//         {selectedMethod === 'credit_card' && (
//           <div className="p-4 border-2 border-t-0 border-amber-500 rounded-b-lg bg-slate-700/50 space-y-4">
//             <div>
//               <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-200 mb-2">
//                 Card number
//               </label>
//               <div className="relative">
//                 <input
//                   id="cardNumber"
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 />
//                 <CreditCard className="absolute right-3 top-3 text-gray-400" size={20} aria-hidden="true" />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="expirationDate" className="block text-sm font-semibold text-gray-200 mb-2">
//                   Expiration date (MM/YY)
//                 </label>
//                 <input
//                   id="expirationDate"
//                   type="text"
//                   placeholder="MM / YY"
//                   className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="securityCode" className="block text-sm font-semibold text-gray-200 mb-2">
//                   Security code
//                 </label>
//                 <input
//                   id="securityCode"
//                   type="text"
//                   placeholder="CVV"
//                   className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="nameOnCard" className="block text-sm font-semibold text-gray-200 mb-2">
//                 Name on card
//               </label>
//               <input
//                 id="nameOnCard"
//                 type="text"
//                 placeholder="Full name"
//                 className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>
//           </div>
//         )}

//         <label
//           className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
//             selectedMethod === 'shop_pay'
//               ? 'border-amber-500 bg-amber-500/20'
//               : 'border-slate-600 hover:border-amber-400 bg-slate-700/30'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="payment"
//               value="shop_pay"
//               checked={selectedMethod === 'shop_pay'}
//               onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
//               className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//             />
//             <div>
//               <div className="font-semibold text-white">Shop Pay</div>
//               <div className="text-xs text-gray-300">Pay in full or in installments</div>
//             </div>
//           </div>
//           <div className="bg-amber-600 text-white px-3 py-1 rounded font-bold text-sm" aria-hidden="true">
//             Shop Pay
//           </div>
//         </label>

//         <label
//           className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
//             selectedMethod === 'paypal'
//               ? 'border-amber-500 bg-amber-500/20'
//               : 'border-slate-600 hover:border-amber-400 bg-slate-700/30'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="payment"
//               value="paypal"
//               checked={selectedMethod === 'paypal'}
//               onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
//               className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//             />
//             <span className="font-semibold text-white">PayPal</span>
//           </div>
//           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="" className="h-6" aria-hidden="true" />
//         </label>

//         <label
//           className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
//             selectedMethod === 'google_pay'
//               ? 'border-amber-500 bg-amber-500/20'
//               : 'border-slate-600 hover:border-amber-400 bg-slate-700/30'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="payment"
//               value="google_pay"
//               checked={selectedMethod === 'google_pay'}
//               onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
//               className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//             />
//             <span className="font-semibold text-white">Google Pay</span>
//           </div>
//           <div className="flex items-center gap-1" aria-hidden="true">
//             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
//             <span className="font-semibold text-white">Pay</span>
//           </div>
//         </label>

//         <label
//           className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
//             selectedMethod === 'venmo'
//               ? 'border-amber-500 bg-amber-500/20'
//               : 'border-slate-600 hover:border-amber-400 bg-slate-700/30'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="payment"
//               value="venmo"
//               checked={selectedMethod === 'venmo'}
//               onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
//               className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//             />
//             <span className="font-semibold text-white">Venmo</span>
//           </div>
//           <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold" aria-hidden="true">
//             venmo
//           </div>
//         </label>
//       </div>
//     </fieldset>

//       <div className="space-y-3">
//         <h4 className="text-white font-bold text-lg mb-2 pt-4">Billing address</h4>
//         <label className="flex items-start gap-3 cursor-pointer">
//           <input
//             type="radio"
//             name="billingType"
//             id="sameBillingAddress"
//             checked={useSameForBilling}
//             onChange={() => setUseSameForBilling(true)}
//             className="mt-1 w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//           />
//           <span className="text-sm font-semibold text-gray-200">
//             Same as shipping address
//           </span>
//         </label>

//         <label className="flex items-start gap-3 cursor-pointer">
//           <input
//             type="radio"
//             name="billingType"
//             id="diffBillingAddress"
//             checked={!useSameForBilling}
//             onChange={() => setUseSameForBilling(false)}
//             className="mt-1 w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//           />
//           <span className="text-sm font-semibold text-gray-200">
//             Use a different billing address
//           </span>
//         </label>

//         {!useSameForBilling && (
//           <div className="p-4 border border-slate-500 rounded-lg bg-slate-700/30 mt-4 mb-4 space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-200 mb-2">Address</label>
//               <input type="text" placeholder="Billing address" className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">City</label>
//                 <input type="text" placeholder="City" className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">ZIP Code</label>
//                 <input type="text" placeholder="ZIP code" className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
//               </div>
//             </div>
//           </div>
//         )}

//         <label className="flex items-start gap-3 cursor-pointer">
//           <input
//             type="checkbox"
//             id="saveInfo"
//             checked={saveInfo}
//             onChange={(e) => setSaveInfo(e.target.checked)}
//             className="mt-1 w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
//           />
//           <span className="text-sm text-gray-200">
//             Save my information for a faster checkout
//           </span>
//         </label>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
//       >
//         Pay Now - ${(totalAmount / 100).toFixed(2)}
//       </button>
//     </form>
//   );
// }
