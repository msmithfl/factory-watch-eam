import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../utils/api'

interface CreateEquipmentForm {
  name: string
  location: string
  status: string
  description: string
}

function NewEquipment() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<CreateEquipmentForm>({
    name: '',
    location: '',
    status: '0', // Operational
    description: ''
  })

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
      const response = await fetch(`${API_BASE_URL}/equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          status: parseInt(formData.status),
          description: formData.description || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create equipment')
      }

      // Success - navigate back to equipment list
      navigate('/equipment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create equipment')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/equipment')
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
        <span className="text-white">New Equipment</span>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-white text-2xl font-bold">Create New Equipment</h1>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 p-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <option value="0">Operational</option>
              <option value="1">Under Maintenance</option>
              <option value="2">Out of Service</option>
              <option value="3">Decommissioned</option>
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
              {loading ? 'Creating...' : 'Create Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewEquipment