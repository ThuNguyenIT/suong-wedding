'use client'

import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import EmblaCarousel from './embla-carousel'
import BannerSlide from './banner-slide'
import BannerSlideMobile from './banner-slide-mobile'
import { useIsMobile } from '@/hooks/useMobile'
import { Image } from '@/types'
import { Position } from '@/constants/enum'

export default function BannerSlider({ images }: { images: Image[] }) {
  const isMobile = useIsMobile()
  const position = isMobile ? Position.Mobile : Position.Desktop

  const listImages = useMemo(
    () => images.filter((image) => image.position === position),
    [images, position]
  )

  console.log('listImages', listImages)

  const Slider = isMobile ? BannerSlideMobile : BannerSlide

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={isMobile ? 'mobile' : 'desktop'}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoothness
            staggerChildren: 0.1,
          },
        }}
        exit={{
          opacity: 0,
          y: -30,
          scale: 1.05,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }}
        className='w-full h-full'
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <EmblaCarousel autoplayDelay={isMobile ? 6000 : 5000}>
            {listImages?.map((image, index) => (
              <motion.div
                key={`${isMobile ? 'mobile' : 'desktop'}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 1.1,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
              >
                <Slider index={index} image={image} />
              </motion.div>
            ))}
          </EmblaCarousel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
