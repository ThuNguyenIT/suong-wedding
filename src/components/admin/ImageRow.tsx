'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Trash2, CircleCheckBig, CircleOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfirmationTooltip } from '@/components/ui/confirmation-tooltip'
import { Image as ImageMeta } from '@/types'

interface ImageRowProps {
  image: ImageMeta
  index: number
  isPending: boolean
  onToggleStatus: (id: number) => void
  onDelete: (id: number) => void
}

export function ImageRow({ image, index, isPending, onToggleStatus, onDelete }: ImageRowProps) {
  return (
    <motion.tr
      key={image.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      layout
      className='border-b transition-colors hover:bg-muted/50'
    >
      <td className='font-mono text-sm p-4'>{image.id}</td>
      <td className='p-4'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className='relative'
        >
          <Image
            src={image.path || ''}
            alt='preview'
            className='h-20 w-20 rounded-lg object-cover border'
            width={64}
            height={64}
            priority={index < 2}
          />
        </motion.div>
      </td>
      <td className='p-4'>
        <div className='w-full max-w-[200px] truncate' title={image.redirect_url || ''}>
          {image.redirect_url || ''}
        </div>
      </td>
      <td className='text-center p-4'>
        <Button size='icon' onClick={() => onToggleStatus(image.id)} className='w-full h-full' disabled={isPending}>
          {isPending ? (
            <Loader2 className='w-5 h-5 animate-spin text-gray-500' />
          ) : image.is_active ? (
            <CircleCheckBig className='w-5 h-5 text-green-500' />
          ) : (
            <CircleOff className='w-5 h-5 text-red-500' />
          )}
        </Button>
      </td>
      <td className='text-center p-4'>
        <div className='flex gap-1'>
          <ConfirmationTooltip
            onConfirm={() => onDelete(image.id)}
            onCancel={() => {}}
            confirmText='Xóa'
            cancelText='Hủy'
          >
            <Button size='icon' className='w-full h-full' disabled={isPending}>
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
              ) : (
                <Trash2 className='h-5 w-5 text-red-500' />
              )}
            </Button>
          </ConfirmationTooltip>
        </div>
      </td>
    </motion.tr>
  )
}
