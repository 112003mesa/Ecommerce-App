import { FaMinus, FaPlus } from 'react-icons/fa6';
import { addToCart, decreaseQuantity } from "../productsSlice/CartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product } from "../type";
import { RootState } from "../store/store";
import { FC, KeyboardEvent, useState, useRef } from "react";

interface QuantityProps {
  item: Product;
}

const Quantity: FC<QuantityProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<{ increase: boolean; decrease: boolean }>({
    increase: false,
    decrease: false,
  });
  const [error, setError] = useState<string | null>(null);
  const decreaseButtonRef = useRef<HTMLButtonElement>(null);
  const increaseButtonRef = useRef<HTMLButtonElement>(null);

  const cartItem = useAppSelector((state: RootState) =>
    state.CartSlice.find((cartItem) => cartItem.id === item.id)
  );

  const currentQuantity = cartItem?.quantity ?? 0;
  const isMinQuantity = currentQuantity <= 1;
  const isMaxQuantity = currentQuantity >= item.maxQuantity;

  const handleDecrease = () => {
    if (!isMinQuantity && !isLoading.decrease) {
      try {
        setIsLoading((prev) => ({ ...prev, decrease: true }));
        setError(null);
        dispatch(decreaseQuantity(item.id));
      } catch (err) {
        setError("An error occurred while updating the quantity.");
        decreaseButtonRef.current?.focus();
      } finally {
        setIsLoading((prev) => ({ ...prev, decrease: false }));
      }
    }
  };

  const handleIncrease = () => {
    if (!isMaxQuantity && !isLoading.increase) {
      try {
        setIsLoading((prev) => ({ ...prev, increase: true }));
        setError(null);
        dispatch(addToCart(item));
      } catch (err) {
        setError("An error occurred while updating the quantity.");
        increaseButtonRef.current?.focus();
      } finally {
        setIsLoading((prev) => ({ ...prev, increase: false }));
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: 'increase' | 'decrease') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (action === 'increase') {
        handleIncrease();
      } else {
        handleDecrease();
      }
    }
  };

  return (
    <div className="border-b p-4 flex flex-col gap-2">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            ref={decreaseButtonRef}
            onClick={handleDecrease}
            onKeyDown={(e) => handleKeyDown(e, 'decrease')}
            disabled={isMinQuantity || isLoading.decrease}
            aria-label="Decrease quantity"
            aria-disabled={isMinQuantity || isLoading.decrease}
            aria-describedby={`decrease-description-${item.id}`}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isMinQuantity || isLoading.decrease
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-teal-700 hover:bg-teal-800 text-white cursor-pointer"
            }`}
          >
            {isLoading.decrease ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <FaMinus />
            )}
          </button>
          <span className="text-lg min-w-[2rem] text-center" aria-label="Current quantity" aria-live="polite">
            {currentQuantity}
          </span>
          <button
            ref={increaseButtonRef}
            onClick={handleIncrease}
            onKeyDown={(e) => handleKeyDown(e, 'increase')}
            disabled={isMaxQuantity || isLoading.increase}
            aria-label="Increase quantity"
            aria-disabled={isMaxQuantity || isLoading.increase}
            aria-describedby={`increase-description-${item.id}`}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isMaxQuantity || isLoading.increase
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-teal-700 hover:bg-teal-800 text-white cursor-pointer"
            }`}
          >
            {isLoading.increase ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <FaPlus />
            )}
          </button>
        </div>
        <div className="text-gray-500">
          ({item.maxQuantity} products available)
        </div>
      </div>
      <div className="sr-only" id={`decrease-description-${item.id}`}>
        {isMinQuantity ? "Minimum quantity reached" : "Decrease quantity by one"}
      </div>
      <div className="sr-only" id={`increase-description-${item.id}`}>
        {isMaxQuantity ? "Maximum quantity reached" : "Increase quantity by one"}
      </div>
    </div>
  );
};

export default Quantity;
