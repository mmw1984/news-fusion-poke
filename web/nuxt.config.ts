import path from 'path';

const SITE_DOMAIN = process.env.SITE_DOMAIN;
const APP_BASE_URL = process.env.NUXT_APP_BASE_URL || '/';
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	ssr: false,
	app: {
		baseURL: APP_BASE_URL,
	},
	alias: {
		'~~': path.resolve(__dirname, '../'),
	},
	components: [
		'~/components',
		'~/components/Feed',
		'~/components/Feed/Item',
		'~/components/Layout',
	],
	modules: [
		'@nuxt/ui',
		'@nuxt/icon',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
		'nuxt-easy-lightbox',
	],
	css: ['~/assets/css/main.css'],
	routeRules: {
		'/': { prerender: true },
		'/category/**': { prerender: true },
		'/about': { prerender: true },
		'/sitemap-index.xml': { prerender: true },
		'/rss': { prerender: true },
	},
	icon: {
		serverBundle: 'local',
		clientBundle: {
			scan: {
				globInclude: ['web/**/*.vue'],
				globExclude: ['node_modules', 'dist'],
			},
		},
	},
	site: {
		name: 'News Fusion',
		indexable: true,
		...(SITE_URL && {
			url: SITE_URL,
		}),
		...(SITE_DOMAIN && {
			url: 'https://' + SITE_DOMAIN,
		}),
	},
	robots: {
		allow: '/',
		disallow: '/404',
		robotsTxt: false,
	},
	sitemap: {
		sitemapName: 'sitemap-index.xml',
	},
	runtimeConfig: {
		public: {
			siteDomain: process.env.SITE_DOMAIN || 'localhost:3000',
		},
	},
});
