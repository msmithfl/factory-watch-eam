import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewWorkOrder() {
  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center text-sm text-gray-300 mb-4">
        <Link to="/work-orders" className="hover:text-white hover:underline cursor-pointer">Work Orders</Link>
        <FaChevronRight className="mx-2" size={10} />
        <span className="text-white">New</span>
      </div>
      {/* Page Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-white text-2xl font-bold">New Work Order</h1>
      </div>
    </div>
  )
}

export default NewWorkOrder;