import { useState, useEffect } from 'react'

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

// At the top of Equipment.tsx
const getApiUrl = () => {
  // Use Railway in production, localhost in development
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:5141'
    : 'https://factory-watch-api.up.railway.app';
};

const API_BASE_URL = getApiUrl();

function OldEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    status: '0'
  })
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState({
    name: '',
    location: '',
    status: '0',
    description: ''
  })

  // Fetch equipment when component mounts
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment`)
        
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

  // Start editing equipment
  const startEdit = (item: Equipment) => {
    setEditingId(item.id)
    setEditForm({
      name: item.name,
      location: item.location,
      status: getStatusValue(item.status)
    })
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', location: '', status: '0' })
  }

  // Create new equipment
  const createEquipment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: createForm.name,
          location: createForm.location,
          status: parseInt(createForm.status),
          description: createForm.description || null
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newItem = await response.json()
      
      // Add to local state
      setEquipment(prevEquipment => [...prevEquipment, newItem])

      // Clear form and hide
      setCreateForm({ name: '', location: '', status: '0', description: '' })
      setShowCreateForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create equipment')
    }
  }

  // Cancel create
  const cancelCreate = () => {
    setShowCreateForm(false)
    setCreateForm({ name: '', location: '', status: '0', description: '' })
  }

  // Update equipment
  const updateEquipment = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editForm.name,
          location: editForm.location,
          status: parseInt(editForm.status),
          nextMaintenanceDate: null, // You can extend this later
          description: null // You can extend this later
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedItem = await response.json()
      
      // Update local state
      setEquipment(prevEquipment =>
        prevEquipment.map(item =>
          item.id === id ? updatedItem : item
        )
      )

      // Clear edit mode
      setEditingId(null)
      setEditForm({ name: '', location: '', status: '0' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update equipment')
    }
  }

  // DELETE equipment function
  const deleteEquipment = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

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
    <div className="p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Equipment Management</h1>
      {/* Create Equipment Button/Form */}
      <div style={{ marginBottom: '20px' }}>
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            + Add New Equipment
          </button>
        ) : (
          <div style={{
            padding: '15px',
            border: '2px solid #28a745',
            borderRadius: '8px',
            backgroundColor: '#f8fff9'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#28a745' }}>Add New Equipment</h3>
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginBottom: '15px',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                placeholder="Equipment Name"
                value={createForm.name}
                onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minWidth: '150px'
                }}
              />
              <input
                type="text"
                placeholder="Location"
                value={createForm.location}
                onChange={(e) => setCreateForm(prev => ({ ...prev, location: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minWidth: '150px'
                }}
              />
              <select
                value={createForm.status}
                onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minWidth: '120px'
                }}
              >
                <option value="0">Operational</option>
                <option value="1">Under Maintenance</option>
                <option value="2">Out of Service</option>
                <option value="3">Decommissioned</option>
              </select>
              <input
                type="text"
                placeholder="Description (optional)"
                value={createForm.description}
                onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minWidth: '200px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={createEquipment}
                disabled={!createForm.name || !createForm.location}
                style={{
                  backgroundColor: createForm.name && createForm.location ? '#28a745' : '#ccc',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: createForm.name && createForm.location ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Create Equipment
              </button>
              <button
                onClick={cancelCreate}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      
      {equipment.length === 0 ? (
        <p>No equipment found</p>
      ) : (
        <div>
          <h2>Equipment ({equipment.length} items)</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {equipment.map((item) => (
              <li key={item.id} style={{ 
                marginBottom: '15px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: editingId === item.id ? '#f8f9fa' : 'white'
              }}>
                {editingId === item.id ? (
                  // Edit mode
                  <div>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ color: 'black' }}>
                        <strong>Editing: {item.name}</strong>
                      </span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      marginBottom: '10px',
                      flexWrap: 'wrap'
                    }}>
                      <input
                        type="text"
                        placeholder="Name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="0">Operational</option>
                        <option value="1">Under Maintenance</option>
                        <option value="2">Out of Service</option>
                        <option value="3">Decommissioned</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => updateEquipment(item.id)}
                        style={{
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ color: 'black', paddingRight: '5px' }}>
                        <strong>{item.name}</strong> - {item.location}
                      </span>
                      <span style={{ color: getStatusColor(item.status) }}>
                        ({item.status})
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => startEdit(item)}
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Edit
                      </button>
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
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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

// Helper function to convert status string to number for API
function getStatusValue(status: string): string {
  switch (status) {
    case 'Operational': return '0'
    case 'UnderMaintenance': return '1'
    case 'OutOfService': return '2'
    case 'Decommissioned': return '3'
    default: return '0'
  }
}

export default OldEquipment