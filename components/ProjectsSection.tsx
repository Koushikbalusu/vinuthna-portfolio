'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { ExternalLink, UtensilsCrossed, Briefcase, Newspaper, Layout, Calculator, Utensils } from 'lucide-react'

const projects = [
  {
    title: 'Skip the Queue',
    tech: 'Figma, UI/UX Design',
    description: 'Developed a campus cafeteria app that lets students pre-order food, reducing queues and wait times, while enabling instant feedback to improve services.',
    link: 'https://www.figma.com/proto/a3XMAYOK7jH5pcdOtKjZpn/Niat-App?node-id=922-251&starting-point-node-id=710%3A26&t=DTFBX8njbgvWeGaW-1',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    icon: UtensilsCrossed,
  },
  {
    title: 'Lead Management Portal',
    tech: 'Figma, UI/UX Design',
    description: 'Built a lead management portal that streamlines how admins send service requests to vendors, simplifying communication, tracking, and workflow management for smoother lead handling.',
    link: 'https://www.figma.com/proto/gukZhiFDLiitG5Hjoz9PCY/Assignment---lead-management?node-id=276-699&t=m5OClxBuc1s8YDoX-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=149%3A237&show-proto-sidebar=1',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    icon: Briefcase,
  },
  {
    title: 'News App',
    tech: 'Figma, UI/UX Design',
    description: 'Designed a news app interface with category-based updates, search, saved articles, and a chatbot for personalized recommendations — delivering an informative, interactive user experience.',
    link: 'https://www.figma.com/proto/1PLNWy2Oh334Egyc7fNzE4/news-app?node-id=221-53&t=plSZpwpaTsiSg1sv-1',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    icon: Newspaper,
  },
  {
    title: 'Portal - Workshop Management',
    tech: 'Figma, UI/UX Design',
    description: 'Created a portal clone in Figma and added a workshop management feature to solve a real college issue, showcasing strong design thinking and problem-solving skills.',
    link: 'https://www.figma.com/proto/hNA5G5PLUmnr2EkW4I4u3m/Untitled?node-id=1-4&t=Z5dRt3BpvXstwyDY-1',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    icon: Layout,
  },
  {
    title: 'Calculator',
    tech: 'HTML, CSS, JavaScript',
    description: 'Built a clean, responsive web calculator using HTML, CSS, and JavaScript, showcasing my core frontend and interactive UI skills.',
    link: 'https://myowncal.niat.tech/',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    icon: Calculator,
  },
  {
    title: 'Food Landing Page',
    tech: 'HTML, CSS',
    description: 'Built a simple, responsive food-ordering web app using HTML and CSS, showcasing intuitive UI design and smooth user experience.',
    link: 'https://foodlanding.niat.tech/',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    icon: Utensils,
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-150px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Optimized scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  }), [])

  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
      },
    },
  }), [])

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-purple-50/20 via-blue-50/10 to-transparent overflow-hidden"
    >
      {/* Optimized Background - Minimal */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y, opacity }}
      >
        {[...Array(4)].map((_, i) => {
          const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl will-change-transform"
              style={{
                width: `${350 + i * 50}px`,
                height: `${350 + i * 50}px`,
                left: `${(i % 2) * 50}%`,
                top: `${Math.floor(i / 2) * 50}%`,
                background: `radial-gradient(circle, ${colors[i]}15, transparent)`,
                transform: 'translateZ(0)',
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, 20, 0],
                scale: [1, 1.15, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
          )
        })}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={cardVariants}>
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass-effect mb-4 text-sm font-heading text-slate-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Portfolio
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-display font-bold text-gradient-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-slate-600 mt-4 font-body max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Crafting digital experiences that blend innovation with beautiful design
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div
                    className="glass-effect-strong rounded-3xl p-8 h-full relative overflow-hidden cursor-pointer will-change-transform"
                    whileHover={{
                      scale: 1.02,
                      y: -6,
                    }}
                    transition={{ 
                      type: 'spring' as const, 
                      stiffness: 500, 
                      damping: 30,
                      duration: 0.25
                    }}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0)' }}
                  >
                    {/* Subtle Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-3xl will-change-opacity"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ 
                        duration: 0.2,
                        ease: 'easeOut'
                      }}
                    />

                    {/* Subtle Glow Effect */}
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute -inset-1 bg-slate-200/20 rounded-3xl blur-xl will-change-transform"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ 
                          opacity: 0.25,
                          scale: 1,
                        }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                          duration: 0.2,
                        }}
                        style={{ transform: 'translateZ(0)' }}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Icon with react-icons */}
                      <motion.div
                        className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${project.gradient} mb-6 shadow-xl relative overflow-hidden will-change-transform`}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                        style={{ transform: 'translateZ(0)' }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold mb-3 text-slate-800">
                        {project.title}
                      </h3>

                      {/* Tech Stack */}
                      <motion.div 
                        className="mb-4"
                        animate={{
                          y: hoveredIndex === index ? -2 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-heading font-semibold bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>
                          {project.tech.split(',')[0]}
                        </span>
                      </motion.div>

                      {/* Description */}
                      <p className="text-slate-600 mb-6 leading-relaxed font-body">
                        {project.description}
                      </p>

                      {/* View Project Button */}
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm bg-gradient-to-r ${project.gradient} text-white shadow-lg overflow-hidden group/btn will-change-transform`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        style={{ transform: 'translateZ(0)' }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.4 }}
                        />
                        <span className="relative z-10">View Project</span>
                        <motion.span
                          className="relative z-10"
                          animate={{ 
                            x: hoveredIndex === index ? [0, 3, 0] : 0,
                          }}
                          transition={{ 
                            duration: 0.5,
                            repeat: hoveredIndex === index ? Infinity : 0,
                            repeatDelay: 0.3
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.span>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
