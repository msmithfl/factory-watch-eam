// Match C# enum names exactly as they're serialized
export type EquipmentStatus = 'Operational' | 'UnderMaintenance' | 'OutOfService' | 'Decommissioned'

// Helper function to get Tailwind color classes based on status
export function getStatusColor(status: EquipmentStatus): string {
  switch (status) {
    case 'Operational': return 'bg-green-600 text-white'
    case 'UnderMaintenance': return 'bg-orange-600 text-white'
    case 'OutOfService': return 'bg-red-600 text-white'
    case 'Decommissioned': return 'bg-gray-600 text-white'
    default: return 'bg-black text-white'
  }
}

// Helper function to display user-friendly status names
export function getStatusDisplay(status: EquipmentStatus): string {
  switch (status) {
    case 'Operational': return 'Operational'
    case 'UnderMaintenance': return 'Under Maintenance'
    case 'OutOfService': return 'Out of Service'
    case 'Decommissioned': return 'Decommissioned'
    default: return status
  }
}

// Helper function to get dot color classes based on status
export function getDotColor(status: EquipmentStatus): string {
  switch (status) {
    case 'Operational': return 'bg-green-500'
    case 'UnderMaintenance': return 'bg-orange-500'
    case 'OutOfService': return 'bg-red-500'
    case 'Decommissioned': return 'bg-gray-500'
    default: return 'bg-black'
  }
}