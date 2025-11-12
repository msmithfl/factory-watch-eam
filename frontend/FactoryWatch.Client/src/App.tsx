import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Equipment from './pages/Equipment'
import NewEquipment from './pages/NewEquipment'
import WorkOrders from './pages/WorkOrders'
import './App.css'
import NewWorkOrder from './pages/NewWorkOrder'

function App() {
  return (
    <>
      {/* Header */}
      <div className='flex bg-gray-800 border-b-2 border-gray-600 min-h-16'>
        <Header />
      </div>
      
      {/* Main Layout */}
      <div className='flex'>
        {/* Sidebar */}
        <div className='w-1/6 h-svh bg-gray-800 hidden md:block border-r-2 border-gray-600'>
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className='w-full md:w-5/6 h-svh bg-gray-900 overflow-y-auto'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/new" element={<NewEquipment />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/work-orders/new" element={<NewWorkOrder />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App