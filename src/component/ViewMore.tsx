import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Product } from "../type";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../productsSlice/CartSlice";
import { showProduct } from "../productsSlice/ShowProduct";

const ViewMore: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get("section");

  const validSections = [
    "all_product",
    "new_product",
    "best_selling",
    "daily_usage",
    "surgical_braces",
    "sports_braces",
    "mens_braces",
  ] as const;

  const AllProduct = useAppSelector((state) => state.AllDate) as Product[];
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<Record<string, boolean>>({});

  let products: Product[] = [];

  if (section && validSections.includes(section as typeof validSections[number])) {
    products = AllProduct;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async (item: Product) => {
    try {
      setIsAddingToCart(prev => ({ ...prev, [item.id]: true }));
      setError(null);
      await dispatch(addToCart(item));
    } catch (err) {
      setError("Error adding item to cart");
    } finally {
      setIsAddingToCart(prev => ({ ...prev, [item.id]: false }));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>, item: Product) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dispatch(showProduct(item));
    }
  };

  return (
    <main className="container mx-auto px-4">
      <h1 className="mt-[100px] text-center text-4xl font-semibold text-primary capitalize">
        {section ? section : "Products"}
      </h1>

      {error && (
        <div 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" 
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div 
          className="text-center py-10 text-lg font-semibold text-gray-500"
          role="status"
          aria-label="Loading..."
        >
          Loading...
        </div>
      ) : products.length === 0 ? (
        <div 
          className="text-center py-10 text-lg font-semibold text-gray-500"
          role="status"
          aria-label="No products available."
        >
          No products available.
        </div>
      ) : (
        <section 
          className="mt-3 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          {products.map((item) => (
            <article
              key={item.id}
              className="relative overflow-hidden bg-white shadow rounded p-4 hover:shadow-[0px_3px_8px_rgba(0,0,0,0.24)] group"
              role="article"
              tabIndex={0}
              onClick={() => dispatch(showProduct(item))}
              onKeyDown={(e) => handleKeyDown(e, item)}
            >
              <Link 
                to={`/show_product/${item.id}`} 
                className="block"
                aria-label={`View details for ${item.title}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded"
                  loading="lazy"
                  width={300}
                  height={192}
                />
                <h2 className="mt-2 font-semibold">{item.title}</h2>
                <p className="text-green-600 mt-1">${item.priceUs}</p>
              </Link>

              <nav 
                className="absolute top-6 -right-[25px] flex flex-col gap-[5px] transition-all duration-300 group-hover:right-5"
                aria-label="Product actions"
              >
                <button
                  className="bg-white transition duration-300 hover:bg-primary hover:text-white cursor-pointer text-sm text-gray-700 shadow-md size-[25px] flex items-center justify-center rounded-full"
                  aria-label="Add to wishlist"
                >
                  <FaRegHeart />
                </button>
                <button
                  className="bg-white transition duration-300 hover:bg-primary hover:text-white cursor-pointer text-sm text-gray-700 shadow-md size-[25px] flex items-center justify-center rounded-full"
                  aria-label="Compare product"
                >
                  <FaArrowsRotate />
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAddingToCart[item.id]}
                  className="bg-white transition duration-300 hover:bg-primary hover:text-white cursor-pointer text-sm text-gray-700 shadow-md size-[25px] flex items-center justify-center rounded-full"
                  aria-label="Add to cart"
                >
                  {isAddingToCart[item.id] ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700" />
                  ) : (
                    <FaShoppingCart />
                  )}
                </button>
              </nav>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default ViewMore;
