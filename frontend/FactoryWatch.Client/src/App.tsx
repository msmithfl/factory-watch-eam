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

  // DELETE equipment function
  const deleteEquipment = async (id: number, name: string) => {
    // Confirm before deleting
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      const response = await fetch(`http://localhost:5141/equipment/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Remove from local state (optimistic update)
      setEquipment(prevEquipment => 
        prevEquipment.filter(item => item.id !== id)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete equipment')
    }
  }

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
              <li key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <div>
                  <strong>{item.name}</strong> - {item.location} 
                  <span style={{ color: getStatusColor(item.status) }}>
                    ({item.status})
                  </span>
                </div>
                <button 
                  onClick={() => deleteEquipment(item.id, item.name)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                >
                  Delete
                </button>
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