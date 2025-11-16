import { FaChevronRight, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import type { Equipment } from "../types/Equipment";
import { StatusBadge } from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import WorkOrderTable from "../components/WorkOrderTable";

function EquipmentDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: Equipment = await response.json()
        setEquipment(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch equipment')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEquipment()
    }
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Navigate back to equipment list
      navigate('/equipment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete equipment')
      setShowDeleteDialog(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading equipment details...</div>
      </div>
    )
  }

  if (error || !equipment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl mb-4">
          {error || 'Equipment not found'}
        </div>
        <Link 
          to="/equipment" 
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Back to Equipment List
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col p-6 mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-300 mb-1">
          <Link to="/equipment" className="hover:text-white hover:underline cursor-pointer">
            Equipment
          </Link>
          <FaChevronRight className="mx-2" size={10} />
          <span className="text-white">{equipment.name}</span>
        </div>

        {/* Back Button */}
        {/* <button
          onClick={() => navigate('/equipment')}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
        >
          <FaArrowLeft size={14} />
          <span>Back to Equipment</span>
        </button> */}

        {/* Page Header */}
        <div className="flex justify-between items-start pb-6 border-b border-gray-700">
          <div>
            <h1 className="text-white text-2xl font-bold mb-2">{equipment.name}</h1>
            <StatusBadge status={equipment.status} />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/equipment/edit/${equipment.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaEdit size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <FaTrash size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Equipment Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-white text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Equipment ID</label>
                <p className="text-white text-lg">#{equipment.id}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-white text-lg">{equipment.name}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Location</label>
                <p className="text-white text-lg">{equipment.location}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <div className="mt-1">
                  <StatusBadge status={equipment.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-white text-xl font-semibold mb-4">Maintenance</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Last Maintenance</label>
                <p className="text-white text-lg">
                  {formatDate(equipment.lastMaintenanceDate)}
                </p>
              </div>

              {equipment.nextMaintenanceDate && (
                <div>
                  <label className="text-gray-400 text-sm">Next Maintenance</label>
                  <p className="text-white text-lg">
                    {formatDate(equipment.nextMaintenanceDate)}
                  </p>
                </div>
              )}

              <div>
                <label className="text-gray-400 text-sm">Created</label>
                <p className="text-white text-lg">
                  {formatDate(equipment.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {equipment.description && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 md:col-span-2">
              <h2 className="text-white text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed">{equipment.description}</p>
            </div>
          )}

          {/* Work Orders Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">Work Orders</h2>
              <Link
                to={`/work-orders/new?equipmentId=${equipment.id}`}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
              >
                <span>+ Create Work Order</span>
              </Link>
            </div>
            <WorkOrderTable equipmentId={Number(id)} small />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Equipment"
        message={`Are you sure you want to delete "${equipment.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        variant="danger"
      />
    </>
  )
}

export default EquipmentDetails;