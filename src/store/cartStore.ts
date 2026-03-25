export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'book_cart';

export const cartStore = {
  getCart(): Cart {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  },

  addItem(item: CartItem): void {
    const cart = this.getCart();
    const existingItem = cart.items.find(i => i.productId === item.productId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  },

  removeItem(productId: string): void {
    const cart = this.getCart();
    cart.items = cart.items.filter(i => i.productId !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  },

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  },

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  getTotalPrice(): number {
    const cart = this.getCart();
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotalItems(): number {
    const cart = this.getCart();
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }
};
