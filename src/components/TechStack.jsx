import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiGit,
  SiCapacitor,
  SiFlutter,
  SiDart,
  SiFigma,
  SiFirebase,
} from 'react-icons/si'
import { FaCode } from 'react-icons/fa6'
import { techStack } from '../data/content'

const iconMap = {
  SiReact: SiReact,
  SiJavascript: SiJavascript,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiNodedotjs: SiNodedotjs,
  SiSupabase: SiSupabase,
  SiGit: SiGit,
  SiCapacitor: SiCapacitor,
  SiFlutter: SiFlutter,
  SiDart: SiDart,
  SiFigma: SiFigma,
  SiFirebase: SiFirebase,
}

function TechCard({ tech, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[tech.iconName] || FaCode

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass glass-hover group flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? 'rgb(var(--a1) / .45)' : undefined,
        boxShadow: hovered ? '0 10px 25px -5px rgb(var(--a1) / .25)' : undefined,
      }}
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
          scale: hovered ? 1.25 : 1,
        }}
        transition={{
          y: { duration: 3 + (index % 4) * 0.6, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.25, ease: 'easeOut' },
        }}
        className="text-3xl transition-colors duration-300"
        style={{
          color: hovered ? 'rgb(var(--a1))' : 'currentColor',
        }}
      >
        <Icon />
      </motion.div>
      <span className="mt-3 text-xs font-medium text-mu transition-colors duration-300 group-hover:text-tx">
        {tech.name}
      </span>
    </motion.div>
  )
}

export default function TechStack({ className = '' }) {
  return (
    <div className={`grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 ${className}`}>
      {techStack.map((tech, index) => (
        <TechCard key={tech.name} tech={tech} index={index} />
      ))}
    </div>
  )
}
