function Overview() {
  return (
    <div className="flex flex-col p-6">
      <div className="text-white text-sm">
        <p>Dashboard</p>
      </div>
      {/* Page Header */}
      <div className="flex justify-between items-center pb-6 min-h-16">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
      </div>
      
      {/* Overview Section */}
      <div className="flex gap-4">
        <div className="bg-white border rounded p-4 w-1/2">
          <p>Equipment overview goes here.</p>
        </div>
        <div className="bg-white border rounded p-4 w-1/2">
          <p>Work order overview goes here.</p>
        </div>
      </div>
    </div>
  )
}

export default Overview;