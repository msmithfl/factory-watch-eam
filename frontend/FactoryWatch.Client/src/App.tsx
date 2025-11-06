import { useState, useEffect } from 'react'
import './App.css'

// TypeScript interface matching your EquipmentResponseDto
interface Equipment {
  id: number
  name: string
  location: string
  status: string
  lastMaintenanceDate: string
  nextMaintenanceDate?: string
  description?: string
  createdAt: string
}

function App() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch equipment when component mounts
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch('http://localhost:5141/equipment')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: Equipment[] = await response.json()
        setEquipment(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch equipment')
      } finally {
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [])

  if (loading) return <div>Loading equipment...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <h1>FactoryWatch - Equipment List</h1>
      
      {equipment.length === 0 ? (
        <p>No equipment found</p>
      ) : (
        <div>
          <h2>Equipment ({equipment.length} items)</h2>
          <ul>
            {equipment.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.location} 
                <span style={{ color: getStatusColor(item.status) }}>
                  ({item.status})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

// Helper function to color-code status
function getStatusColor(status: string): string {
  switch (status) {
    case 'Operational': return 'green'
    case 'UnderMaintenance': return 'orange'
    case 'OutOfService': return 'red'
    case 'Decommissioned': return 'gray'
    default: return 'black'
  }
}

export default App