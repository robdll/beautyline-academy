import { useState } from "react";
import UploadImages from "./UploadImages";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/format";

const ProductCard = ({ id, title, description, price, publicId }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id, title, price, publicId });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-b-4 border-purple-600 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="mb-6 relative overflow-hidden rounded-xl bg-purple-50 group">
        <UploadImages
          publicId={publicId}
          width={500}
          height={500}
          className="mx-auto transform transition-transform duration-500 group-hover:scale-110"
          alt={`Immagine di ${title}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-purple-900 mb-2 font-display">
          {title}
        </h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t-2 border-purple-500 flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-purple-600">
            {formatCurrency(price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md flex items-center gap-2
              ${isAdded
                ? 'bg-purple-500 text-white cursor-progress'
                : 'bg-purple-600 hover:bg-purple-700 hover:scale-105 text-white hover:shadow-lg active:scale-95'
              }`}
          >
            {isAdded ? "Aggiunto!" : "Aggiungi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

