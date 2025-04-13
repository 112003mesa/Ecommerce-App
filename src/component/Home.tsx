import { useAppSelector } from "../store/hooks"
import AllProducts from "./AllProducts"
import BestSelling from "./BestSelling"
import BublicProduct from "./BublicProduct"
import DailyUsage from "./DailyUsage"
import MensBraces from "./MensBraces"
import NewProducts from "./NewProducts"
import SectionGararey from "./SectionGararey"
import SportsBraces from "./SportsBraces"
import SurgicalBraces from "./SurgicalBraces"

const Home = () => {
  const AllProduct = useAppSelector((state) => state.AllDate)

  return (
    <div className="pt-[100px]">
      <SectionGararey />
      <AllProducts MyComp={<BublicProduct allProduct={AllProduct} />} />
      <NewProducts MyComp={<BublicProduct allProduct={AllProduct} />} />
      <BestSelling MyComp={<BublicProduct allProduct={AllProduct} />} />
      <DailyUsage MyComp={<BublicProduct allProduct={AllProduct} />} />
      <SurgicalBraces MyComp={<BublicProduct allProduct={AllProduct} />} />
      <SportsBraces MyComp={<BublicProduct allProduct={AllProduct} />} />
      <MensBraces MyComp={<BublicProduct allProduct={AllProduct} />} />
    </div>
  )
}

export default Home
