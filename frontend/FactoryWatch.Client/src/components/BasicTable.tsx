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
import { FaTrash, FaEdit } from 'react-icons/fa';
import { StatusBadge } from './StatusBadge';
import type { Equipment } from '../types/equipment';
import ConfirmDialog from './ConfirmDialog';

interface BasicTableProps {
  small?: boolean
}

export default function BasicTable({ small = false }: BasicTableProps) {
    const navigate = useNavigate()
    const [equipment, setEquipment] = useState<Equipment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    // Confirm dialog state
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean
        equipmentId: number | null
        equipmentName: string
    }>({
        isOpen: false,
        equipmentId: null,
        equipmentName: ''
    })

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                console.log('API_BASE_URL:', API_BASE_URL)
                console.log('Fetching from:', `${API_BASE_URL}/equipment`)
                
                const response = await fetch(`${API_BASE_URL}/equipment`)

                console.log('Response status:', response.status)
                console.log('Response headers:', [...response.headers.entries()])

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data: Equipment[] = await response.json()
                setEquipment(data)
            } catch (err) {
                console.error('Fetch error:', err)
                setError(err instanceof Error ? err.message : 'Failed to fetch equipment')
            } finally {
                setLoading(false)
            }
        }

        fetchEquipment()
    }, [])

    // Open confirmation dialog
    const handleDeleteClick = (id: number, name: string) => {
        setConfirmDialog({
            isOpen: true,
            equipmentId: id,
            equipmentName: name
        })
    }

    // Confirm deletion
    const handleConfirmDelete = async () => {
        if (!confirmDialog.equipmentId) return

        try {
            const response = await fetch(`${API_BASE_URL}/equipment/${confirmDialog.equipmentId}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Remove from local state
            setEquipment(prevEquipment => 
                prevEquipment.filter(item => item.id !== confirmDialog.equipmentId)
            )

            // Close dialog
            setConfirmDialog({
                isOpen: false,
                equipmentId: null,
                equipmentName: ''
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete equipment')
            // Close dialog even on error
            setConfirmDialog({
                isOpen: false,
                equipmentId: null,
                equipmentName: ''
            })
        }
    }

    // Cancel deletion
    const handleCancelDelete = () => {
        setConfirmDialog({
            isOpen: false,
            equipmentId: null,
            equipmentName: ''
        })
    }

    const handleEdit = (item: Equipment) => {
        navigate(`/equipment/edit/${item.id}`)
    }

    if (loading) return <div className="text-white text-center p-4">Loading equipment...</div>
    if (error) return <div className="text-red-400 text-center p-4">Error: {error}</div>

    return (
        <>
            <TableContainer 
                component={Paper} 
                className="bg-gray-800 shadow-xl"
                sx={{ backgroundColor: '#1f2937', '& .MuiPaper-root': { backgroundColor: '#1f2937', boxShadow: 'none' } }}
            >
                <Table sx={{ minWidth: 450 }} size={small ? "small" : "medium"}  aria-label="equipment table">
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
                                Name
                            </TableCell>
                            <TableCell 
                                className="text-white font-bold"
                                sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                            >
                                Location
                            </TableCell>
                            <TableCell 
                                align={small ? "right" : "left"}
                                className="text-white font-bold"
                                sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                            >
                                Status
                            </TableCell>
                            {!small && (
                            <TableCell 
                                sx={{ 
                                    borderBottom: '1px solid #4b5563', 
                                    backgroundColor: '#374151',
                                    width: '120px'
                                }}
                            />
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {equipment.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-700"
                                sx={{  '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#374151' } }}
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
                                    {item.name}
                                </TableCell>
                                <TableCell 
                                    className="text-gray-100"
                                    sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                >
                                    {item.location}
                                </TableCell>
                                <TableCell 
                                    align={small ? "right" : "left"}
                                    className="text-gray-100"
                                    sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                                >
                                    <StatusBadge status={item.status} small={small} />
                                </TableCell>
                                {!small && (
                                <TableCell 
                                    align="right"
                                    sx={{ borderBottom: '1px solid #4b5563' }}
                                >
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                                            title={`Edit ${item.name}`}
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(item.id, item.name)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                                            title={`Delete ${item.name}`}
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
                title="Delete Equipment"
                message={`Are you sure you want to delete "${confirmDialog.equipmentName}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                variant="danger"
            />
        </>
    )
}