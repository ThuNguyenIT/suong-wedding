'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyAdminKeyAction } from '@/app/actions'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authenticate = async () => {
      try {
        const providedKey = prompt('Nhập mã xác thực để truy cập hệ thống quản trị')

        if (!providedKey) {
          router.replace('/')
          return
        }

        const isValid = await verifyAdminKeyAction(providedKey)

        if (isValid) {
          setIsAuthenticated(true)
        } else {
          alert('Mã xác thực không đúng!')
          router.replace('/')
        }
      } catch (error) {
        console.error('Authentication error:', error)
        alert('Có lỗi xảy ra trong quá trình xác thực!')
        router.replace('/')
      } finally {
        setIsLoading(false)
      }
    }

    authenticate()
  }, [router])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Đang chờ xác thực...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
