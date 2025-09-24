'use client'

import { AnimatePresence, motion } from 'framer-motion'

import EmblaCarousel from './embla-carousel'
import BannerSlide from './banner-slide'
import { BANNER_IMAGES } from '@/constants/common'

export default function BannerSlider() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <EmblaCarousel autoplayDelay={5000}>
          {Object.values(BANNER_IMAGES).map((image, index) => (
            <BannerSlide key={index} index={index} image={image} />
          ))}
        </EmblaCarousel>
      </motion.div>
    </AnimatePresence>
  )
}
