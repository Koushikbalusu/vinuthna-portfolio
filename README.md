# Vinuthna - UI/UX Developer Portfolio

A stunning 3D interactive single-page portfolio website built with Next.js, featuring smooth animations, custom cursor effects, and immersive micro-interactions.

## ✨ Features

- **3D Interactive Background** - Spline 3D integration with animated fallback
- **Custom Animated Cursor** - Particle effects on hover and click
- **Smooth Scroll Animations** - Framer Motion powered transitions
- **Parallax Effects** - Depth and motion on scroll
- **Responsive Design** - Mobile-first approach
- **Light Theme** - Elegant color scheme with gradients
- **Micro-interactions** - Hover effects, glows, and 3D transforms

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. (Optional) Add your Spline 3D scene URL:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SPLINE_SCENE_URL=your_spline_scene_url_here
```

If you don't have a Spline scene, the website will use a beautiful animated gradient fallback.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── CustomCursor.tsx     # Animated cursor with particles
│   ├── Navigation.tsx       # Smooth scrolling navigation
│   ├── SplineBackground.tsx # 3D background component
│   ├── ParallaxWrapper.tsx  # Parallax scroll effects
│   ├── HomeSection.tsx      # Hero section
│   ├── AboutSection.tsx     # About me section
│   ├── ProjectsSection.tsx  # Projects showcase
│   └── ContactSection.tsx   # Contact form and social links
├── public/                  # Static assets
└── package.json
```

## 🎨 Customization

### Update Personal Information

1. **About Section**: Edit `components/AboutSection.tsx` to update the bio and abilities
2. **Projects**: Modify the `projects` array in `components/ProjectsSection.tsx`
3. **Social Links**: Update GitHub and LinkedIn URLs in `components/ContactSection.tsx`
4. **Resume**: Add your resume PDF to the `public` folder and update the link in `AboutSection.tsx`

### Styling

- Colors: Modify `tailwind.config.ts` to change the color scheme
- Animations: Adjust Framer Motion variants in component files
- Fonts: Update font imports in `app/layout.tsx`

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Spline** - 3D design tool integration
- **Lucide React** - Icon library

## 📝 Sections

### Home
- Animated hero text with 3D hover effects
- Spline 3D background
- Smooth scroll indicator

### About Me
- Scroll-triggered reveal animations
- Special abilities grid
- Resume download button

### Projects
- 6 project cards with 3D hover effects
- Particle animations on hover
- Tech stack badges

### Contact
- Animated contact form
- Social media links with hover effects
- Form validation

## 🎯 Performance

- Optimized images and assets
- Code splitting with Next.js
- Lazy loading for components
- Smooth 60fps animations

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🔧 Build for Production

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available for personal use.

## 🙏 Credits

Built with love for Vinuthna's portfolio showcase.

---

**Note**: Make sure to replace placeholder project links and social media URLs with your actual links before deploying.

