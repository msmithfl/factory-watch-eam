import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import WorkOrderTable from "../components/WorkOrderTable";

function WorkOrders() {
  return (
    <div className="flex flex-col p-6">
      <div className="text-white text-sm">
        <p>Work Orders</p>
      </div>
      
      {/* Page Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-white text-2xl font-bold">Work Orders</h1>
        <Link 
          to="/work-orders/new"
          className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          <FaPlus size={15} />
          Create Work Order
        </Link>
      </div>
      
      {/* Work Orders Table */}
      <WorkOrderTable />
    </div>
  )
}

export default WorkOrders;