import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Equipment from './pages/Equipment'
import NewEquipment from './pages/NewEquipment'
import WorkOrders from './pages/WorkOrders'
import NewWorkOrder from './pages/NewWorkOrder'
import './App.css'
import EditEquipment from './pages/EditEquipment'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed height, never shrinks */}
      <div className='flex bg-gray-800 border-b-2 border-gray-600 h-16 flex-shrink-0'>
        <Header />
      </div>
      
      {/* Main Layout - Takes remaining space */}
      <div className='flex flex-1 min-h-0'>
        {/* Sidebar */}
        <div className='w-1/6 bg-gray-800 hidden md:block border-r-2 border-gray-600 flex-shrink-0'>
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className='w-full md:w-5/6 md:px-14 bg-gray-900'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/new" element={<NewEquipment />} />
            <Route path="/equipment/edit/:id" element={<EditEquipment />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/work-orders/new" element={<NewWorkOrder />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App