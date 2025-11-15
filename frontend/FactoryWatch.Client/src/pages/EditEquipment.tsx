import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../utils/api'
import type { Equipment, EditEquipmentForm, EquipmentStatus } from '../types/Equipment'

// Helper to convert status string to number for API
const getStatusNumber = (status: EquipmentStatus): number => {
  switch (status) {
    case 'Operational': return 0
    case 'UnderMaintenance': return 1
    case 'OutOfService': return 2
    case 'Decommissioned': return 3
    default: return 0
  }
}

function EditEquipment() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<EditEquipmentForm>({
    name: '',
    location: '',
    status: 'Operational',
    description: ''
  })

  // Fetch equipment data when component mounts
  useEffect(() => {
    const fetchEquipment = async () => {
      if (!id) {
        navigate('/equipment')
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/equipment/${id}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: Equipment = await response.json()
        setEquipment(data)

        // API returns status as string: "Operational", "UnderMaintenance", etc.
        setFormData({
          name: data.name,
          location: data.location,
          status: data.status, // String from API
          description: data.description || ''
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch equipment')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchEquipment()
  }, [id, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value // Keep as string in form
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          status: getStatusNumber(formData.status), // Convert string to number for API
          nextMaintenanceDate: null,
          description: formData.description || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update equipment')
      }

      // Success - navigate back to equipment list
      navigate('/equipment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update equipment')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/equipment')
  }

  if (fetchLoading) {
    return <div className="text-white text-center p-4">Loading equipment...</div>
  }

  if (!equipment) {
    return <div className="text-red-400 text-center p-4">Equipment not found</div>
  }

  return (
    <div className="flex flex-col p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-300 mb-4">
        <span 
          className="hover:text-white cursor-pointer"
          onClick={() => navigate('/equipment')}
        >
          Equipment
        </span>
        <span className="mx-2 text-gray-500">›</span>
        <span className="text-white">Edit Equipment</span>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-white text-2xl font-bold">Edit Equipment</h1>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 p-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Equipment ID (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Equipment ID
            </label>
            <input
              type="text"
              value={`#${equipment.id}`}
              disabled
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Equipment Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter equipment name"
            />
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter location"
            />
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Operational">Operational</option>
              <option value="UnderMaintenance">Under Maintenance</option>
              <option value="OutOfService">Out of Service</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter description (optional)"
            />
            <p className="mt-1 text-sm text-gray-400">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Updating...' : 'Update Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEquipment