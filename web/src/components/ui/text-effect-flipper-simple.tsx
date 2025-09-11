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
      className="relative block overflow-hidden whitespace-nowrap text-lg font-semibold uppercase dark:text-white/90 sm:text-xl md:text-2xl group transition-all duration-300 hover:scale-105"
      style={{
        lineHeight: 0.9,
      }}
    >
      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-full">
        {children.split("").map((l, i) => (
          <span
            className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full"
            key={i}
            style={{
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {children.split("").map((l, i) => (
          <span
            className="inline-block transition-transform duration-500 ease-out group-hover:translate-y-0"
            key={i}
            style={{
              transitionDelay: `${i * 30}ms`,
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
