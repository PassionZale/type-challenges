import type { HeadConfig } from 'vitepress'

const defaultHead: HeadConfig[] = [
  /** 标签栏略缩图 */
  [
    'link',
    {
      rel: 'icon',
      href: '/favicon.svg'
    }
  ],
  /** viewport */
  [
    'meta',
    {
      name: 'viewport',
      content:
        'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover'
    }
  ],
  /** Keywords */
  [
    'meta',
    {
      name: 'Keywords',
      content: 'Typescript, type-challenges'
    }
  ],
  /** author */
  [
    'meta',
    {
      name: 'author',
      content: 'Lei Zhang'
    }
  ],
  /** og title */
  [
    'meta',
    {
      property: 'og:title',
      content: 'Type Challenges'
    }
  ],
  /** og type */
  [
    'meta',
    {
      property: 'og:type',
      content: 'article'
    }
  ],
  /** og image */
  [
    'meta',
    {
      property: 'og:image',
      content: '/favicon.svg'
    }
  ],
  /** og description */
  [
    'meta',
    {
      property: 'og:description',
      content: 'Collection of TypeScript type challenges with OJ'
    }
  ],
  /** OG site_name */
  [
    'meta',
    {
      property: 'og:site_name',
      content: 'Type Challenges'
    }
  ]
] as HeadConfig[]

const vercelAnalytics: HeadConfig[] = [
  [
    'script',
    {},
    `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`
  ],
  [
    'script',
    {
      src: '/_vercel/insights/script.js',
      defer: ''
    }
  ]
] as HeadConfig[]

export const head =
  process.env.NODE_ENV === 'production'
    ? defaultHead.concat(vercelAnalytics)
    : defaultHead
