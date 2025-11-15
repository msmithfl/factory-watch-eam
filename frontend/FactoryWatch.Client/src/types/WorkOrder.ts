export interface WorkOrder {
    id: number
    equipmentId: number
    equipmentName: string  // Added - from DTO
    title: string
    description?: string  // Made optional
    assignedTo?: string   // Made optional
    isCompleted: boolean
    completedDate?: string  // Fixed: was completeDate
    createdAt: string
}