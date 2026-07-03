const fs = require('fs');

const path = 'src/components/Checkout.tsx';
let data = fs.readFileSync(path, 'utf8');

data = data.replace(/else if \(paymentMethod === 'paypal'\) \{[\s\S]*?return;\n      \} else if \(paymentMethod === 'venmo'\) \{[\s\S]*?\} else if \(paymentMethod === 'google_pay'\) \{[\s\S]*?return;\n      \}/, `else if (paymentMethod === 'paypal' || paymentMethod === 'venmo' || paymentMethod === 'google_pay') {
        const shopifyUrl = \`https://ffrg7x-m3.myshopify.com/\`;
        window.open(shopifyUrl, '_blank', 'noopener,noreferrer');
        cartStore.clearCart();
        setCart(cartStore.getCart());
        onClose();
        setCheckoutStep('cart');
        return;
      }`);

fs.writeFileSync(path, data);
