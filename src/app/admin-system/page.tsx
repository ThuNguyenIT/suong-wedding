import { getImagesAction } from '@/app/actions'
import { Wrapper } from './wrapper'

export default async function AdminSystem() {
  const images = await getImagesAction()

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto py-8 px-4'>
        <Wrapper initialImages={images} />
      </div>
    </div>
  )
}
