import { Image as ImageMeta } from '@/types'
import { Position } from '@/constants/enum'

export interface PendingImage extends Omit<ImageMeta, 'id'> {
  id: number
}

export interface ImageTableProps {
  images: ImageMeta[]
  onRefresh?: () => void
  loading: boolean
}

export interface ImageComponentProps {
  position: Position
  banners: ImageMeta[]
  onRefresh?: () => void
}
