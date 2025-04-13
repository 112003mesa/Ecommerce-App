import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';
import { addToCart, decreaseQuantity, removeFromCart } from '../productsSlice/CartSlice';
import { AppDispatch } from '../store/store';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { CartItem } from '../type';

const Cart: React.FC = () => {
  const products = useAppSelector((state) => state.CartSlice);
  const dispatch: AppDispatch = useDispatch();

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.priceUs * item.quantity), 0);
  };

  const handleQuantityChange = (item: CartItem, action: 'increase' | 'decrease') => {
    try {
      if (action === 'increase' && item.quantity < item.maxQuantity) {
        dispatch(addToCart(item));
      } else if (action === 'decrease' && item.quantity > 1) {
        dispatch(decreaseQuantity(item.id));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    try {
      dispatch(removeFromCart(itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-gray-100 pt-[100px] min-h-screen">
        <div className="container mx-auto bg-white rounded shadow p-8">
          <div className="text-center">
            <h2 className="text-4xl font-light text-gray-400 mb-4">Your cart is empty</h2>
            <p className="text-gray-500">Add some products to your cart</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pt-[100px] min-h-screen">
      <div className="container mx-auto bg-white rounded shadow">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Shopping Cart</h1>
        </div>

        {products.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row items-center justify-between border-b p-4 gap-6"
            role="listitem"
          >
            {/* Product Image and Title */}
            <div className="flex items-center gap-4 w-full lg:w-5/12 pb-4 lg:pb-0">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-16 h-16 object-cover rounded"
                loading="lazy"
              />
              <p className="text-gray-800 font-medium">{item.title}</p>
            </div>

            {/* Details and Actions */}
            <div className="flex flex-row items-center justify-between gap-6 w-full lg:w-7/12">
              <div className="flex flex-col text-gray-500">
                <span>Price</span>
                <span className="font-semibold">${item.priceUs.toFixed(2)}</span>
              </div>

              <div className="flex flex-col text-teal-600 font-semibold">
                <span>Total</span>
                <span>${(item.priceUs * item.quantity).toFixed(2)}</span>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(item, 'decrease')}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    item.quantity <= 1
                      ? 'bg-teal-600 opacity-50 cursor-not-allowed'
                      : 'bg-teal-100 hover:bg-teal-600 hover:text-white text-teal-600'
                  }`}
                >
                  <FaMinus />
                </button>
                <span className="text-2xl text-teal-700 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item, 'increase')}
                  disabled={item.quantity >= item.maxQuantity}
                  aria-label="Increase quantity"
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    item.quantity >= item.maxQuantity
                      ? 'bg-teal-600 opacity-50 cursor-not-allowed'
                      : 'bg-teal-100 hover:bg-teal-600 hover:text-white text-teal-600'
                  }`}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Remove Item */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                aria-label="Remove item"
                className="w-10 h-10 flex items-center justify-center bg-teal-100 hover:bg-teal-600 hover:text-white text-teal-600 rounded-full transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {/* Cart Total */}
        <div className="p-4 border-t">
          <div className="flex justify-end items-center gap-4">
            <span className="text-xl font-semibold text-gray-800">Cart Total:</span>
            <span className="text-2xl font-bold text-teal-600">
              ${calculateTotal(products).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
