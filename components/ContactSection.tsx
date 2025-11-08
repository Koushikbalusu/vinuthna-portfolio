'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { Send, Mail, MessageSquare, User, Github, Linkedin } from 'lucide-react'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-transparent to-slate-50 overflow-hidden"
    >
      {/* Minimal Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => {
          const colors = ['#3b82f6', '#8b5cf6', '#ec4899']
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl will-change-transform"
              style={{
                width: `${300 + i * 50}px`,
                height: `${300 + i * 50}px`,
                left: `${(i % 2) * 60}%`,
                top: `${Math.floor(i / 2) * 60}%`,
                background: `radial-gradient(circle, ${colors[i % 3]}10, transparent)`,
                transform: 'translateZ(0)',
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, 20, 0],
                scale: [1, 1.15, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
          )
        })}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass-effect mb-4 text-sm font-heading text-slate-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-display font-bold text-gradient-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Let's <span className="text-gradient">Connect</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-slate-600 mt-4 font-body max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have a project in mind? Let's collaborate and create something amazing together!
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="glass-effect-strong rounded-3xl p-8 md:p-10 relative overflow-hidden will-change-transform"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                  backgroundSize: '30px 30px',
                }} />
              </div>

              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-sm font-heading font-semibold text-slate-700 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all bg-white/50 backdrop-blur-sm font-body text-slate-800 placeholder:text-slate-500"
                      placeholder="Your Name"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-heading font-semibold text-slate-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all bg-white/50 backdrop-blur-sm font-body text-slate-800 placeholder:text-slate-500"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="message" className="block text-sm font-heading font-semibold text-slate-700 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-2" />
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all bg-white/50 backdrop-blur-sm resize-none font-body text-slate-800 placeholder:text-slate-500"
                      placeholder="Your Message"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                    {focusedField === 'message' && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-heading font-semibold text-lg shadow-2xl overflow-hidden will-change-transform"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              className="flex flex-col justify-center items-center md:items-start space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-800">
                  Let's <span className="text-gradient-2">Collaborate</span>
                </h3>
                <p className="text-lg text-slate-600 mb-8 font-body leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-6">
                <motion.a
                  href="https://github.com/Vinuthna837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-5 glass-effect-strong rounded-2xl will-change-transform"
                  whileHover={{
                    scale: 1.08,
                    rotate: 360,
                    boxShadow: '0 0 30px rgba(14, 165, 233, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: 'translateZ(0)' }}
                >
                  <Github className="w-8 h-8 text-slate-700 group-hover:text-blue-600 transition-colors" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/vinuthna-athelli-391a35319/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-5 glass-effect-strong rounded-2xl will-change-transform"
                  whileHover={{
                    scale: 1.08,
                    rotate: 360,
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: 'translateZ(0)' }}
                >
                  <Linkedin className="w-8 h-8 text-slate-700 group-hover:text-purple-600 transition-colors" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              </div>

              {/* Contact Info Card */}
              <motion.div
                className="glass-effect-strong rounded-2xl p-6 w-full will-change-transform"
                whileHover={{ scale: 1.01, y: -3 }}
                transition={{ duration: 0.2 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <h4 className="font-heading font-semibold text-slate-800 mb-4">Quick Contact</h4>
                <div className="space-y-3 font-body text-slate-600">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <a href="mailto:vinuthnaathelli@gmail.com" className="hover:text-blue-600 transition-colors">vinuthnaathelli@gmail.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    <span>Available for projects</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
