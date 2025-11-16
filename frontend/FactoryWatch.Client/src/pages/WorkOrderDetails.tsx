import { FaChevronRight, FaEdit, FaTrash, FaArrowLeft, FaCheckCircle, FaCog } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import type { WorkOrder } from "../types/WorkOrder";
import ConfirmDialog from "../components/ConfirmDialog";

export default function WorkOrderDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    action: 'delete' | 'complete'
  }>({
    isOpen: false,
    action: 'delete'
  })

  useEffect(() => {
    const fetchWorkOrder = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/work-orders/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: WorkOrder = await response.json()
        setWorkOrder(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch work order')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchWorkOrder()
    }
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/work-orders/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Navigate back to work orders list
      navigate('/work-orders')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete work order')
      setConfirmDialog({ isOpen: false, action: 'delete' })
    }
  }

  const handleComplete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/work-orders/${id}/complete`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Refresh work order data
      const updatedResponse = await fetch(`${API_BASE_URL}/work-orders/${id}`)
      const updatedData: WorkOrder = await updatedResponse.json()
      setWorkOrder(updatedData)
      
      setConfirmDialog({ isOpen: false, action: 'complete' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete work order')
      setConfirmDialog({ isOpen: false, action: 'complete' })
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading work order details...</div>
      </div>
    )
  }

  if (error || !workOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl mb-4">
          {error || 'Work order not found'}
        </div>
        <Link 
          to="/work-orders" 
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Back to Work Orders
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col p-6 mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-300 mb-4">
          <Link to="/work-orders" className="hover:text-white hover:underline cursor-pointer">
            Work Orders
          </Link>
          <FaChevronRight className="mx-2" size={10} />
          <span className="text-white">{workOrder.title}</span>
        </div>

        {/* Back Button */}
        {/* <button
          onClick={() => navigate('/work-orders')}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
        >
          <FaArrowLeft size={14} />
          <span>Back to Work Orders</span>
        </button> */}

        {/* Page Header */}
        <div className="flex justify-between items-start pb-6 border-b border-gray-700">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">{workOrder.title}</h1>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              workOrder.isCompleted 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-yellow-900/30 text-yellow-400'
            }`}>
              {workOrder.isCompleted ? 'Completed' : 'Open'}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {!workOrder.isCompleted && (
              <button
                onClick={() => setConfirmDialog({ isOpen: true, action: 'complete' })}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <FaCheckCircle size={14} />
                <span>Complete</span>
              </button>
            )}
            <button
              onClick={() => navigate(`/work-orders/edit/${workOrder.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaEdit size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setConfirmDialog({ isOpen: true, action: 'delete' })}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <FaTrash size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Work Order Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-white text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Work Order ID</label>
                <p className="text-white text-lg">#{workOrder.id}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Title</label>
                <p className="text-white text-lg">{workOrder.title}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Equipment</label>
                <Link 
                  to={`/equipment/details/${workOrder.equipmentId}`}
                  className="text-blue-400 hover:text-blue-300 text-lg flex items-center gap-2 hover:underline"
                >
                  <FaCog size={16} />
                  {workOrder.equipmentName}
                </Link>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Assigned To</label>
                <p className="text-white text-lg">
                  {workOrder.assignedTo || 'Unassigned'}
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <div className="mt-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    workOrder.isCompleted 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {workOrder.isCompleted ? 'Completed' : 'Open'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-white text-xl font-semibold mb-4">Timeline</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Created</label>
                <p className="text-white text-lg">
                  {formatDateTime(workOrder.createdAt)}
                </p>
              </div>

              {workOrder.completedDate && (
                <div>
                  <label className="text-gray-400 text-sm">Completed</label>
                  <p className="text-white text-lg">
                    {formatDateTime(workOrder.completedDate)}
                  </p>
                </div>
              )}

              {workOrder.isCompleted && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✓ This work order has been completed. Equipment maintenance dates have been updated.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {workOrder.description && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 md:col-span-2">
              <h2 className="text-white text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{workOrder.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen && confirmDialog.action === 'delete'}
        title="Delete Work Order"
        message={`Are you sure you want to delete "${workOrder.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, action: 'delete' })}
        variant="danger"
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen && confirmDialog.action === 'complete'}
        title="Complete Work Order"
        message={`Mark "${workOrder.title}" as completed? This will update the equipment's maintenance dates (Last: today, Next: +90 days).`}
        confirmText="Complete"
        cancelText="Cancel"
        onConfirm={handleComplete}
        onCancel={() => setConfirmDialog({ isOpen: false, action: 'complete' })}
        variant="info"
      />
    </>
  )
}