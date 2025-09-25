import { Position } from '@/constants/enum'

export interface Image {
  id: number
  position?: Position | null
  path?: string | null
  redirect_url?: string | null
  is_active?: boolean | null
}
