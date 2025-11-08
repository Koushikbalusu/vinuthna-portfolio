'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
})

export default function SplineBackground() {
  // Replace this URL with your actual Spline scene URL
  const splineSceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || ''

  return (
    <div className="fixed inset-0 w-full h-full z-0 opacity-30 overflow-hidden">
      {splineSceneUrl ? (
        <Suspense
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-pulse" />
          }
        >
          <Spline scene={splineSceneUrl} className="w-full h-full" />
        </Suspense>
      ) : (
        // Fallback animated background when Spline scene is not available
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />
          {/* Animated geometric shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/30 blur-xl"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

