'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Upload, Check, X, CircleCheckBig, CircleOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmationTooltip } from '@/components/ui/confirmation-tooltip'
import { PendingImage } from './types'

interface PendingImageRowProps {
  pendingImage: PendingImage
  isPending: boolean
  onFileChange: (file: File, id: number) => void
  onCommit: (image: PendingImage) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, updates: Partial<PendingImage>) => void
}

export function PendingImageRow({
  pendingImage,
  isPending,
  onFileChange,
  onCommit,
  onDelete,
  onUpdate,
}: PendingImageRowProps) {
  return (
    <motion.tr
      key={pendingImage.id}
      className='bg-muted/30 border-b transition-colors hover:bg-muted/50'
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <td className='font-mono text-sm p-4'>{pendingImage.id}</td>
      <td className='p-4'>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.2 }}>
          {pendingImage.path ? (
            <Image
              src={pendingImage.path}
              className='h-20 w-20 rounded-lg object-cover border'
              alt='preview'
              width={64}
              height={64}
            />
          ) : (
            <div className='h-20 w-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center'>
              <Label htmlFor={`file-${pendingImage.id}`} className='cursor-pointer'>
                <Upload className='h-6 w-6 text-muted-foreground' />
              </Label>
              <Input
                id={`file-${pendingImage.id}`}
                type='file'
                className='hidden'
                onChange={(e) => e.target.files?.[0] && onFileChange(e.target.files[0], pendingImage.id)}
                accept='image/*'
              />
            </div>
          )}
        </motion.div>
      </td>
      <td className='p-4'>
        <Input
          placeholder='Nhập link FB...'
          value={pendingImage.redirect_url || ''}
          onChange={(e) => onUpdate(pendingImage.id, { redirect_url: e.target.value })}
          className='w-full min-w-[150px]'
        />
      </td>
      <td className='p-4'>
        <Button
          size='icon'
          onClick={() => onUpdate(pendingImage.id, { is_active: !pendingImage.is_active })}
          className='w-full'
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className='w-5 h-5 animate-spin text-gray-500' />
          ) : pendingImage.is_active ? (
            <CircleCheckBig className='w-5 h-5 text-green-500' />
          ) : (
            <CircleOff className='w-5 h-5 text-red-500' />
          )}
        </Button>
      </td>
      <td className='p-4'>
        <div className='flex gap-1'>
          <Button size='icon' onClick={() => onCommit(pendingImage)} className='gap-1' disabled={isPending}>
            {isPending ? (
              <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
            ) : (
              <Check className='h-5 w-5 text-green-500' />
            )}
          </Button>
          <ConfirmationTooltip
            onConfirm={() => onDelete(pendingImage.id)}
            onCancel={() => {}}
            message={`Bạn có chắc chắn muốn hủy thêm hình ảnh ID ${pendingImage.id}?`}
            confirmText='Hủy'
            cancelText='Không'
          >
            <Button size='icon' className='gap-1' disabled={isPending}>
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
              ) : (
                <X className='h-5 w-5 text-red-500' />
              )}
            </Button>
          </ConfirmationTooltip>
        </div>
      </td>
    </motion.tr>
  )
}
