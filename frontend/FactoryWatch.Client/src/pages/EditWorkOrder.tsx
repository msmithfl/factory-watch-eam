import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { API_BASE_URL } from '../utils/api'
import type { WorkOrder } from '../types/WorkOrder'
import type { Equipment } from '../types/Equipment'

interface EditWorkOrderForm {
  equipmentId: string
  title: string
  description: string
  assignedTo: string
}

function EditWorkOrder() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null)
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<EditWorkOrderForm>({
    equipmentId: '',
    title: '',
    description: '',
    assignedTo: ''
  })

  // Fetch work order and equipment list when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate('/work-orders')
        return
      }

      try {
        // Fetch work order details
        const workOrderResponse = await fetch(`${API_BASE_URL}/work-orders/${id}`)
        if (!workOrderResponse.ok) {
          throw new Error('Failed to fetch work order')
        }
        const workOrderData: WorkOrder = await workOrderResponse.json()
        setWorkOrder(workOrderData)

        // Fetch equipment list for dropdown
        const equipmentResponse = await fetch(`${API_BASE_URL}/equipment`)
        if (!equipmentResponse.ok) {
          throw new Error('Failed to fetch equipment')
        }
        const equipmentData: Equipment[] = await equipmentResponse.json()
        setEquipmentList(equipmentData)

        // Set form data
        setFormData({
          equipmentId: workOrderData.equipmentId.toString(),
          title: workOrderData.title,
          description: workOrderData.description || '',
          assignedTo: workOrderData.assignedTo || ''
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/work-orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          assignedTo: formData.assignedTo || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update work order')
      }

      // Success - navigate back to work order details
      navigate(`/work-orders/details/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update work order')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/work-orders/details/${id}`)
  }

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading work order...</div>
      </div>
    )
  }

  if (error && !workOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <Link to="/work-orders" className="text-blue-400 hover:text-blue-300 underline">
          Back to Work Orders
        </Link>
      </div>
    )
  }

  if (!workOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl mb-4">Work order not found</div>
        <Link to="/work-orders" className="text-blue-400 hover:text-blue-300 underline">
          Back to Work Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-300 mb-4">
        <Link to="/work-orders" className="hover:text-white hover:underline cursor-pointer">
          Work Orders
        </Link>
        <FaChevronRight className="mx-2" size={10} />
        <Link to={`/work-orders/details/${id}`} className="hover:text-white hover:underline cursor-pointer">
          {workOrder.title}
        </Link>
        <FaChevronRight className="mx-2" size={10} />
        <span className="text-white">Edit</span>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-white text-2xl font-bold">Edit Work Order</h1>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 p-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}

        {workOrder.isCompleted && (
          <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded text-yellow-200">
            ⚠️ This work order is already completed. Changes will not affect the equipment maintenance dates.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Work Order ID (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Work Order ID
            </label>
            <input
              type="text"
              value={`#${workOrder.id}`}
              disabled
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Equipment (Read-only - can't change equipment for existing work order) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Equipment
            </label>
            <input
              type="text"
              value={workOrder.equipmentName}
              disabled
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-gray-400">
              Equipment cannot be changed for existing work orders
            </p>
          </div>

          {/* Status (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <input
              type="text"
              value={workOrder.isCompleted ? 'Completed' : 'Open'}
              disabled
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-gray-400">
              Use the "Complete" button on the details page to mark as completed
            </p>
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
              {loading ? 'Updating...' : 'Update Work Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditWorkOrder