/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Webpack configuration to resolve React version conflicts
  webpack: (config, { isServer, webpack }) => {
    // Ensure only one version of React is used
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Alias React to ensure single instance (prevents multiple React instances)
    try {
      const reactPath = require.resolve('react');
      const reactDomPath = require.resolve('react-dom');
      
      config.resolve.alias = {
        ...config.resolve.alias,
        react: reactPath,
        'react-dom': reactDomPath,
      };
      
      // Try to resolve jsx-runtime explicitly
      try {
        config.resolve.alias['react/jsx-runtime'] = require.resolve('react/jsx-runtime');
      } catch (e) {
        // If direct resolution fails, try alternative paths
        const path = require('path');
        const reactDir = path.dirname(reactPath);
        const fs = require('fs');
        
        // Try different possible file extensions
        const possiblePaths = [
          path.join(reactDir, 'jsx-runtime.js'),
          path.join(reactDir, 'jsx-runtime.mjs'),
          path.join(reactDir, 'jsx-runtime.cjs'),
        ];
        
        for (const jsxPath of possiblePaths) {
          if (fs.existsSync(jsxPath)) {
            config.resolve.alias['react/jsx-runtime'] = jsxPath;
            break;
          }
        }
      }
      
      // Try to resolve jsx-dev-runtime explicitly
      try {
        config.resolve.alias['react/jsx-dev-runtime'] = require.resolve('react/jsx-dev-runtime');
      } catch (e) {
        // If direct resolution fails, try alternative paths
        const path = require('path');
        const reactDir = path.dirname(reactPath);
        const fs = require('fs');
        
        // Try different possible file extensions
        const possiblePaths = [
          path.join(reactDir, 'jsx-dev-runtime.js'),
          path.join(reactDir, 'jsx-dev-runtime.mjs'),
          path.join(reactDir, 'jsx-dev-runtime.cjs'),
        ];
        
        for (const jsxPath of possiblePaths) {
          if (fs.existsSync(jsxPath)) {
            config.resolve.alias['react/jsx-dev-runtime'] = jsxPath;
            break;
          }
        }
      }
      
      // Prevent duplicate React instances in bundle
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^react$/,
          reactPath
        ),
        new webpack.NormalModuleReplacementPlugin(
          /^react-dom$/,
          reactDomPath
        )
      );
    } catch (error) {
      console.warn('Warning: Could not resolve React modules:', error.message);
    }
    
    return config;
  },
  
  // Output configuration for static export (if needed)
  // output: 'standalone', // Uncomment for standalone deployment
}

module.exports = nextConfig

