"use client";

import React from "react"

interface FlipLinkProps {
  children: string
  href: string
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href }) => {
  return (
    <a
      target="_blank"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-2xl font-semibold uppercase dark:text-white/90 sm:text-4xl md:text-5xl group"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="transition-transform duration-300 group-hover:-translate-y-full">
        {children.split("").map((l, i) => (
          <span
            className="inline-block"
            key={i}
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        {children.split("").map((l, i) => (
          <span
            className="inline-block"
            key={i}
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </a>
  )
}

export default FlipLink
