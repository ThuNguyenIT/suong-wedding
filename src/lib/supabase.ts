import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: number
          position: 'desktop' | 'mobile'
          path: string
          redirect_url: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: number
          position: 'desktop' | 'mobile'
          path: string
          redirect_url: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          position?: 'desktop' | 'mobile'
          path?: string
          redirect_url?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
