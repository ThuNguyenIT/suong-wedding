"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { BRAND_NAME } from "@/constants/common";

interface BannerSlideProps {
  index: number;
  image: string;
}

const renderElements = (elements: string) => {
  switch (elements) {
    case "floating-rocks":
      return (
        <>
          {/* Floating rocks với framer-motion */}
          <motion.div
            className="absolute top-10 left-10 w-32 h-20 bg-gray-800 rounded-lg transform rotate-12 opacity-80"
            animate={{
              y: [0, -10, 0],
              rotate: [12, 15, 12],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-24 h-16 bg-gray-700 rounded-lg transform -rotate-6 opacity-70"
            animate={{
              y: [0, 15, 0],
              rotate: [-6, -3, -6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-32 left-1/4 w-20 h-12 bg-gray-600 rounded-lg transform rotate-45 opacity-60"
            animate={{
              y: [0, -8, 0],
              rotate: [45, 48, 45],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-16 right-1/3 w-28 h-18 bg-gray-800 rounded-lg transform -rotate-12 opacity-75"
            animate={{
              y: [0, 12, 0],
              rotate: [-12, -9, -12],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          {/* Clouds với framer-motion */}
          <motion.div
            className="absolute top-20 left-1/3 w-40 h-20 bg-white rounded-full opacity-60"
            animate={{
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-1/4 w-32 h-16 bg-white rounded-full opacity-50"
            animate={{
              x: [0, -15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      );

    case "geometric":
      return (
        <>
          {/* Geometric shapes với framer-motion */}
          <motion.div
            className="absolute top-20 left-20 w-24 h-24 bg-white/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-16 h-16 bg-white/30 transform rotate-45"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [45, 225, 405],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-60 left-1/3 w-20 h-20 bg-white/25 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      );

    case "waves":
      return (
        <>
          {/* Wave patterns với framer-motion */}
          <motion.div
            className="absolute top-20 left-0 w-full h-20 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-y-1"
            animate={{
              x: [0, 100, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 left-0 w-full h-16 bg-gradient-to-r from-transparent via-white/15 to-transparent transform skew-y-1"
            animate={{
              x: [0, -80, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </>
      );

    case "particles":
      return (
        <>
          {/* Particle effects với framer-motion */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/40 rounded-full"
              style={{
                top: `${20 + i * 10}%`,
                left: `${15 + i * 12}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      );

    case "stars":
      return (
        <>
          {/* Starry night effect */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${10 + i * 7}%`,
                left: `${5 + i * 8}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
          {/* Shooting stars */}
          <motion.div
            className="absolute w-1 h-20 bg-gradient-to-b from-white to-transparent"
            style={{ top: "20%", left: "10%" }}
            animate={{
              x: [0, 300],
              y: [0, 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 2,
            }}
          />
        </>
      );

    case "butterflies":
      return (
        <>
          {/* Butterfly animations */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-6 bg-white/30 rounded-full"
              style={{
                top: `${30 + i * 12}%`,
                left: `${20 + i * 15}%`,
              }}
              animate={{
                x: [0, 50, -30, 20, 0],
                y: [0, -20, 10, -15, 0],
                rotate: [0, 10, -10, 5, 0],
                scale: [1, 1.1, 0.9, 1.05, 1],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
          {/* Wing flapping effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wing-${i}`}
              className="absolute w-6 h-4 bg-white/20 rounded-full"
              style={{
                top: `${40 + i * 20}%`,
                left: `${60 + i * 10}%`,
              }}
              animate={{
                scaleX: [1, 1.5, 1],
                scaleY: [1, 0.7, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      );

    case "aurora":
      return (
        <>
          {/* Aurora borealis effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              x: [0, 20, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-10 left-0 w-full h-24 bg-gradient-to-r from-pink-400/20 via-yellow-400/20 to-green-400/20"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              x: [0, -15, 25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-20 left-0 w-full h-20 bg-gradient-to-r from-cyan-400/25 via-purple-400/25 to-pink-400/25"
            animate={{
              opacity: [0.25, 0.65, 0.25],
              x: [0, 30, -20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      );

    case "crystals":
      return (
        <>
          {/* Crystal formations */}
          <motion.div
            className="absolute top-20 left-20 w-16 h-20 bg-white/25 transform rotate-45"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            animate={{
              rotate: [45, 405, 45],
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-12 h-16 bg-white/30 transform rotate-12"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            animate={{
              rotate: [12, 372, 12],
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-60 left-1/3 w-14 h-18 bg-white/20 transform -rotate-12"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            animate={{
              rotate: [-12, 348, -12],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          {/* Sparkle effects */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${25 + i * 15}%`,
                left: `${30 + i * 12}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </>
      );

    case "bubbles":
      return (
        <>
          {/* Floating bubbles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-white/20 rounded-full border border-white/30"
              style={{
                top: `${80 + i * 2}%`,
                left: `${10 + i * 8}%`,
              }}
              animate={{
                y: [0, -400],
                x: [0, Math.sin(i) * 30],
                scale: [0.5, 1.2, 0.8],
                opacity: [0.2, 0.6, 0],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.8,
              }}
            />
          ))}
          {/* Bubble clusters */}
          <motion.div
            className="absolute top-60 right-20 w-12 h-12 bg-white/15 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-70 left-1/4 w-8 h-8 bg-white/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </>
      );

    case "lightning":
      return (
        <>
          {/* Lightning bolts */}
          <motion.div
            className="absolute top-20 left-1/4 w-1 h-32 bg-white"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-30 right-1/3 w-1 h-24 bg-white transform rotate-12"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3.5,
            }}
          />
          <motion.div
            className="absolute top-40 left-1/2 w-1 h-28 bg-white transform -rotate-6"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
          {/* Electric sparks */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                top: `${20 + i * 12}%`,
                left: `${25 + i * 10}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1 + 1,
              }}
            />
          ))}
        </>
      );

    case "fireflies":
      return (
        <>
          {/* Firefly swarm */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                top: `${20 + i * 5}%`,
                left: `${10 + i * 6}%`,
              }}
              animate={{
                x: [0, Math.sin(i) * 40, 0],
                y: [0, Math.cos(i) * 30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
          {/* Glowing trails */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute w-20 h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"
              style={{
                top: `${30 + i * 20}%`,
                left: `${20 + i * 25}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
        </>
      );

    case "spirals":
      return (
        <>
          {/* Spiral patterns */}
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 border-2 border-white/30 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-30 right-20 w-32 h-32 border-2 border-white/25 rounded-full"
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-50 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full"
            animate={{
              rotate: [0, -360],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          />
          {/* Spiral center dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/40 rounded-full"
              style={{
                top: `${25 + i * 15}%`,
                left: `${30 + i * 20}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      );

    default:
      return null;
  }
};

const elementTypes = [
  "floating-rocks",
  "geometric",
  "waves",
  "particles",
  "stars",
  "butterflies",
  "aurora",
  "crystals",
  "bubbles",
  "lightning",
  "fireflies",
  "spirals",
];

export default function BannerSlide({ index, image }: BannerSlideProps) {
  const [randomElement, setRandomElement] = useState<string>("");

  useLayoutEffect(() => {
    const randomIndex = Math.floor(Math.random() * elementTypes.length);
    setRandomElement(elementTypes[randomIndex]);

    const interval = setInterval(() => {
      const newRandomIndex = Math.floor(Math.random() * elementTypes.length);
      setRandomElement(elementTypes[newRandomIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={BRAND_NAME}
          className="object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          fill
          // priority
        />
      </div>

      {/* Background elements overlay */}
      <div className="absolute inset-0">
        <motion.div
          key={randomElement}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {renderElements(randomElement)}
        </motion.div>
      </div>
    </div>
  );
}
