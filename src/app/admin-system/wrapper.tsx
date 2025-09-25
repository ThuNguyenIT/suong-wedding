'use client'

import { useState, useTransition, useEffect } from 'react'
import { ImageTable } from '@/components/admin/table'
import { getImagesAction } from '@/app/actions'
import { Image as ImageMeta } from '@/types'

interface WrapperProps {
  initialImages: ImageMeta[]
}

export function Wrapper({ initialImages }: WrapperProps) {
  const [images, setImages] = useState<ImageMeta[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setImages(initialImages)
  }, [initialImages])

  const handleRefresh = async () => {
    startTransition(async () => {
      try {
        const refreshedImages = await getImagesAction()
        setImages(refreshedImages)
      } catch (error) {
        console.error('Error refreshing images:', error)
      }
    })
  }

  return <ImageTable images={images} onRefresh={handleRefresh} loading={isPending} />
}
