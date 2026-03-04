import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/format';
import UploadImages from './UploadImages';

export default function CartCard({ item }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
      <div className="w-32 h-32 flex-shrink-0 bg-purple-50 rounded-2xl overflow-hidden">
        <UploadImages
          publicId={item.publicId}
          width={200}
          height={200}
          className="w-full h-full object-cover"
          alt={item.title}
        />
      </div>

      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-xl font-serif text-stone-900 mb-1">{item.title}</h3>
        <p className="text-stone-500 font-medium italic">{formatCurrency(item.price)} / unità</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-stone-50 rounded-full px-4 py-2 border border-stone-200">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 text-stone-600 hover:text-purple-600 transition-colors hover:bg-purple-200 rounded-full"
            aria-label="Diminuisci quantità"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-8 text-center font-bold text-stone-900 border-x border-stone-200 mx-2">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 text-stone-600 hover:text-purple-600 transition-colors hover:bg-purple-200 rounded-full"
            aria-label="Aumenta quantità"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="text-right min-w-[100px]">
          <p className="text-lg font-bold text-purple-600">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          aria-label="Rimuovi prodotto"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
