# Quick Setup Guide

## Installation Steps

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (version 18 or higher)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to http://localhost:3000

## Customization Checklist

Before deploying, make sure to:

- [ ] Update project links in `components/ProjectsSection.tsx`
- [ ] Add your resume PDF to `public/resume.pdf`
- [ ] Update GitHub and LinkedIn URLs in `components/ContactSection.tsx`
- [ ] (Optional) Add Spline 3D scene URL to `.env.local`
- [ ] Update metadata in `app/layout.tsx` if needed

## Building for Production

```bash
npm run build
npm start
```

## Deploying

The site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any static hosting service**

For Vercel:
```bash
npm install -g vercel
vercel
```

## Troubleshooting

### Spline Scene Not Loading
- The site includes a beautiful animated gradient fallback
- To use Spline, add your scene URL to `.env.local`:
  ```
  NEXT_PUBLIC_SPLINE_SCENE_URL=your_url_here
  ```

### Cursor Not Showing
- Custom cursor only works on desktop (hidden on mobile/touch devices)
- This is intentional for better mobile UX

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

