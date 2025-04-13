import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useState, useRef, useEffect, KeyboardEvent, FC } from "react";
import { Product } from "../type";
import { useDispatch } from "react-redux";
import { showProduct } from "../productsSlice/ShowProduct";

interface HeaderBottomProps {
  className?: string;
}

const HeaderBottom: FC<HeaderBottomProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.AllDate);
  const cartCount = useAppSelector((state) => state.CartSlice.length);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLUListElement>(null);

  const filteredItems: Product[] = cartItems.filter((item: Product) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchTerm("");
      searchInputRef.current?.blur();
    } else if (e.key === "ArrowDown" && searchResultsRef.current) {
      e.preventDefault();
      const firstResult = searchResultsRef.current.querySelector("a");
      firstResult?.focus();
    }
  };

  const handleResultKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextResult = searchResultsRef.current?.querySelectorAll("a")[index + 1];
      nextResult?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        searchInputRef.current?.focus();
      } else {
        const prevResult = searchResultsRef.current?.querySelectorAll("a")[index - 1];
        prevResult?.focus();
      }
    } else if (e.key === "Escape") {
      searchInputRef.current?.focus();
    }
  };

  return (
    <nav className={`bg-white py-[6px] shadow-lg ${className}`} role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-between container mx-auto px-4 gap-4 md:gap-8 lg:gap-16 xl:gap-32 relative">
        {/* Logo */}
        <div className="w-[40px] h-[40px]">
          <Link to="/" aria-label="Home">
            <img
              className="size-full"
              src="/image/bD9EZ6eoPgcRV7MGFqpc99FnbYMxFKF63uhWAwA5.jpg"
              alt="Logo"
              width={40}
              height={40}
              loading="lazy"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="relative h-[40px] flex-1">
          <input
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="border w-[calc(100%-40px)] h-full ps-5 pe-2 focus:outline-none rounded-s"
            type="search"
            placeholder="Search for a product..."
            aria-label="Search products"
            aria-controls="search-results"
            aria-expanded={isSearchFocused && searchTerm.length > 0}
            aria-autocomplete="list"
            aria-haspopup="listbox"
          />
          <button
            type="button"
            className="bg-primary absolute -right-[20px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-[40px] flex items-center justify-center text-white text-2xl cursor-pointer"
            aria-label="Search"
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <IoIosSearch />
            )}
          </button>
        </div>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1" aria-label="Compare products">
            <FaArrowsRotate className="text-[20px] text-gray-800" />
            <div className="flex flex-col">
              <span className="bg-primary size-[20px] rounded-full flex items-center justify-center text-white">0</span>
              <span className="text-sm text-gray-800">Compare</span>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-1" aria-label="Watchlist">
            <FaRegHeart className="text-[20px] text-gray-800" />
            <div className="flex flex-col">
              <span className="bg-primary size-[20px] rounded-full flex items-center justify-center text-white">0</span>
              <span className="text-sm text-gray-800">Watchlist</span>
            </div>
          </Link>

          <Link to="/cart" className="flex items-center gap-1" aria-label="Shopping cart">
            <FaShoppingCart className="text-[20px] text-gray-800" />
            <div className="flex flex-col">
              <span className="bg-primary size-[20px] rounded-full flex items-center justify-center text-white">
                {cartCount}
              </span>
              <span className="text-sm text-gray-800">Cart</span>
            </div>
          </Link>
        </div>

        {/* Search Results */}
        {isSearchFocused && searchTerm && (
          <ul
            ref={searchResultsRef}
            id="search-results"
            className={`flex shadow-md flex-col absolute left-1/2 ${
              filteredItems.length > 0 ? "top-[170px]" : "top-[82px]"
            } z-10 transform -translate-y-1/2 -translate-x-1/2 bg-white w-full max-h-[244px] overflow-auto`}
            role="listbox"
            aria-label="Search results"
          >
            {isSearching ? (
              <li className="px-4 py-2 text-center text-gray-600">Searching...</li>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li key={item.id} role="option" aria-selected="false">
                  <Link
                    to={`/show_product/${item.id}`}
                    onKeyDown={(e) => handleResultKeyDown(e, index)}
                    onClick={() => {
                      dispatch(showProduct(item));
                      setSearchTerm("");
                    }}
                    className="border-b px-3 py-2 flex items-center gap-3 hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    tabIndex={0}
                  >
                    <div className="size-10">
                      <img className="size-full object-cover" src={item.img} alt={item.title} width={40} height={40} loading="lazy" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-800 text-sm">{item.title}</h3>
                      <span className="text-primary text-sm font-bold">${item.priceUs}</span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-gray-600 text-sm">
                Sorry, nothing found for "{searchTerm}"
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default HeaderBottom;
