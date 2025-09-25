import BannerSlider from '@/components/banner-slider'
import { getImagesAction } from './actions'

export default async function Home() {
  const images = await getImagesAction()
  return (
    <div className='min-h-screen'>
      <div className='relative h-screen w-full overflow-hidden'>
        <BannerSlider images={images} />
      </div>
    </div>
  )
}
