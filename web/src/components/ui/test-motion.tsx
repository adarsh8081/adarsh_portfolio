"use client";

import React from "react"
import { motion } from "framer-motion"

const TestMotion: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-red-500"
    >
      Framer Motion Test
    </motion.div>
  )
}

export default TestMotion
