import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { cartStore } from '../store/cartStore';

interface ProductSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const editions = [
  { id: 'hardcover', name: 'Hard Cover', price: 2499, image: '/Book-Mock-Up-01-1.png' },
  { id: 'paperback', name: 'Paperback', price: 1999, image: '/Book-Mock-Up-01-2-1.png' },
  { id: 'ebook', name: 'E Book', price: 799, image: '/image.png' }
];

export function ProductSelector({ isOpen, onClose, onAddToCart }: ProductSelectorProps) {
  const [selectedEdition, setSelectedEdition] = useState(editions[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    cartStore.addItem({
      productId: selectedEdition.id,
      name: `True Light - ${selectedEdition.name}`,
      price: selectedEdition.price,
      quantity: quantity,
      image: selectedEdition.image
    });
    setQuantity(1);
    setSelectedEdition(editions[0]);
    onClose();
    onAddToCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="product-selector-title">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex justify-between items-center relative z-[70]">
          <h2 id="product-selector-title" className="text-2xl font-bold">Select Your Edition</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg transition"
            aria-label="Close product selector"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 id="edition-label" className="text-lg font-semibold text-white mb-4">Choose Edition:</h3>
            <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-labelledby="edition-label">
              {editions.map((edition) => (
                <button
                  key={edition.id}
                  onClick={() => setSelectedEdition(edition)}
                  className={`p-4 rounded-lg border-2 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    selectedEdition.id === edition.id
                      ? 'border-amber-500 bg-amber-500/20'
                      : 'border-slate-500 hover:border-amber-400 bg-slate-700/50'
                  }`}
                  aria-pressed={selectedEdition.id === edition.id}
                >
                  <div className="text-sm font-semibold text-white mb-2">{edition.name}</div>
                  <div className="text-lg font-bold text-amber-400">${(edition.price / 100).toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 p-6 bg-slate-700/30 rounded-lg flex justify-center border border-slate-600">
            <img
              src={selectedEdition.image}
              alt={`True Light - ${selectedEdition.name} edition`}
              className="h-48 object-cover rounded"
            />
          </div>

          <div className="mb-8">
            <h3 id="quantity-label" className="text-lg font-semibold text-white mb-4">Quantity:</h3>
            <div className="flex items-center gap-4" aria-labelledby="quantity-label">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg transition border border-slate-500 text-white"
                aria-label="Decrease quantity"
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-bold text-white w-12 text-center" aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg transition border border-slate-500 text-white"
                aria-label="Increase quantity"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg mb-8 border border-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-2xl font-bold text-amber-400">
                ${((selectedEdition.price * quantity) / 100).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="w-full bg-slate-600 text-white font-bold py-3 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
