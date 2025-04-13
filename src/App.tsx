import { Link, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./component/Home";
import Cart from "./component/Cart";
import { FaHome, FaRegHeart, FaShopify, FaWhatsapp } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import ViewMore from "./component/ViewMore";
import ShowProduct from "./component/ShowProduct";
import { useAppSelector } from "./store/hooks";

function App() {
    const products = useAppSelector((state) => state.CartSlice);
  const location = useLocation();

  return (
    <div className="relative bg-[#f2f3f8] min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view_more" element={<ViewMore />} />
        <Route path="/show_product/:id" element={<ShowProduct />} />
      </Routes>
      <Footer />

      {/* WhatsApp */}
      <Link to="https://wa.me/201102893016" target="_blank" className="fixed right-6 z-30 bottom-16 bg-[#0d8c0d] size-[50px] rounded-full flex items-center justify-center transition hover:bg-[#04af04] cursor-pointer text-3xl text-white">
        <FaWhatsapp />
      </Link>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 bg-white z-20 shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Home */}
          <Link className="flex items-center flex-col" to="/">
            <span className={`text-[20px] ${location.pathname === "/" || location.pathname === "/home" ? "text-black" : "text-gray-600"}`}><FaHome /></span>
            <span className={`text-[13px] font-semibold ${location.pathname === "/" || location.pathname === "/home" ? "text-black" : "text-gray-600"}`}>Home</span>
          </Link>

          {/* Watchlist */}
          <div className="flex items-center flex-col">
            <span className={`text-[20px] ${location.pathname === "/watchlist" ? "text-primary" : "text-gray-600"}`}><FaRegHeart /></span>
            <span className={`text-[13px] font-semibold ${location.pathname === "/watchlist" ? "text-black" : "text-gray-600"}`}>Watchlist</span>
          </div>

          {/* Cart */}
          <Link className="flex items-center flex-col" to="/cart">
            <span className={`text-[20px] ${location.pathname === "/cart" ? "text-[25px]" : "text-[20px]"} transition duration-300 absolute -top-5 bg-primary text-white flex items-center justify-center size-[45px] rounded-full border-[3px] border-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}><FaShopify /></span>
            <div className="flex gap-1 mt-4">
              <span className={`text-[13px] font-semibold ${location.pathname === "/cart" ? "text-black" : "text-gray-600"}`}>Cart</span>
              <span className={`text-[13px] font-semibold ${location.pathname === "/cart" ? "text-black" : "text-gray-600"}`}>({products.length})</span>
            </div>
          </Link>

          {/* Compare */}
          <div className="flex items-center flex-col">
            <span className={`text-[20px] ${location.pathname === "/compare" ? "text-primary" : "text-gray-600"}`}><FaArrowsRotate /></span>
            <span className={`text-[13px] font-semibold ${location.pathname === "/compare" ? "text-black" : "text-gray-600"}`}>Compare</span>
          </div>

          {/* Account */}
          <div className="flex items-center flex-col">
            <span className={`text-[20px] size-[25px] ${location.pathname === "/account" ? "border-2 border-primary rounded-full" : "text-gray-600"}`}>
              <img className="w-full h-full rounded-full" src="/image/avatar-place.png" alt="account-img" />
            </span>
            <span className={`text-[13px] font-semibold ${location.pathname === "/account" ? "text-black" : "text-gray-600"}`}>Account</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
