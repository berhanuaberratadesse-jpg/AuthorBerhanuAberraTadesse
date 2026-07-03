const fs = require('fs');

let checkoutCode = fs.readFileSync('src/components/Checkout.tsx', 'utf8');

// The replacement script accidentally caused unbalanced `{}` braces inside checkout
// Let's replace the whole handlePaymentSubmit block to ensure it's spotless
const block = `const handlePaymentSubmit = async (paymentMethod: PaymentMethod, _useSameForBilling: boolean) => {
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
        cartStore.clearCart();
        window.location.href = 'https://shop.app/';
        return;
      } else if (paymentMethod === 'paypal') {
        cartStore.clearCart();
        window.location.href = 'https://www.paypal.com/';
        return;
      } else if (paymentMethod === 'venmo') {
        cartStore.clearCart();
        alert('Scan to pay with Venmo. Use your phone\\'s camera to open the app and pay.');
        window.location.reload();
        return;
      } else if (paymentMethod === 'google_pay') {
        cartStore.clearCart();
        alert('Prompting Google Pay integration...');
        window.location.reload();
        return;
      } else {
        cartStore.clearCart();
        alert(\`Order placed successfully with Credit Card! Order ID: \${orderId}\`);
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
  };`

checkoutCode = checkoutCode.replace(/const handlePaymentSubmit = async \([\s\S]*?if \(!isOpen\) return null;/m, block + '\n\n  if (!isOpen) return null;');

fs.writeFileSync('src/components/Checkout.tsx', checkoutCode);
