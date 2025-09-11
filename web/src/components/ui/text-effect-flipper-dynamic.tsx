"use client";

import React, { Suspense } from "react"
import dynamic from "next/dynamic"

const DURATION = 0.25
const STAGGER = 0.025

interface FlipLinkProps {
  children: string
  href: string
}

const MotionA = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.a })), {
  ssr: false,
  loading: () => <a href="#" className="text-2xl font-semibold uppercase">Loading...</a>
})

const MotionSpan = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.span })), {
  ssr: false,
  loading: () => <span>Loading...</span>
})

const FlipLink: React.FC<FlipLinkProps> = ({ children, href }) => {
  return (
    <Suspense fallback={<a href={href} className="text-2xl font-semibold uppercase">{children}</a>}>
      <MotionA
        initial="initial"
        whileHover="hovered"
        target="_blank"
        href={href}
        className="relative block overflow-hidden whitespace-nowrap text-2xl font-semibold uppercase dark:text-white/90 sm:text-4xl md:text-5xl"
        style={{
          lineHeight: 0.75,
        }}
      >
        <div>
          {children.split("").map((l, i) => (
            <MotionSpan
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </MotionSpan>
          ))}
        </div>
        <div className="absolute inset-0">
          {children.split("").map((l, i) => (
            <MotionSpan
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </MotionSpan>
          ))}
        </div>
      </MotionA>
    </Suspense>
  )
}

export default FlipLink
