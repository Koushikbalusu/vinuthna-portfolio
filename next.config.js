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
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
    };
    
    // Prevent duplicate React instances in bundle
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^react$/,
        require.resolve('react')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^react-dom$/,
        require.resolve('react-dom')
      )
    );
    
    return config;
  },
  
  // Output configuration for static export (if needed)
  // output: 'standalone', // Uncomment for standalone deployment
}

module.exports = nextConfig

