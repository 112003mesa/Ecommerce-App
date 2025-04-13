import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Product } from "../type";
import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, FC, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../productsSlice/CartSlice";
import Quantity from "./Quantity";
import { FaStar } from "react-icons/fa";

interface ShowProductProps {
  className?: string;
}

const ShowProduct: FC<ShowProductProps> = ({ className = "" }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsCart = useAppSelector((state) => state.CartSlice);
  const showProduct = useAppSelector((state) => state.showProduct);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    setIsLoading(false);
  }, [id, navigate]);

  const labels = [
    "Pants",
    "Waist",
    "Hip",
  ];

  const item: Product | undefined = Array.isArray(showProduct)
    ? showProduct.find((product: Product) => String(product.id) === String(id))
    : showProduct;

  const [selectedImg, setSelectedImg] = useState<string>(item?.img || "");
  const [activeSize, setActiveSize] = useState<string>("XS");
  const refImg = useRef<HTMLImageElement>(null);
  const sizeButtonsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (item?.img) setSelectedImg(item.img);
  }, [item]);

  const handleZoom = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (refImg.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      refImg.current.style.transformOrigin = `${x}px ${y}px`;
      refImg.current.style.transform = "scale(2)";
    }
  };

  const resetZoom = () => {
    if (refImg.current) {
      refImg.current.style.transform = "scale(1)";
      refImg.current.style.transformOrigin = "center";
    }
  };

  const handleSizeKeyDown = (e: KeyboardEvent<HTMLSpanElement>, size: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveSize(size);
    }
  };

  const cartItem = item ? itemsCart.find((cartProduct) => cartProduct.id === item.id) : undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-3 text-xl">
        {error}
      </div>
    );
  }

  if (!item) {
    return (
      <p className="text-center text-gray-800 mt-3 text-3xl">
        Product not found
      </p>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  return (
    <main className={`bg-gray-100 min-h-screen pt-[100px] ${className}`}>
      <div className="container mx-auto bg-white p-5 rounded shadow">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Product Images */}
          <section className="flex flex-col md:flex-row gap-3" aria-label="Product images">
            <div className="flex flex-row md:flex-col gap-2 size-16 order-2" role="listbox" aria-label="Product thumbnails">
              {item.imgs?.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => setSelectedImg(img)}
                  className={`cursor-pointer size-full p-[2px] rounded ${
                    selectedImg === img ? "border-teal-700 border-2" : ""
                  }`}
                  alt={`Product thumbnail ${index + 1}`}
                  role="option"
                  aria-selected={selectedImg === img}
                  tabIndex={0}
                />
              ))}
            </div>
            <div
              onMouseMove={handleZoom}
              onMouseLeave={resetZoom}
              className="flex-1 overflow-hidden h-[500px] order-1 md:order-2 rounded"
              role="img"
              aria-label="Product main image"
            >
              <img 
                ref={refImg} 
                src={selectedImg} 
                className="w-full h-full object-cover rounded" 
                alt={item.title}
                loading="lazy"
              />
            </div>
          </section>

          {/* Product Details */}
          <section className="flex-1 space-y-4" aria-label="Product details">
            <h1 className="text-2xl font-semibold">{item.title}</h1>

            <div className="flex items-center gap-1 text-gray-500" role="img" aria-label="Product rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} aria-hidden="true" />
              ))}
              <span className="ml-2 text-gray-500">(0 Reviews)</span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-gray-500">Sold by:</p>
                <p>In-house</p>
              </div>
              <button 
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-700 hover:text-white"
                aria-label="Message seller"
              >
                Message seller
              </button>
            </div>

            <div className="flex items-center gap-5 border-b pb-4">
              <span className="text-gray-500">Price:</span>
              <span className="text-3xl text-teal-700" aria-label={`Price: $${cartItem ? cartItem.priceUs * cartItem.quantity : item.priceUs}`}>
                ${cartItem ? cartItem.priceUs * cartItem.quantity : item.priceUs}
              </span>
            </div>

            <div className="border-b p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="text-gray-500 w-full">Size determination:</div>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                  {labels.map((label, index) => (
                    <div key={index} className="flex flex-col gap-1 w-full">
                      <label className="text-sm text-gray-600" htmlFor={`measurement-${index}`}>
                        {label}:
                      </label>
                      <input
                        id={`measurement-${index}`}
                        type="number"
                        required
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        aria-label={`Enter ${label} measurement`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded mt-4 hover:bg-teal-700 transition"
                aria-label="Determine size"
              >
                Determine size
              </button>
            </div>

            {/* Size Selection */}
            <div className="border-b pb-4">
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
                {sizes.map((size, index) => (
                  <span
                    key={size}
                    ref={(el) => {
                      if (el) sizeButtonsRef.current[index] = el;
                    }}
                    onClick={() => setActiveSize(size)}
                    onKeyDown={(e) => handleSizeKeyDown(e, size)}
                    className={`px-4 py-2 rounded border cursor-pointer ${
                      activeSize === size ? "border-teal-700 bg-teal-50" : "border-gray-300"
                    }`}
                    role="radio"
                    aria-checked={activeSize === size}
                    tabIndex={0}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Component */}
            <Quantity item={item} />

            {/* Add/Remove from Cart Button */}
            {cartItem ? (
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="w-fit px-5 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                aria-label="Remove from cart"
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(item))}
                className="w-fit px-5 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition font-semibold"
                aria-label="Add to cart"
              >
                Add to cart
              </button>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ShowProduct;
