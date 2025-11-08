# Deployment Guide

This guide will help you deploy your Next.js portfolio to various platforms.

## Prerequisites

- Node.js 18+ installed
- All dependencies installed (`npm install`)
- Project builds successfully (`npm run build`)

## Environment Variables

Before deploying, make sure to set up environment variables:

1. Copy `.env.example` to `.env.local` (for local development) or set them in your deployment platform
2. Set `NEXT_PUBLIC_SPLINE_SCENE_URL` if you have a Spline 3D scene (optional)

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and configure everything
6. Add environment variables in the project settings
7. Click "Deploy"

#### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### 2. Netlify

1. Push your code to a Git repository
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Site settings > Environment variables
7. Click "Deploy site"

### 3. Other Platforms

#### Railway

1. Connect your GitHub repository
2. Railway will auto-detect Next.js
3. Add environment variables in the Variables tab
4. Deploy automatically

#### Render

1. Create a new Web Service
2. Connect your repository
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add environment variables in the Environment tab

#### Self-Hosted (Docker)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Then update `next.config.js` to enable standalone output:

```js
output: 'standalone',
```

## Pre-Deployment Checklist

- [ ] All dependencies are installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Environment variables are set in deployment platform
- [ ] Update project links in `components/ProjectsSection.tsx`
- [ ] Update social media links in `components/ContactSection.tsx`
- [ ] Add resume PDF to `public/` folder if needed
- [ ] Test the production build locally (`npm run build && npm start`)

## Post-Deployment

1. Test all pages and functionality
2. Check mobile responsiveness
3. Verify all links work correctly
4. Test form submissions (if applicable)
5. Monitor performance and errors

## Troubleshooting

### Build Fails

- Clear `.next` folder: `rm -rf .next`
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

### Environment Variables Not Working

- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Restart the build after adding environment variables
- Check variable names match exactly (case-sensitive)

### 404 Errors

- Ensure all routes are properly configured
- Check if using static export (may need different configuration)

## Performance Tips

- Images are automatically optimized by Next.js
- Use `next/image` component for images
- Enable compression (already configured in `next.config.js`)
- Monitor bundle size and optimize large dependencies

