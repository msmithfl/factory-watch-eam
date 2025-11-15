// types/Equipment.ts
export interface Equipment {
  id: number
  name: string
  location: string
  status: EquipmentStatus
  lastMaintenanceDate: string
  nextMaintenanceDate?: string
  description?: string
  createdAt: string
}

export interface CreateEquipmentForm {
  name: string
  location: string
  status: EquipmentStatus
  description: string
}

export interface EditEquipmentForm {
  name: string
  location: string
  status: EquipmentStatus
  description: string
}

export type EquipmentStatus = 'Operational' | 'UnderMaintenance' | 'OutOfService' | 'Decommissioned'