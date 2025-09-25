import { useState, useTransition, useCallback, useEffect } from 'react'
import { uploadFileAction, addImageAction, toggleImageAction, deleteImageAction } from '@/app/actions'
import { toastError, toastSuccess } from '@/lib/toast'
import { Position } from '@/constants/enum'
import { FACEBOOK_URL } from '@/constants/common'
import { Image as ImageMeta } from '@/types'
import { PendingImage } from '@/components/admin/types'

export function useImageTable(initialBanners: ImageMeta[], position: Position) {
  const [rows, setRows] = useState<ImageMeta[]>([])
  const [pending, setPending] = useState<PendingImage[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setRows(initialBanners)
  }, [initialBanners])

  const activeImages = rows.filter((image) => image.position === position)

  const addNewRow = useCallback(() => {
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
  }, [position])

  const handleFileUpload = useCallback(
    async (file: File, id: number) => {
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
    },
    [startTransition]
  )

  const commitPendingImage = useCallback(
    async (row: PendingImage) => {
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
    },
    [startTransition]
  )

  const toggleImageStatus = useCallback(
    async (id: number) => {
      startTransition(async () => {
        try {
          const updated = await toggleImageAction(id)
          if (updated) {
            toastSuccess(`${updated.is_active ? 'Bật' : 'Tắt'} ID ${id} thành công`)
            setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)))
          } else {
            toastError(`Cập nhật trạng thái cho ID ${id} thất bại`)
          }
        } catch (error) {
          console.error('Toggle status error:', error)
          toastError('Cập nhật trạng thái thất bại')
        }
      })
    },
    [startTransition]
  )

  const removeImage = useCallback(
    async (id: number, isPendingImage = false) => {
      if (isPendingImage) {
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
    },
    [startTransition]
  )

  const updatePendingImage = useCallback((id: number, updates: Partial<PendingImage>) => {
    setPending((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)))
  }, [])

  return {
    rows,
    pending,
    activeImages,
    isPending,
    addNewRow,
    handleFileUpload,
    commitPendingImage,
    toggleImageStatus,
    removeImage,
    updatePendingImage,
  }
}
