import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '7bcf17e8348541ed9f75dc32943969bb',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Adulwit Chinapass',
  domain: 'adul.dev',
  author: 'Adulwit Chinapass',

  // open graph metadata (optional)
  description: 'Adulwit Chinapass',

  // social usernames (optional)
  // twitter: 'transitive_bs',
  // github: 'transitive-bullshit',
  // linkedin: 'fisch2',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: true,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/lecturer': '2d2fc83505364382955aa85dd4f1e48d',
    '/ai': '535b97042a054ce69abbe39ff9eb4580',
    '/code': '39bec21d89564a90b7a68f13b176b916',
    '/blog': '1416985d29794668b8209ec17607d452',
  },
  // pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Lecturer',
      pageId: '2d2fc83505364382955aa85dd4f1e48d'
    },
    {
      title: 'AI',
      pageId: '535b97042a054ce69abbe39ff9eb4580'
    },
    {
      title: 'Code',
      pageId: '39bec21d89564a90b7a68f13b176b916'
    },
    {
      title: 'Blog',
      pageId: '1416985d29794668b8209ec17607d452'
    }
  ]
})
