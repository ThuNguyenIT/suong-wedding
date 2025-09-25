'use client'

import { AnimatePresence } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ImageRow } from './ImageRow'
import { PendingImageRow } from './PendingImageRow'
import { Image as ImageMeta } from '@/types'
import { PendingImage } from './types'

interface ImageTableBodyProps {
  activeImages: ImageMeta[]
  pendingImages: PendingImage[]
  isPending: boolean
  onToggleStatus: (id: number) => void
  onDelete: (id: number, isPending?: boolean) => void
  onFileChange: (file: File, id: number) => void
  onCommit: (image: PendingImage) => void
  onUpdatePending: (id: number, updates: Partial<PendingImage>) => void
}

export function ImageTableBody({
  activeImages,
  pendingImages,
  isPending,
  onToggleStatus,
  onDelete,
  onFileChange,
  onCommit,
  onUpdatePending,
}: ImageTableBodyProps) {
  return (
    <Table className='min-w-[600px]'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[80px] whitespace-nowrap'>ID</TableHead>
          <TableHead className='whitespace-nowrap'>Hình ảnh</TableHead>
          <TableHead className='whitespace-nowrap'>Link</TableHead>
          <TableHead className='w-[100px] text-center whitespace-nowrap'>Trạng thái</TableHead>
          <TableHead className='w-[100px] text-center whitespace-nowrap'>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {activeImages.length > 0 ? (
            activeImages.map((image, index) => (
              <ImageRow
                key={image.id}
                image={image}
                index={index}
                isPending={isPending}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
            ))
          ) : pendingImages.length > 0 ? (
            <></>
          ) : (
            <tr>
              <TableCell colSpan={5} className='text-center'>
                Không có dữ liệu
              </TableCell>
            </tr>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {pendingImages.map((pendingImage) => (
            <PendingImageRow
              key={pendingImage.id}
              pendingImage={pendingImage}
              isPending={isPending}
              onFileChange={onFileChange}
              onCommit={onCommit}
              onDelete={(id) => onDelete(id, true)}
              onUpdate={onUpdatePending}
            />
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  )
}
