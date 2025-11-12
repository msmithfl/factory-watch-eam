import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewEquipment() {
  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center text-sm text-gray-300">
        <Link to="/equipment" className="hover:text-white hover:underline cursor-pointer">Equipment</Link>
        <FaChevronRight className="mx-2" size={10} />
        <span className="text-white">New</span>
      </div>
      {/* Page Header */}
      <div className="flex justify-between items-center pb-6 min-h-16">
        <h1 className="text-white text-2xl font-bold">New Equipment</h1>
      </div>
    </div>
  )
}

export default NewEquipment;