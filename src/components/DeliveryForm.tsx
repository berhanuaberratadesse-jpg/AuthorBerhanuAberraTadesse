import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { DeliveryAddress, ShippingMethod } from '../types/checkout';

interface DeliveryFormProps {
  onContinue: (address: DeliveryAddress, shipping: ShippingMethod) => void;
  onBack: () => void;
  initialAddress?: DeliveryAddress;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: '5 to 7 business days',
    price: 0
  },
  {
    id: 'express',
    name: 'Express',
    description: '1 to 2 business days',
    price: 500
  },
  {
    id: 'overnight',
    name: 'Overnight',
    description: 'Next business day',
    price: 1500
  }
];

export function DeliveryForm({ onContinue, onBack, initialAddress }: DeliveryFormProps) {
  const [email, setEmail] = useState(initialAddress?.email || '');
  const [firstName, setFirstName] = useState(initialAddress?.firstName || '');
  const [lastName, setLastName] = useState(initialAddress?.lastName || '');
  const [address, setAddress] = useState(initialAddress?.address || '');
  const [apartment, setApartment] = useState(initialAddress?.apartment || '');
  const [city, setCity] = useState(initialAddress?.city || 'Mountlake Terrace');
  const [state, setState] = useState(initialAddress?.state || 'WA');
  const [zipCode, setZipCode] = useState(initialAddress?.zipCode || '98043');
  const [country, setCountry] = useState(initialAddress?.country || 'US');
  const [phone, setPhone] = useState(initialAddress?.phone || '');
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(shippingMethods[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email || !email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const deliveryAddress: DeliveryAddress = {
      email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      apartment: apartment.trim(),
      city: city.trim(),
      state,
      zipCode: zipCode.trim(),
      country,
      phone: phone.trim()
    };

    onContinue(deliveryAddress, selectedShipping);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Delivery information form">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-amber-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1 font-semibold mb-4 transition"
        aria-label="Go back to shopping cart"
      >
        <ChevronLeft size={20} />
        Back to cart
      </button>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
          Email <span className="text-red-400" aria-label="required">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an email"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-slate-500'} bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
        />
        {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Delivery</h3>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-semibold text-gray-200 mb-2">
            Country/Region
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="US">United States</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-200 mb-2">
              First name (optional)
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-200 mb-2">
              Last name <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter a last name"
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              aria-invalid={!!errors.lastName}
              className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-slate-500'} bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
            />
            {errors.lastName && <p id="lastName-error" className="text-red-400 text-xs mt-1" role="alert">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-200 mb-2">
            Address <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address"
            aria-describedby={errors.address ? "address-error" : undefined}
            aria-invalid={!!errors.address}
            className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-slate-500'} bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
          />
          {errors.address && <p id="address-error" className="text-red-400 text-xs mt-1" role="alert">{errors.address}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="apartment" className="block text-sm font-semibold text-gray-200 mb-2">
            Apartment, suite, etc. (optional)
          </label>
          <input
            id="apartment"
            type="text"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-200 mb-2">
              City <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-describedby={errors.city ? "city-error" : undefined}
              aria-invalid={!!errors.city}
              className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-slate-500'} bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
            />
            {errors.city && <p id="city-error" className="text-red-400 text-xs mt-1" role="alert">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-gray-200 mb-2">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {usStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-200 mb-2">
              ZIP code <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
              aria-invalid={!!errors.zipCode}
              className={`w-full px-4 py-3 border ${errors.zipCode ? 'border-red-500' : 'border-slate-500'} bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
            />
            {errors.zipCode && <p id="zipCode-error" className="text-red-400 text-xs mt-1" role="alert">{errors.zipCode}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-2">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1"
            className="w-full px-4 py-3 border border-slate-500 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-xl font-bold text-white mb-4">Shipping method</legend>
        <div className="space-y-3">
          {shippingMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedShipping.id === method.id
                  ? 'border-amber-500 bg-amber-500/20'
                  : 'border-slate-600 hover:border-amber-400 bg-slate-700/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  value={method.id}
                  checked={selectedShipping.id === method.id}
                  onChange={() => setSelectedShipping(method)}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                />
                <div>
                  <div className="font-semibold text-white">{method.name}</div>
                  <div className="text-sm text-gray-300">{method.description}</div>
                </div>
              </div>
              <div className="font-bold text-white">
                {method.price === 0 ? 'Free' : `$${(method.price / 100).toFixed(2)}`}
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
      >
        Continue to Payment
      </button>
    </form>
  );
}
