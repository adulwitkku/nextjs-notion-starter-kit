import path from 'node:path'
import { fileURLToPath } from 'node:url'

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line no-process-env
  enabled: process.env.ANALYZE === 'true'
})

const dirname = path.dirname(fileURLToPath(import.meta.url))
// Workaround for ensuring that `react` and `react-dom` resolve correctly
// when using a locally-linked version of `react-notion-x`.
// @see https://github.com/vercel/next.js/issues/50391
const reactAlias = path.resolve(dirname, 'node_modules/react')
const reactDomAlias = path.resolve(dirname, 'node_modules/react-dom')

export default withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  turbopack: {
    resolveAlias: {
      react: reactAlias,
      'react-dom': reactDomAlias
    }
  },

  webpack: (config) => {
    config.resolve.alias.react = reactAlias
    config.resolve.alias['react-dom'] = reactDomAlias
    return config
  },

  // See https://react-tweet.vercel.app/next#troubleshooting
  transpilePackages: ['react-tweet']
})
