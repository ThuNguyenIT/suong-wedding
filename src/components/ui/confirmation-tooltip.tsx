'use client'

import { Check, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

interface ConfirmationTooltipProps {
  children: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
  message?: string
  confirmText?: string
  cancelText?: string
}

export function ConfirmationTooltip({
  children,
  onConfirm,
  onCancel,
  message,
  confirmText = 'Xóa',
  cancelText = 'Hủy',
}: ConfirmationTooltipProps) {
  const handleConfirm = () => {
    onConfirm()
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side='top'
          align='end'
          className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 p-3 min-w-[200px]'
        >
          <div className='relative'>
            {message && <div className='text-sm pr-16'>{message}</div>}
            <div className='absolute top-0 right-0 flex gap-1'>
              <button
                onClick={handleCancel}
                className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                title={cancelText}
              >
                <X className='w-4 h-4 text-gray-500 hover:text-red-500' />
              </button>
              <button
                onClick={handleConfirm}
                className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                title={confirmText}
              >
                <Check className='w-4 h-4 text-gray-500 hover:text-green-500' />
              </button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
