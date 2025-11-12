import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const getApiUrl = () => {
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:5141'
    : 'https://factory-watch-api.up.railway.app';
};

const API_BASE_URL = getApiUrl();

// Helper function to get Tailwind color classes based on status
function getStatusColor(status: string): string {
  switch (status) {
    case 'Operational': return 'bg-green-600 text-white'
    case 'UnderMaintenance': return 'bg-orange-600 text-white'
    case 'OutOfService': return 'bg-red-600 text-white'
    case 'Decommissioned': return 'bg-gray-600 text-white'
    default: return 'bg-black text-white'
  }
}

// Helper function to display user-friendly status names
function getStatusDisplay(status: string): string {
  switch (status) {
    case 'Operational': return 'Operational'
    case 'UnderMaintenance': return 'Under Maintenance'
    case 'OutOfService': return 'Out of Service'
    case 'Decommissioned': return 'Decommissioned'
    default: return status
  }
}

// Helper function to get dot color classes based on status
function getDotColor(status: string): string {
  switch (status) {
    case 'Operational': return 'bg-green-500'
    case 'UnderMaintenance': return 'bg-orange-500'
    case 'OutOfService': return 'bg-red-500'
    case 'Decommissioned': return 'bg-gray-500'
    default: return 'bg-black'
  }
}

interface Equipment {
  id: number
  name: string
  location: string
  status: string
  lastMaintenanceDate: string
  nextMaintenanceDate?: string
  description?: string
  createdAt: string
}

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
                        <TableCell 
                            align="left"
                            className="text-white font-bold"
                            sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                        >
                            Name
                        </TableCell>
                        <TableCell 
                            align="right"
                            className="text-white font-bold"
                            sx={{ color: 'white', borderBottom: '1px solid #4b5563', backgroundColor: '#374151', fontWeight: 'bold' }}
                        >
                            Location
                        </TableCell>
                        <TableCell 
                            align="right"
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
                            <TableCell 
                                align="left"
                                className="text-gray-100"
                                sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                            >
                                {item.name}
                            </TableCell>
                            <TableCell 
                                align="right"
                                className="text-gray-100"
                                sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                            >
                                {item.location}
                            </TableCell>
                            <TableCell 
                                align="right"
                                className="text-gray-100"
                                sx={{ color: '#f3f4f6', borderBottom: '1px solid #4b5563' }}
                            >
                                {small ? (
                                    <div className="text-right">
                                        <div 
                                            className={`w-3 h-3 rounded-full ${getDotColor(item.status)} inline-block`}
                                            title={getStatusDisplay(item.status)}
                                        ></div>
                                    </div>
                                ) : (
                                    // Regular version: colored badge with text
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {getStatusDisplay(item.status)}
                                    </span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}