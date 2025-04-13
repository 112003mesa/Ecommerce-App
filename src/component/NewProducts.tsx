import { Link } from "react-router-dom"
import { MyComponentProps } from "../type"

const NewProducts: React.FC<MyComponentProps> = ({MyComp}) => {
  return (
    <div id="new_products" className="container mx-auto px-4 shadow-lg bg-white mt-3 py-2">
      <div className="border-b px-4 pb-4 mb-4 flex items-center justify-between">
        <h5 className='capitalize text-2xl font-semibold'>New Products</h5>
        <Link to={`/view_more?section=new_product`} className="px-3 py-2 text-white rounded bg-primary">View More</Link>
      </div>
      {MyComp}
    </div>
  )
}

export default NewProducts
