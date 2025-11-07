import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import Equipment from './pages/Equipment'
import Overview from './pages/Overview';
import WorkOrders from './pages/WorkOrders';
import './App.css'

function App() {
  return (
    <>
      <div className="app-layout">
        <Header />
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/work-orders" element={<WorkOrders />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App