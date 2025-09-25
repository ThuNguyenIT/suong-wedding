'use client'

import { motion } from 'framer-motion'
import { Monitor, Smartphone, RefreshCw, Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Position } from '@/constants/enum'

interface ImageTableHeaderProps {
  position: Position
  isPending: boolean
  onRefresh: () => void
  onAddNew: () => void
}

export function ImageTableHeader({ position, isPending, onRefresh, onAddNew }: ImageTableHeaderProps) {
  const Icon = position === Position.Desktop ? Monitor : Smartphone

  return (
    <CardHeader>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex items-center space-x-2'>
          <Icon className='h-5 w-5 text-muted-foreground' />
          <CardTitle className='text-xl'>{position.toUpperCase()}</CardTitle>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className='flex gap-2 flex-wrap'
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='outline'
              onClick={onRefresh}
              size='sm'
              className='gap-1 cursor-pointer'
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin text-green-500' />
              ) : (
                <RefreshCw className='h-5 w-5 text-green-500' />
              )}
              Làm mới
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='secondary'
              onClick={onAddNew}
              size='sm'
              className='gap-1 cursor-pointer'
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin text-blue-500' />
              ) : (
                <Plus className='h-5 w-5 text-blue-500' />
              )}
              Thêm mới
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </CardHeader>
  )
}
