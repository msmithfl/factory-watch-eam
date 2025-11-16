import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
import { API_BASE_URL } from '../utils/api'
import type { CreateEquipmentForm, EquipmentStatus } from '../types/Equipment'

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

function NewEquipment() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<CreateEquipmentForm>({
    name: '',
    location: '',
    status: 'Operational',
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
          status: getStatusNumber(formData.status),
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
      <div className="flex items-center text-sm text-gray-300 mb-1">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
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
                placeholder="e.g., Hydraulic Press #3"
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
                placeholder="e.g., Building A - Production Floor"
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
                placeholder="Enter equipment specifications, serial number, or notes (optional)"
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

        {/* Right Column - Instructions */}
        <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaInfoCircle className="text-blue-400" size={20} />
            <h2 className="text-white text-xl font-semibold">Equipment Setup Guidelines</h2>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* Best Practices Section */}
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-400" size={16} />
                Best Practices
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>Use descriptive names:</strong> Include equipment type and identifier (e.g., "CNC Mill #2" not just "Mill")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>Be specific with location:</strong> Include building, floor, or zone to help technicians locate equipment quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>Set accurate initial status:</strong> New equipment should typically start as "Operational"</span>
                </li>
              </ul>
            </div>

            {/* Status Definitions */}
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-400" size={16} />
                Status Definitions
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">●</span>
                  <span><strong>Operational:</strong> Equipment is running and available for use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">●</span>
                  <span><strong>Under Maintenance:</strong> Scheduled or ongoing maintenance work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">●</span>
                  <span><strong>Out of Service:</strong> Equipment is broken or unsafe to operate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">●</span>
                  <span><strong>Decommissioned:</strong> Equipment permanently removed from service</span>
                </li>
              </ul>
            </div>

            {/* Description Tips */}
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-400" size={16} />
                Description Tips
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Include manufacturer and model number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Add serial number for tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Note any special requirements or certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Reference purchase date or warranty information</span>
                </li>
              </ul>
            </div>

            {/* Examples Section */}
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-semibold mb-3 text-sm">Good Example:</h3>
              <div className="text-sm space-y-2">
                <p><strong className="text-blue-400">Name:</strong> Hydraulic Press #3</p>
                <p><strong className="text-blue-400">Location:</strong> Building A - Production Floor, Zone 2</p>
                <p><strong className="text-blue-400">Status:</strong> Operational</p>
                <p><strong className="text-blue-400">Description:</strong> Apex 500-ton hydraulic press, Model HP-500, S/N: HP2023-0847. Purchased 03/2023, 2-year warranty expires 03/2025.</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2 text-sm">After Creation</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ Equipment will appear in the dashboard</li>
                <li>✓ Create work orders for maintenance tasks</li>
                <li>✓ Track maintenance history and schedules</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewEquipment