import { getStatusColor, getStatusDisplay, getDotColor } from '../utils/equipmentStatus'

// Status Badge Component (reusable)
interface StatusBadgeProps {
  status: string
  small?: boolean
}

export function StatusBadge({ status, small = false }: StatusBadgeProps) {
  if (small) {
    return (
      <div className="text-left pl-4">
        <div 
          className={`w-3 h-3 rounded-full ${getDotColor(status)} inline-block`}
          title={getStatusDisplay(status)}
        />
      </div>
    )
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusDisplay(status)}
    </span>
  )
}