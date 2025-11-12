import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/api';

// Import the StatusBadge component
import { StatusBadge } from './StatusBadge';
import type { Equipment } from '../types/equipment';

// Add props interface
interface BasicTableProps {
  small?: boolean  // Optional prop, defaults to false
}

export default function BasicTable({ small = false }: BasicTableProps) {
    const [equipment, setEquipment] = useState<Equipment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    if (loading) return <div className="text-white text-center p-4">Loading equipment...</div>
    if (error) return <div className="text-red-400 text-center p-4">Error: {error}</div>

    return (
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
                            className="text-white font-bold"
                            sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                        >
                            Status
                        </TableCell>
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
                                className="text-gray-100"
                                sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                            >
                                <StatusBadge status={item.status} small={small} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}