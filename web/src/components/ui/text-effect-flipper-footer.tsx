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
      className="relative block overflow-hidden whitespace-nowrap text-xs font-normal uppercase dark:text-white/70 hover:text-accent-500 group transition-all duration-300 py-0.5"
      style={{
        lineHeight: 1.2,
        fontSize: '0.75rem',
      }}
    >
      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children.split("").map((l, i) => (
          <span
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
            key={i}
            style={{
              transitionDelay: `${i * 15}ms`,
              fontSize: '0.75rem',
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        {children.split("").map((l, i) => (
          <span
            className="inline-block transition-transform duration-300 ease-out group-hover:translate-y-0"
            key={i}
            style={{
              transitionDelay: `${i * 15}ms`,
              fontSize: '0.75rem',
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
