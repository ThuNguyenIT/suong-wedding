'use server'

import { put, del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

import { Image as ImageMeta } from '@/types'

export async function uploadFileAction(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    })
    return blob.url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Failed to upload file')
  }
}

export async function addImageAction(image: ImageMeta) {
  try {
    const { data, error } = await supabase
      .from('images')
      .insert([
        {
          id: image.id,
          position: image.position,
          path: image.path,
          redirect_url: image.redirect_url,
          is_active: image.is_active ?? true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      throw new Error(`Failed to add image: ${error.message}`)
    }

    // Revalidate trang chủ để cập nhật banner
    revalidatePath('/')
    revalidatePath('/admin-system')

    return data
  } catch (error) {
    console.error('❌ Error adding image:', error)
    throw new Error('Failed to add image')
  }
}

export async function toggleImageAction(id: number) {
  try {
    const { data: current, error: fetchError } = await supabase.from('images').select('is_active').eq('id', id).single()

    if (fetchError) {
      console.error('❌ Error fetching current status:', fetchError)
      throw new Error(`Failed to fetch image: ${fetchError.message}`)
    }

    const { data, error } = await supabase
      .from('images')
      .update({ is_active: !current.is_active })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      throw new Error(`Failed to toggle image: ${error.message}`)
    }

    revalidatePath('/')
    revalidatePath('/admin-system')

    return data
  } catch (error) {
    console.error('❌ Error toggling image:', error)
    throw new Error('Failed to toggle image')
  }
}

export async function deleteImageAction(id: number) {
  try {
    const { data: target, error: fetchError } = await supabase.from('images').select('path').eq('id', id).single()

    if (fetchError) {
      console.error('❌ Error fetching image for deletion:', fetchError)
      throw new Error(`Failed to fetch image: ${fetchError.message}`)
    }

    if (target?.path) {
      try {
        const url = new URL(target.path)
        const pathname = url.pathname.split('/').pop()
        if (pathname) {
          await del(pathname)
        }
      } catch (deleteError) {
        console.error('⚠️ Error deleting blob file:', deleteError)
      }
    }

    const { error } = await supabase.from('images').delete().eq('id', id)

    if (error) {
      console.error('❌ Supabase error:', error)
      throw new Error(`Failed to delete image: ${error.message}`)
    }

    revalidatePath('/')
    revalidatePath('/admin-system')

    return id
  } catch (error) {
    console.error('❌ Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}

export async function updateImageAction(id: number, updates: Partial<ImageMeta>) {
  try {
    const { data, error } = await supabase.from('images').update(updates).eq('id', id).select().single()

    if (error) {
      console.error('❌ Supabase error:', error)
      throw new Error(`Failed to update image: ${error.message}`)
    }

    revalidatePath('/')
    revalidatePath('/admin-system')

    return data
  } catch (error) {
    console.error('❌ Error updating image:', error)
    throw new Error('Failed to update image')
  }
}

export async function getImagesAction(): Promise<ImageMeta[]> {
  try {
    const { data, error } = await supabase.from('images').select('*').order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase error:', error)
      throw new Error(`Failed to fetch images: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error('❌ Error getting images:', error)
    throw new Error('Failed to get images')
  }
}

export async function getImagesActiveAction(): Promise<ImageMeta[]> {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase error:', error)
      throw new Error(`Failed to fetch images: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error('❌ Error getting images:', error)
    throw new Error('Failed to get images')
  }
}

export async function verifyAdminKeyAction(key: string): Promise<boolean> {
  try {
    const expectedKey = process.env.NEXT_PUBLIC_PRIMARY_KEY

    if (!key || key !== expectedKey) {
      return false
    }

    return true
  } catch (error) {
    console.error('❌ Error verifying admin key:', error)
    return false
  }
}
