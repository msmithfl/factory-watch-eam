import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import { FaTrash, FaEdit, FaCheckCircle } from 'react-icons/fa';
import type { WorkOrder } from '../types/WorkOrder';
import ConfirmDialog from './ConfirmDialog';

interface WorkOrderTableProps {
  small?: boolean
  equipmentId?: number  // Optional: filter by equipment
}

export default function WorkOrderTable({ small = false, equipmentId }: WorkOrderTableProps) {
    const navigate = useNavigate()
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    // Confirm dialog state
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean
        workOrderId: number | null
        workOrderTitle: string
        action: 'delete' | 'complete'
    }>({
        isOpen: false,
        workOrderId: null,
        workOrderTitle: '',
        action: 'delete'
    })

    useEffect(() => {
        const fetchWorkOrders = async () => {
            try {
                // If equipmentId provided, fetch only for that equipment
                const url = equipmentId 
                    ? `${API_BASE_URL}/work-orders/equipment/${equipmentId}`
                    : `${API_BASE_URL}/work-orders`
                
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data: WorkOrder[] = await response.json()
                setWorkOrders(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch work orders')
            } finally {
                setLoading(false)
            }
        }

        fetchWorkOrders()
    }, [equipmentId])

    // Navigate to details page
    const handleRowClick = (id: number) => {
        navigate(`/work-orders/details/${id}`)
    }

    // Open delete confirmation dialog
    const handleDeleteClick = (e: React.MouseEvent, id: number, title: string) => {
        e.stopPropagation()
        setConfirmDialog({
            isOpen: true,
            workOrderId: id,
            workOrderTitle: title,
            action: 'delete'
        })
    }

    // Open complete confirmation dialog
    const handleCompleteClick = (e: React.MouseEvent, id: number, title: string) => {
        e.stopPropagation()
        setConfirmDialog({
            isOpen: true,
            workOrderId: id,
            workOrderTitle: title,
            action: 'complete'
        })
    }

    // Handle edit click
    const handleEditClick = (e: React.MouseEvent, item: WorkOrder) => {
        e.stopPropagation()
        navigate(`/work-orders/edit/${item.id}`)
    }

    // Confirm action (delete or complete)
    const handleConfirmAction = async () => {
        if (!confirmDialog.workOrderId) return

        try {
            if (confirmDialog.action === 'delete') {
                // Delete work order
                const response = await fetch(`${API_BASE_URL}/work-orders/${confirmDialog.workOrderId}`, {
                    method: 'DELETE'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                // Remove from local state
                setWorkOrders(prevWorkOrders => 
                    prevWorkOrders.filter(item => item.id !== confirmDialog.workOrderId)
                )
            } else if (confirmDialog.action === 'complete') {
                // Complete work order
                const response = await fetch(`${API_BASE_URL}/work-orders/${confirmDialog.workOrderId}/complete`, {
                    method: 'POST'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                // Update local state to show completed
                setWorkOrders(prevWorkOrders => 
                    prevWorkOrders.map(item => 
                        item.id === confirmDialog.workOrderId 
                            ? { ...item, isCompleted: true, completedDate: new Date().toISOString() }
                            : item
                    )
                )
            }

            // Close dialog
            setConfirmDialog({
                isOpen: false,
                workOrderId: null,
                workOrderTitle: '',
                action: 'delete'
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to perform action')
            // Close dialog even on error
            setConfirmDialog({
                isOpen: false,
                workOrderId: null,
                workOrderTitle: '',
                action: 'delete'
            })
        }
    }

    // Cancel action
    const handleCancelAction = () => {
        setConfirmDialog({
            isOpen: false,
            workOrderId: null,
            workOrderTitle: '',
            action: 'delete'
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })
    }

    if (loading) return <div className="text-white text-center p-4">Loading work orders...</div>
    if (error) return <div className="text-red-400 text-center p-4">Error: {error}</div>
    if (workOrders.length === 0) return <div className="text-gray-400 text-center p-4">No work orders found</div>

    return (
        <>
            <TableContainer 
                component={Paper} 
                className="bg-gray-800 shadow-xl"
                sx={{ backgroundColor: '#1f2937', '& .MuiPaper-root': { backgroundColor: '#1f2937', boxShadow: 'none' } }}
            >
                <Table sx={{ minWidth: 450 }} size={small ? "small" : "medium"} aria-label="work orders table">
                    <TableHead>
                        <TableRow className="border-b border-gray-600">
                            {!small && (
                                <TableCell 
                                    className="text-white font-bold"
                                    sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                                >
                                    ID
                                </TableCell>
                            )}
                            <TableCell 
                                className="text-white font-bold"
                                sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                            >
                                Title
                            </TableCell>
                            {!equipmentId && (
                                <TableCell 
                                    className="text-white font-bold"
                                    sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                                >
                                    Equipment
                                </TableCell>
                            )}
                            <TableCell 
                                className="text-white font-bold"
                                sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                            >
                                Assigned To
                            </TableCell>
                            <TableCell 
                                className="text-white font-bold"
                                sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                            >
                                Status
                            </TableCell>
                            {!small && (
                                <TableCell 
                                    className="text-white font-bold"
                                    sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                                >
                                    Created
                                </TableCell>
                            )}
                            {!small && (
                                <TableCell 
                                    sx={{ 
                                        borderBottom: '1px solid #4b5563', 
                                        backgroundColor: '#374151',
                                        width: '150px'
                                    }}
                                />
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workOrders.map((item) => (
                            <TableRow
                                key={item.id}
                                onClick={() => handleRowClick(item.id)}
                                className="hover:bg-gray-700 cursor-pointer"
                                sx={{  
                                    '&:last-child td, &:last-child th': { border: 0 }, 
                                    '&:hover': { backgroundColor: '#374151' },
                                    cursor: 'pointer'
                                }}
                            >
                                {!small && (
                                    <TableCell 
                                        className="text-gray-100"
                                        sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                    >
                                        {item.id}
                                    </TableCell>
                                )}
                                <TableCell 
                                    className="text-gray-100"
                                    sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                >
                                    {item.title}
                                </TableCell>
                                {!equipmentId && (
                                    <TableCell 
                                        className="text-gray-100"
                                        sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                    >
                                        {item.equipmentName}
                                    </TableCell>
                                )}
                                <TableCell 
                                    className="text-gray-100"
                                    sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                >
                                    {item.assignedTo || 'Unassigned'}
                                </TableCell>
                                <TableCell 
                                    sx={{ borderBottom: '1px solid #4b5563' }}
                                >
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        item.isCompleted 
                                            ? 'bg-green-900/30 text-green-400' 
                                            : 'bg-yellow-900/30 text-yellow-400'
                                    }`}>
                                        {item.isCompleted ? 'Completed' : 'Open'}
                                    </span>
                                </TableCell>
                                {!small && (
                                    <TableCell 
                                        className="text-gray-100"
                                        sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                    >
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                )}
                                {!small && (
                                    <TableCell 
                                        align="right"
                                        sx={{ borderBottom: '1px solid #4b5563' }}
                                    >
                                        <div className="flex justify-end gap-2">
                                            {!item.isCompleted && (
                                                <button
                                                    onClick={(e) => handleCompleteClick(e, item.id, item.title)}
                                                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-colors"
                                                    title={`Complete ${item.title}`}
                                                >
                                                    <FaCheckCircle size={14} />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => handleEditClick(e, item)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                                                title={`Edit ${item.title}`}
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteClick(e, item.id, item.title)}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                                                title={`Delete ${item.title}`}
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.action === 'delete' ? 'Delete Work Order' : 'Complete Work Order'}
                message={
                    confirmDialog.action === 'delete'
                        ? `Are you sure you want to delete "${confirmDialog.workOrderTitle}"? This action cannot be undone.`
                        : `Mark "${confirmDialog.workOrderTitle}" as completed? This will update the equipment's maintenance dates.`
                }
                confirmText={confirmDialog.action === 'delete' ? 'Delete' : 'Complete'}
                cancelText="Cancel"
                onConfirm={handleConfirmAction}
                onCancel={handleCancelAction}
                variant={confirmDialog.action === 'delete' ? 'danger' : 'info'}
            />
        </>
    )
}