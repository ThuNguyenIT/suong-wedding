'use client'

import { useState, useMemo, useTransition, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  X,
  Plus,
  Trash2,
  Upload,
  Monitor,
  Smartphone,
  CircleCheckBig,
  CircleOff,
  Loader2,
  RefreshCw,
} from 'lucide-react'

import { uploadFileAction, addImageAction, toggleImageAction, deleteImageAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toastError, toastSuccess } from '@/lib/toast'
import { Position } from '@/constants/enum'
import { FACEBOOK_URL } from '@/constants/common'
import { Image as ImageMeta } from '@/types'
import { LoadingBackDrop } from '../loading'

function ImageComponent({
  position,
  banners,
  onRefresh,
}: {
  position: Position
  banners: ImageMeta[]
  onRefresh?: () => void
}) {
  const [rows, setRows] = useState<ImageMeta[]>([])
  const [pending, setPending] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setRows(banners)
  }, [banners])

  const listImage = useMemo(() => rows?.filter((i) => i.position === position), [rows, position])

  const addRow = () => {
    setPending((prev) => [
      ...prev,
      {
        id: Date.now(),
        position,
        path: null,
        redirect_url: FACEBOOK_URL,
        is_active: true,
      },
    ])
  }

  const handleFileChange = async (file: File, id: number) => {
    if (!file) {
      toastError('Không có file được chọn')
      return
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      toastError('File quá lớn. Kích thước tối đa là 10MB')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toastError('Chỉ hỗ trợ file hình ảnh (JPEG, PNG, WebP, GIF)')
      return
    }

    startTransition(async () => {
      try {
        const url = await uploadFileAction(file)
        setPending((prev) => prev.map((r) => (r.id === id ? { ...r, path: url } : r)))
      } catch (error) {
        console.error('Upload file error:', error)
        toastError('Upload file thất bại')
      }
    })
  }

  const handleCommit = async (row: any) => {
    if (!row?.path) {
      toastError('Hình ảnh không được để trống')
      return
    }

    startTransition(async () => {
      try {
        const newImg = await addImageAction(row as ImageMeta)
        if (newImg) {
          toastSuccess(`Thêm ID ${newImg.id} thành công`)
          setRows((prev) => [...prev, newImg])
          setPending((prev) => prev.filter((r) => r.id !== row.id))
        } else {
          toastError(`Thêm ID thất bại`)
        }
      } catch (error) {
        console.error('Add image error:', error)
        toastError('Thêm ID thất bại')
      }
    })
  }

  const handleToggleStatus = async (id: number) => {
    startTransition(async () => {
      try {
        const updated = await toggleImageAction(id)
        if (updated) {
          toastSuccess(`${updated.is_active ? 'Bật' : 'Tắt'} ID ${id} thành công`)
          setRows((prev) => {
            const newRows = prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
            return newRows
          })
        } else {
          toastError(`Cập nhật trạng thái cho ID ${id} thất bại`)
        }
      } catch (error) {
        console.error('Toggle status error:', error)
        toastError('Cập nhật trạng thái thất bại')
      }
    })
  }

  const handleDelete = async (id: number, isPending = false) => {
    if (isPending) {
      setPending((prev) => prev.filter((r) => r.id !== id))
    } else {
      startTransition(async () => {
        try {
          const isDeleted = await deleteImageAction(id)
          if (isDeleted) {
            setRows((prev) => prev.filter((r) => r.id !== id))
            toastSuccess(`Xóa ID ${id} thành công`)
          } else {
            toastError(`Xóa ID ${id} thất bại`)
          }
        } catch (error) {
          console.error('Delete image error:', error)
          toastError('Xóa image thất bại')
        }
      })
    }
  }

  const handleRefresh = useCallback(() => {
    onRefresh?.()
  }, [onRefresh])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className='overflow-hidden'>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex items-center space-x-2'>
              {position === Position.Desktop ? (
                <Monitor className='h-5 w-5 text-muted-foreground' />
              ) : (
                <Smartphone className='h-5 w-5 text-muted-foreground' />
              )}
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
                  onClick={handleRefresh}
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
                  onClick={addRow}
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
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className='overflow-x-auto'>
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
                    {listImage?.length ? (
                      listImage.map((r, i) => (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          layout
                          className='border-b transition-colors hover:bg-muted/50'
                        >
                          <TableCell className='font-mono text-sm'>{r.id}</TableCell>
                          <TableCell>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                              className='relative'
                            >
                              <Image
                                src={r.path || ''}
                                alt='preview'
                                className='h-20 w-20 rounded-lg object-cover border'
                                width={64}
                                height={64}
                                priority={i < 2}
                              />
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <div className='w-full max-w-[200px] truncate' title={r.redirect_url || ''}>
                              {r.redirect_url || ''}
                            </div>
                          </TableCell>
                          <TableCell className='text-center'>
                            <Button
                              size='icon'
                              onClick={() => handleToggleStatus(r.id)}
                              className='w-full h-full'
                              disabled={isPending}
                            >
                              {isPending ? (
                                <Loader2 className='w-5 h-5 animate-spin text-gray-500' />
                              ) : r.is_active ? (
                                <CircleCheckBig className='w-5 h-5 text-green-500' />
                              ) : (
                                <CircleOff className='w-5 h-5 text-red-500' />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className='text-center'>
                            <div className='flex gap-1'>
                              <Button
                                size='icon'
                                onClick={() => handleDelete(r.id)}
                                className='w-full h-full'
                                disabled={isPending}
                              >
                                {isPending ? (
                                  <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
                                ) : (
                                  <Trash2 className='h-5 w-5 text-red-500' />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : pending.length ? (
                      <></>
                    ) : (
                      <motion.tr>
                        <TableCell colSpan={5} className='text-center'>
                          Không có dữ liệu
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {pending.map((r) => (
                      <motion.tr
                        key={r.id}
                        className='bg-muted/30 border-b transition-colors hover:bg-muted/50'
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <TableCell className='font-mono text-sm'>{r.id}</TableCell>
                        <TableCell>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                          >
                            {r.path ? (
                              <Image
                                src={r.path || ''}
                                className='h-20 w-20 rounded-lg object-cover border'
                                alt='preview'
                                width={64}
                                height={64}
                              />
                            ) : (
                              <div className='h-20 w-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center'>
                                <Label htmlFor={`file-${r.id}`} className='cursor-pointer'>
                                  <Upload className='h-6 w-6 text-muted-foreground' />
                                </Label>
                                <Input
                                  id={`file-${r.id}`}
                                  type='file'
                                  className='hidden'
                                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0], r.id)}
                                  accept='image/*'
                                />
                              </div>
                            )}
                          </motion.div>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder='Nhập link FB...'
                            value={r.redirect_url || ''}
                            onChange={(e) =>
                              setPending((prev) =>
                                prev.map((x) => (x.id === r.id ? { ...x, redirect_url: e.target.value } : x))
                              )
                            }
                            className='w-full min-w-[150px]'
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size='icon'
                            onClick={() =>
                              setPending((prev) =>
                                prev.map((x) => (x.id === r.id ? { ...x, is_active: !x.is_active } : x))
                              )
                            }
                            className='w-full'
                            disabled={isPending}
                          >
                            {isPending ? (
                              <Loader2 className='w-5 h-5 animate-spin text-gray-500' />
                            ) : r.is_active ? (
                              <CircleCheckBig className='w-5 h-5 text-green-500' />
                            ) : (
                              <CircleOff className='w-5 h-5 text-red-500' />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className='flex gap-1'>
                            <Button size='icon' onClick={() => handleCommit(r)} className='gap-1' disabled={isPending}>
                              {isPending ? (
                                <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
                              ) : (
                                <Check className='h-5 w-5 text-green-500' />
                              )}
                            </Button>
                            <Button
                              size='icon'
                              onClick={() => handleDelete(r.id, true)}
                              className='gap-1'
                              disabled={isPending}
                            >
                              {isPending ? (
                                <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
                              ) : (
                                <X className='h-5 w-5 text-red-500' />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ImageTable({
  images = [],
  onRefresh,
  loading,
}: {
  images: ImageMeta[]
  onRefresh?: () => void
  loading: boolean
}) {
  return (
    <>
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
              <ImageComponent position={Position.Desktop} banners={images} onRefresh={onRefresh} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ImageComponent position={Position.Mobile} banners={images} onRefresh={onRefresh} />
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  )
}
