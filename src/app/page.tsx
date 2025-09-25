import BannerSlider from '@/components/banner-slider'
import { getImagesActiveAction } from './actions'

export default async function Home() {
  const images = await getImagesActiveAction()
  return (
    <div className='min-h-screen'>
      <div className='relative h-screen w-full overflow-hidden'>
        <BannerSlider images={images} />
      </div>
    </div>
  )
}
