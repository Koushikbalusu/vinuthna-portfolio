'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HomeSection from '@/components/HomeSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import GlobalBackground from '@/components/GlobalBackground'

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const href = target.getAttribute('href')
        if (href) {
          const element = document.querySelector(href)
          element?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleSmoothScroll)
    return () => document.removeEventListener('click', handleSmoothScroll)
  }, [])

  return (
    <main className="relative">
      <GlobalBackground />
      <Navigation />
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

