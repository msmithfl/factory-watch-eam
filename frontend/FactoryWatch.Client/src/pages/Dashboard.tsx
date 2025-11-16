import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import EquipmentTable from "../components/EquipmentTable";
import WorkOrderTable from "../components/WorkOrderTable";
import { API_BASE_URL } from "../utils/api";
import type { Equipment } from "../types/Equipment";
import type { WorkOrder } from "../types/WorkOrder";

function Dashboard() {
  const [equipmentCount, setEquipmentCount] = useState<number>(0)
  const [operationalCount, setOperationalCount] = useState<number>(0)
  const [workOrdersCount, setWorkOrdersCount] = useState<number>(0)
  const [activeWorkOrdersCount, setActiveWorkOrdersCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch equipment
        const equipmentResponse = await fetch(`${API_BASE_URL}/equipment`)
        const equipment: Equipment[] = await equipmentResponse.json()
        
        // Count operational equipment (status 0 = Operational)
        const operational = equipment.filter(e => e.status === "Operational").length
        
        setEquipmentCount(equipment.length)
        setOperationalCount(operational)

        // Fetch work orders
        const workOrdersResponse = await fetch(`${API_BASE_URL}/work-orders`)
        const workOrders: WorkOrder[] = await workOrdersResponse.json()
        
        // Count active (not completed) work orders
        const activeWorkOrders = workOrders.filter(wo => !wo.isCompleted).length
        
        setWorkOrdersCount(workOrders.length);
        setActiveWorkOrdersCount(activeWorkOrders)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="flex flex-col p-6 h-full md:h-full">
      <div className="text-white text-sm">
        <p>Dashboard</p>
      </div>
      
      {/* Page Header */}
      <div className="flex justify-between items-center pb-6 min-h-16">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
      </div>
      
      {/* Responsive Grid - Stacked on mobile, 2x2 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grid-rows-2 md:flex-1">
        {/* Equipment Overview Card */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-white">Equipment Overview</h3>
            <Link 
              to="/equipment/new"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
            >
              <FaPlus size={12}/>
              Create
            </Link>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {loading ? (
              <span className="text-gray-400">...</span>
            ) : (
              <>
                {operationalCount}
                <span className="text-white text-base pl-3 font-normal">
                  Operational ({equipmentCount} total)
                </span>
              </>
            )}
          </div>
          <EquipmentTable small />
        </div>
        
        {/* Work Orders Card */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-white">Work Orders</h3>
            <Link 
              to="/work-orders/new"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
            >
              <FaPlus size={12}/>
              Create
            </Link>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-4">
            {loading ? (
              <span className="text-gray-400">...</span>
            ) : (
              <>
                {activeWorkOrdersCount}
                <span className="text-white text-base pl-3 font-normal">
                  Open ({workOrdersCount} total)
                </span>
              </>
            )}
          </div>
          <WorkOrderTable small />
        </div>

        {/* Add back in these section with charts VV */}

        {/* <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-xl mb-3 text-white">Maintenance Schedule</h3>
          <div className="text-3xl font-bold text-orange-600 mb-4">3<span className="text-white text-base pl-3 font-normal">Due this week</span></div>
        </div>
        
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-xl mb-3 text-white">Performance Metrics</h3>
          <div className="text-3xl font-bold text-purple-600 mb-4">92%<span className="text-white text-base pl-3 font-normal">Overall efficiency</span></div>
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard;