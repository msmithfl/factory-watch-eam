import { MdWarning, MdClose } from 'react-icons/md'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning' | 'info'
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null

  const variantStyles = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    },
    warning: {
      icon: 'text-yellow-500',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    },
    info: {
      icon: 'text-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    }
  }

  const styles = variantStyles[variant]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        {/* Modal */}
        <div 
          className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full border border-gray-600 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-600">
            <div className="flex items-center gap-3">
              <MdWarning size={24} className={styles.icon} />
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-300 text-base leading-relaxed">
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-600">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 transition-colors ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}