'use client'

import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Position } from '@/constants/enum'
import { LoadingBackDrop } from '../loading'
import { useImageTable } from '@/hooks/useImageTable'
import { ImageTableHeader } from './ImageTableHeader'
import { ImageTableBody } from './ImageTableBody'
import { ImageTableProps, ImageComponentProps } from './types'

const ImageComponent = memo(function ImageComponent({ position, banners, onRefresh }: ImageComponentProps) {
  const {
    activeImages,
    pending,
    isPending,
    addNewRow,
    handleFileUpload,
    commitPendingImage,
    toggleImageStatus,
    removeImage,
    updatePendingImage,
  } = useImageTable(banners, position)

  const handleRefresh = useCallback(() => {
    onRefresh?.()
  }, [onRefresh])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className='overflow-hidden'>
        <ImageTableHeader position={position} isPending={isPending} onRefresh={handleRefresh} onAddNew={addNewRow} />
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className='overflow-x-auto'>
              <ImageTableBody
                activeImages={activeImages}
                pendingImages={pending}
                isPending={isPending}
                onToggleStatus={toggleImageStatus}
                onDelete={removeImage}
                onFileChange={handleFileUpload}
                onCommit={commitPendingImage}
                onUpdatePending={updatePendingImage}
              />
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export const ImageTable = memo(function ImageTable({ images = [], onRefresh, loading }: ImageTableProps) {
  const imgDesktop = images.filter((i) => i.position === Position.Desktop)
  const imgMobile = images.filter((i) => i.position === Position.Mobile)

  return (
    <motion.div
      className='space-y-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {loading ? (
        <LoadingBackDrop />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ImageComponent position={Position.Desktop} banners={imgDesktop} onRefresh={onRefresh} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ImageComponent position={Position.Mobile} banners={imgMobile} onRefresh={onRefresh} />
          </motion.div>
        </>
      )}
    </motion.div>
  )
})
