import { Link } from "react-router-dom"
import { MyComponentProps } from "../type"

const BestSelling: React.FC<MyComponentProps> = ({MyComp}) => {
  return (
    <div id="best-seller" className="container mx-auto px-4 shadow-lg bg-white mt-3 py-2">
      <div className="border-b px-4 pb-4 mb-4 flex items-center justify-between">
        <h5 className='capitalize text-2xl font-semibold'>Best Selling</h5>
        <Link to={`/view_more?section=best_selling`} className="px-3 py-2 text-white rounded bg-primary">View More</Link>
      </div>
      {MyComp}
    </div>
  )
}

export default BestSelling
