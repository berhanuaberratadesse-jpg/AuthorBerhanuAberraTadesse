export interface DeliveryAddress {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type PaymentMethod = 'credit_card' | 'paypal' | 'google_pay' | 'venmo' | 'shop_pay' | 'stripe';

export interface CheckoutState {
  step: 'cart' | 'delivery' | 'payment';
  deliveryAddress?: DeliveryAddress;
  shippingMethod?: ShippingMethod;
  paymentMethod?: PaymentMethod;
  useSameForBilling: boolean;
}
