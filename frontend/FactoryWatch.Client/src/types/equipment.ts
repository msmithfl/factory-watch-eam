export interface Equipment {
  id: number
  name: string
  location: string
  status: string
  lastMaintenanceDate: string
  nextMaintenanceDate?: string
  description?: string
  createdAt: string
}

export type EquipmentStatus = 'Operational' | 'UnderMaintenance' | 'OutOfService' | 'Decommissioned'