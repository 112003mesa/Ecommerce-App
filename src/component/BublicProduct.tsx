import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Product } from "../type"
import { Link } from "react-router-dom"
import { PiCaretLeft, PiCaretRight } from "react-icons/pi"
import { FaRegHeart, FaShoppingCart } from "react-icons/fa"
import { FaArrowsRotate } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { showProduct } from "../productsSlice/ShowProduct"
import { addToCart } from "../productsSlice/CartSlice"
import { FC } from "react"

interface BublicProductProps {
  allProduct: Product[]
  className?: string
}

const BublicProduct: FC<BublicProductProps> = ({ allProduct, className = "" }) => {
  const dispatch = useDispatch()
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 25 },
      },
      "(min-width: 1300px)": {
        slides: { perView: 5, spacing: 30 },
      },
    },
  })

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item))
  }

  if (allProduct.length === 0) return null

  return (
    <section className={`relative w-full ${className}`}>
      <div
        ref={sliderRef}
        className="keen-slider"
      >
        {allProduct.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide relative overflow-hidden mb-3 bg-white shadow rounded p-4 hover:shadow-[0px_3px_8px_rgba(0,0,0,0.24)] group"
            onClick={() => dispatch(showProduct(item))}
          >
            <Link to={`/show_product/${item.id}`} className="block">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
                loading="lazy"
                width={300}
                height={192}
              />
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="text-green-600 mt-1">${item.priceUs}</p>
            </Link>

            <div className="absolute top-6 -right-[25px] flex flex-col gap-[5px] transition-all duration-300 group-hover:right-5">
              <button
                className="bg-white hover:bg-primary hover:text-white text-sm text-gray-700 shadow-md size-[25px] flex items-center justify-center rounded-full"
              >
                <FaRegHeart />
              </button>
              <button
                className="bg-white hover:bg-primary hover:text-white text-sm text-gray-700 shadow-md size-[25px] flex items-center justify-center rounded-full"
              >
                <FaArrowsRotate />
              </button>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-white hover:bg-primary hover:text-white text-sm text-gray-700 shadow-md size-[25px] flex items-center justify-center rounded-full"
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute text-2xl left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-primary transition"
      >
        <PiCaretLeft />
      </button>

      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute text-2xl right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-primary transition"
      >
        <PiCaretRight />
      </button>
    </section>
  )
}

export default BublicProduct
