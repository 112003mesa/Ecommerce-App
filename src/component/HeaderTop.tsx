import { useEffect, useState, useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { LiaAngleDownSolid } from "react-icons/lia";
import { TfiAngleUp } from "react-icons/tfi";

type Currency = "u.s.Dollar ($)" | "Kuwaiti Dinar (KWD)";
type Language = "en" | "ar";

const HeaderTop = () => {
  const [currency, setCurrency] = useState<Currency>("u.s.Dollar ($)");
  const [viewLang, setViewLang] = useState(false);
  const [viewCurrency, setViewCurrency] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: Language) => {
    setLang(lng);
    setViewLang(false);
  };

  const changeCurrency = (cur: Currency) => {
    setCurrency(cur);
    setViewCurrency(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setViewLang(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setViewCurrency(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, type: 'lang' | 'currency') => {
    if (e.key === 'Escape') {
      if (type === 'lang') setViewLang(false);
      if (type === 'currency') setViewCurrency(false);
    }
  };

  const LanguageDropdown = () => (
    <div className="relative" ref={langRef}>
      <button
        className="flex items-center text-[13px] gap-2 cursor-pointer text-gray-600"
        onClick={() => {
          setViewLang(!viewLang);
          setViewCurrency(false);
        }}
        onKeyDown={(e) => handleKeyDown(e, 'lang')}
      >
        {lang === "en" ? (
          <>
            <img src="/image/en.png" alt="English flag" width={20} height={15} />
            English
          </>
        ) : (
          <>
            <img src="/image/kw.png" alt="Arabic flag" width={20} height={15} />
            عربي
          </>
        )}
        {viewLang ? <TfiAngleUp /> : <LiaAngleDownSolid />}
      </button>

      {viewLang && (
        <div className="z-30 absolute top-[24px]">
          <button
            onClick={() => changeLanguage("ar")}
            className={`border-x border-t cursor-pointer w-[107px] ps-3 py-1 text-[13px] flex items-center gap-2 transition hover:bg-primary hover:text-white ${
              lang === "ar" ? "bg-primary text-white" : "bg-white text-gray-600"
            }`}
          >
            <img src="/image/kw.png" alt="Arabic flag" width={20} height={15} />
            <span>عربي</span>
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`border-b border w-[107px] cursor-pointer ps-3 py-1 text-[13px] flex items-center gap-2 transition hover:bg-primary hover:text-white ${
              lang === "en" ? "bg-primary text-white" : "bg-white text-gray-600"
            }`}
          >
            <img src="/image/en.png" alt="English flag" width={20} height={15} />
            <span>English</span>
          </button>
        </div>
      )}
    </div>
  );

  const CurrencyDropdown = () => (
    <div className="relative" ref={currencyRef}>
      <button
        className="flex items-center text-[13px] gap-2 cursor-pointer text-gray-600"
        onClick={() => {
          setViewCurrency(!viewCurrency);
          setViewLang(false);
        }}
        onKeyDown={(e) => handleKeyDown(e, 'currency')}
      >
        {currency}
        {viewCurrency ? <TfiAngleUp /> : <LiaAngleDownSolid />}
      </button>
      {viewCurrency && (
        <div className="z-30 absolute top-[24px]">
          <button
            onClick={() => changeCurrency("u.s.Dollar ($)")}
            className={`border-x border-t cursor-pointer w-[157px] ps-3 py-1 text-[13px] flex items-center gap-2 transition hover:bg-primary hover:text-white ${
              currency === "u.s.Dollar ($)" ? "bg-primary text-white" : "bg-white text-gray-600"
            }`}
          >
            <span>u.s.Dollar ($)</span>
          </button>
          <button
            onClick={() => changeCurrency("Kuwaiti Dinar (KWD)")}
            className={`border-b border w-[157px] cursor-pointer ps-3 py-1 text-[13px] flex items-center gap-2 transition hover:bg-primary hover:text-white ${
              currency === "Kuwaiti Dinar (KWD)" ? "bg-primary text-white" : "bg-white text-gray-600"
            }`}
          >
            <span>Kuwaiti Dinar (KWD)</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="border-[#dee2e6] border-b bg-white">
      <div className="container mx-auto px-4 flex items-center justify-center sm:justify-between">
        <div className="py-1 flex items-center gap-5">
          <LanguageDropdown />
          <CurrencyDropdown />
        </div>

        {/* Right Side */}
        <div className="hidden sm:flex items-center text-xs text-gray-600">
          <span className="border-[#dee2e6] border-e px-2 py-1 flex items-center gap-1">
            <FaPhoneAlt />
            Helpline
          </span>
          <span className="border-[#dee2e6] border-e px-2 py-1">Login</span>
          <span className="border-[#dee2e6] border-e px-2 py-1">Registration</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
