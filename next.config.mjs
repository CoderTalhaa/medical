/** @type {import('next').NextConfig} */
 
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader', 'glslify', 'glslify-loader'],
      })
      return config
    },
  }
   
  export default nextConfig