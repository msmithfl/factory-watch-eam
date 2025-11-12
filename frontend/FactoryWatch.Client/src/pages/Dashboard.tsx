import BasicTable from "../components/BasicTable";

function Dashboard() {
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
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-xl mb-3 text-white">Equipment Overview</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
          <p className="text-white pb-3">Active machines</p>
          <BasicTable small />
        </div>
        
        {/* Top Right / Second Mobile */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-xl mb-3 text-white">Work Orders</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">8</div>
          <p className="text-white">Active work orders</p>
        </div>
        
        {/* Bottom Left / Third Mobile */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-xl mb-3 text-white">Maintenance Schedule</h3>
          <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
          <p className="text-white">Due this week</p>
        </div>
        
        {/* Bottom Right / Fourth Mobile */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-xl mb-3 text-white">Performance Metrics</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
          <p className="text-white">Overall efficiency</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;