'use client'

import Image from 'next/image'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks'
import { cn } from '@/lib/utils'
import { ADDRESS_MAP, BRAND_NAME, FACEBOOK_URL, MOBILE_NUMBER, ZALO_URL } from '@/constants/common'

export default function RightSocial() {
  const isMobile = useIsMobile()

  const socialIcons = [
    {
      src: '/svg/phone.svg',
      alt: 'Phone',
      url: `tel:${MOBILE_NUMBER}`,
      tooltip: `Gọi ngay: ${MOBILE_NUMBER}`,
      handleClick: (url: string) => {
        if (isMobile) {
          window.location.href = url
        }
      },
    },
    {
      src: '/svg/facebook.svg',
      alt: 'Facebook',
      url: FACEBOOK_URL,
      tooltip: `Chat với ${BRAND_NAME} qua Facebook`,
      handleClick: (url: string) => window.open(url, '_blank'),
    },
    {
      src: '/svg/zalo.svg',
      alt: 'Zalo',
      url: ZALO_URL,
      tooltip: `Chat với ${BRAND_NAME} qua Zalo`,
      handleClick: (url: string) => window.open(url, '_blank'),
    },
    {
      src: '/svg/map.svg',
      alt: 'Map',
      url: ADDRESS_MAP,
      tooltip: `Vị trí của ${BRAND_NAME}`,
      handleClick: (url: string) => window.open(url, '_blank'),
    },
  ]

  const width = isMobile ? 80 : 80
  const height = isMobile ? 80 : 80

  return (
    <TooltipProvider>
      <div className='fixed bottom-10 right-10 z-50 flex flex-col gap-4'>
        {socialIcons
          .filter((item) => item.url && item.url.trim() !== '')
          .map((item, index) => (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => item.url && item.handleClick(item.url)}
                  size='icon'
                  className={cn(
                    'relative rounded-full shadow-lg border border-white',
                    isMobile ? 'h-16 w-16' : 'h-16 w-16'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={width}
                    height={height}
                    className={cn('', 'animate-phone')}
                  />
                  <span className={cn('absolute inset-0 rounded-full', 'bg-white animate-pulse-ring')} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='left' className='bg-primary text-primary-foreground'>
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
    </TooltipProvider>
  )
}
