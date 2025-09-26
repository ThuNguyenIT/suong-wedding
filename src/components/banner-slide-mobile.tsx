'use client'

import { useState, useLayoutEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import { BRAND_NAME, ELEMENT_TYPES } from '@/constants/common'
import { useIsMobile } from '@/hooks/useMobile'
import { Image as ImageType } from '@/types'

interface BannerSlideMobileProps {
  index: number
  image: ImageType
}

const renderMobileElements = (elements: string) => {
  switch (elements) {
    case 'floating-rocks':
      return (
        <>
          <motion.div
            className='absolute top-8 left-4 w-16 h-10 bg-gray-800 rounded-lg transform rotate-12 opacity-80'
            initial={{ opacity: 0, y: 20, rotate: 12 }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
              y: [0, -8, 0],
              rotate: [12, 18, 12],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          <motion.div
            className='absolute top-16 right-8 w-12 h-8 bg-gray-700 rounded-lg transform -rotate-6 opacity-70'
            initial={{ opacity: 0, y: 20, rotate: -6 }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
              y: [0, 12, 0],
              rotate: [-6, -9, -6],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8,
            }}
          />
          <motion.div
            className='absolute top-16 left-1/4 w-20 h-10 bg-white rounded-full opacity-60'
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              x: [0, 15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
          />
        </>
      )

    case 'geometric':
      return (
        <>
          <motion.div
            className='absolute top-16 left-8 w-12 h-12 bg-white/20 rounded-full'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          <motion.div
            className='absolute top-32 right-16 w-8 h-8 bg-white/30 transform rotate-45'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.35, 0.2],
              scale: [0.8, 1.3, 0.8],
              rotate: [45, 225, 405],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.7,
            }}
          />
        </>
      )

    case 'waves':
      return (
        <>
          <motion.div
            className='absolute top-16 h-12 left-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-y-1'
            initial={{ opacity: 0, x: -100 }}
            animate={{
              x: [0, 60, 0],
              opacity: [0.15, 0.4, 0.15],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          <motion.div
            className='absolute top-32 h-10 left-0 w-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform skew-y-1'
            initial={{ opacity: 0, x: 100 }}
            animate={{
              x: [0, -50, 0],
              opacity: [0.1, 0.35, 0.1],
              scaleY: [1, 0.9, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8,
            }}
          />
        </>
      )

    case 'particles':
      return (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-2 h-2 bg-white/40 rounded-full'
              style={{
                top: `${20 + i * 15}%`,
                left: `${15 + i * 18}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 15, 0],
                scale: [0.8, 1.4, 0.8],
                opacity: [0.3, 0.9, 0.3],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.4,
              }}
            />
          ))}
        </>
      )

    case 'stars':
      return (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white rounded-full'
              style={{
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 1,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: Math.random() * 2,
              }}
            />
          ))}
          <motion.div
            className='absolute w-1 h-12 bg-gradient-to-b from-white to-transparent'
            style={{ top: '20%', left: '10%' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              x: [0, 180],
              y: [0, 60],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 2.5,
            }}
          />
        </>
      )

    case 'butterflies':
      return (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-4 h-3 bg-white/30 rounded-full'
              style={{
                top: `${30 + i * 20}%`,
                left: `${20 + i * 25}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                x: [0, 30, -20, 15, 0],
                y: [0, -15, 8, -12, 0],
                rotate: [0, 15, -15, 8, 0],
                scale: [0.8, 1.2, 0.9, 1.1, 0.8],
              }}
              transition={{
                duration: 10 + i * 0.5,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 1,
              }}
            />
          ))}
        </>
      )

    case 'aurora':
      return (
        <>
          <motion.div
            className='absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30'
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              x: [0, 15, -8, 0],
              scaleX: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          <motion.div
            className='absolute top-6 left-0 w-full h-16 bg-gradient-to-r from-pink-400/20 via-yellow-400/20 to-green-400/20'
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: [0.15, 0.7, 0.15],
              x: [0, -12, 18, 0],
              scaleX: [1, 0.9, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.2,
            }}
          />
        </>
      )

    case 'crystals':
      return (
        <>
          <motion.div
            className='absolute top-16 left-8 w-8 h-10 bg-white/25 transform rotate-45'
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{
              rotate: [45, 405, 45],
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute top-32 right-16 w-6 h-8 bg-white/30 transform rotate-12'
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{
              rotate: [12, 372, 12],
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white rounded-full'
              style={{
                top: `${25 + i * 20}%`,
                left: `${30 + i * 18}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </>
      )

    case 'bubbles':
      return (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-3 h-3 bg-white/20 rounded-full border border-white/30'
              style={{
                top: `${80 + i * 3}%`,
                left: `${10 + i * 12}%`,
              }}
              animate={{
                y: [0, -200],
                x: [0, Math.sin(i) * 15],
                scale: [0.5, 1.2, 0.8],
                opacity: [0.2, 0.6, 0],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.8,
              }}
            />
          ))}
          <motion.div
            className='absolute top-48 right-10 w-6 h-6 bg-white/15 rounded-full'
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )

    case 'lightning':
      return (
        <>
          <motion.div
            className='absolute top-16 left-1/4 w-1 h-20 bg-white'
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className='absolute top-24 right-1/3 w-1 h-16 bg-white transform rotate-12'
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3.5,
            }}
          />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-0.5 h-0.5 bg-yellow-300 rounded-full'
              style={{
                top: `${20 + i * 15}%`,
                left: `${25 + i * 15}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1 + 1,
              }}
            />
          ))}
        </>
      )

    case 'fireflies':
      return (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-yellow-300 rounded-full'
              style={{
                top: `${20 + i * 8}%`,
                left: `${10 + i * 10}%`,
              }}
              animate={{
                x: [0, Math.sin(i) * 20, 0],
                y: [0, Math.cos(i) * 15, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )

    case 'spirals':
      return (
        <>
          <motion.div
            className='absolute top-16 left-8 w-20 h-20 border-2 border-white/30 rounded-full'
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className='absolute top-24 right-8 w-16 h-16 border-2 border-white/25 rounded-full'
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-2 h-2 bg-white/40 rounded-full'
              style={{
                top: `${25 + i * 20}%`,
                left: `${30 + i * 25}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )

    default:
      return null
  }
}

export default function BannerSlideMobile({ index, image }: BannerSlideMobileProps) {
  const [randomElement, setRandomElement] = useState<string>('')
  const isMobile = useIsMobile()
  const shouldReduceMotion = useReducedMotion()

  // Optimized transition settings
  const getTransitionSettings = useCallback(() => {
    if (shouldReduceMotion) {
      return {
        duration: 0.3,
        ease: 'linear' as const,
      }
    }
    return {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    }
  }, [shouldReduceMotion])

  useLayoutEffect(() => {
    const randomIndex = Math.floor(Math.random() * ELEMENT_TYPES.length)
    setRandomElement(ELEMENT_TYPES[randomIndex])

    const interval = setInterval(() => {
      const newRandomIndex = Math.floor(Math.random() * ELEMENT_TYPES.length)
      setRandomElement(ELEMENT_TYPES[newRandomIndex])
    }, 15000) // Tăng lên 15 giây để tiết kiệm battery và cho phép người dùng thưởng thức effect lâu hơn

    return () => clearInterval(interval)
  }, [])

  if (!isMobile) {
    return null
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src={image.path || ''}
          alt={BRAND_NAME}
          className='object-cover'
          loading={index === 0 ? 'eager' : 'lazy'}
          fill
          priority={index === 0}
        />
      </div>

      {/* Mobile-optimized elements overlay */}
      <div className='absolute inset-0'>
        <motion.div
          key={randomElement}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ...getTransitionSettings(),
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          }}
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.2,
            transition: {
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          className='w-full h-full'
        >
          {renderMobileElements(randomElement)}
        </motion.div>
      </div>

      {/* Logo in top-left corner */}
      <div className='absolute top-4 left-8 z-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.5,
          }}
          className='relative'
        >
          {/* Background circle with gradient fade */}
          <div
            className='absolute inset-0 w-[120px] h-[120px] -top-[10px] -left-[10px] rounded-full'
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.75) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.1) 100%)',
            }}
          ></div>
          <Image
            src='/logo-without-bg.png'
            alt={BRAND_NAME}
            width={100}
            height={100}
            className='object-contain relative z-10'
            priority={index === 0}
          />
        </motion.div>
      </div>
    </div>
  )
}
