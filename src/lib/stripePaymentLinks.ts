export interface StripePaymentLink {
  id: string;
  name: string;
  url: string;
  productName: string;
}

export const stripePaymentLinks: StripePaymentLink[] = [
  {
    id: 'ebook',
    name: 'E-Book',
    url: 'https://buy.stripe.com/test_fZu7sMeW04kpfSr1kt5ZC00',
    productName: 'True Light EBook'
  },
  {
    id: 'paperback',
    name: 'Paperback',
    url: 'https://buy.stripe.com/test_6oU14o4hm6sx9u3bZ75ZC01',
    productName: 'True Light Paperback'
  },
  {
    id: 'hardcover',
    name: 'Hard Cover',
    url: 'https://buy.stripe.com/test_aFa14oeW018d0Xx2ox5ZC02',
    productName: 'True Light Hard Cover'
  }
];

export function getStripePaymentLink(productId: string): StripePaymentLink | undefined {
  return stripePaymentLinks.find(link => link.id === productId);
}

export function openStripePaymentLink(productId: string): void {
  const link = getStripePaymentLink(productId);
  if (link) {
    window.open(link.url, '_blank');
  }
}
