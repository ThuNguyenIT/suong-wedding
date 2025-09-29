import { getImagesAction } from '@/app/actions'
import { Wrapper } from './wrapper'
import { AuthGuard } from '@/components/admin/AuthGuard'

export default async function AdminSystem() {
  const images = await getImagesAction()

  return (
    <AuthGuard>
      <div className='min-h-screen bg-background'>
        <div className='container mx-auto py-8 px-4'>
          <Wrapper initialImages={images} />
        </div>
      </div>
    </AuthGuard>
  )
}
