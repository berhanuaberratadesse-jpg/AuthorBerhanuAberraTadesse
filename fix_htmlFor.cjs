const fs = require('fs');

let paymentFormCode = fs.readFileSync('src/components/PaymentForm.tsx', 'utf8');

paymentFormCode = paymentFormCode.replace(
  /<span htmlFor="saveInfo"/g,
  '<span'
);

fs.writeFileSync('src/components/PaymentForm.tsx', paymentFormCode);
