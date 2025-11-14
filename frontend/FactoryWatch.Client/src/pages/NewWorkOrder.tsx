import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { API_BASE_URL } from '../utils/api'
import type { Equipment } from '../types/Equipment'

interface CreateWorkOrderForm {
  equipmentId: string
  title: string
  description: string
  assignedTo: string
}

function NewWorkOrder() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingEquipment, setLoadingEquipment] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  
  const [formData, setFormData] = useState<CreateWorkOrderForm>({
    equipmentId: '',
    title: '',
    description: '',
    assignedTo: ''
  })

  // Fetch equipment list for dropdown
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch equipment')
        }
        
        const data: Equipment[] = await response.json()
        setEquipmentList(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load equipment')
      } finally {
        setLoadingEquipment(false)
      }
    }

    fetchEquipment()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/work-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          equipmentId: parseInt(formData.equipmentId),
          title: formData.title,
          description: formData.description || null,
          assignedTo: formData.assignedTo || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create work order')
      }

      const createdWorkOrder = await response.json()

      // Success - navigate to the new work order details page
      navigate(`/work-orders/details/${createdWorkOrder.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create work order')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/work-orders')
  }

  return (
    <div className="flex flex-col p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-300 mb-4">
        <Link to="/work-orders" className="hover:text-white hover:underline cursor-pointer">
          Work Orders
        </Link>
        <FaChevronRight className="mx-2" size={10} />
        <span className="text-white">New</span>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-white text-2xl font-bold">Create New Work Order</h1>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 p-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}

        {loadingEquipment ? (
          <div className="text-center text-gray-400 py-8">Loading equipment...</div>
        ) : equipmentList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No equipment available. Create equipment first.</p>
            <Link 
              to="/equipment/new"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Create Equipment
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Equipment Selection */}
            <div>
              <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-300 mb-2">
                Equipment <span className="text-red-500">*</span>
              </label>
              <select
                id="equipmentId"
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select equipment...</option>
                {equipmentList.map(equipment => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name} - {equipment.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                maxLength={200}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Belt slipping under load"
              />
            </div>

            {/* Assigned To Field */}
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-300 mb-2">
                Assigned To
              </label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                maxLength={100}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter technician name (optional)"
              />
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
                rows={6}
                maxLength={1000}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe the issue or maintenance needed (optional)"
              />
              <p className="mt-1 text-sm text-gray-400">
                {formData.description.length}/1000 characters
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
                {loading ? 'Creating...' : 'Create Work Order'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default NewWorkOrder