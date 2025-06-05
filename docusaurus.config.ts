import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Majdak Think Tank',
  tagline: 'Innowacje, Bezpieczeństwo IT i Automatyzacja',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.majdak.online',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'przemyslvw', // Usually your GitHub org/user name.
  projectName: 'my-page', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: false,               // (opcjonalne) usuwa ostrzeżenia o ukośnikach

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/przemyslvw/my-page/edit/master/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/przemyslvw/my-page/edit/master/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {name: 'description', content: 'Majdak Think Tank — centrum wiedzy o bezpieczeństwie IT, automatyzacji i nowych technologiach.'},
      {name: 'keywords', content: 'Majdak, Think Tank, bezpieczeństwo IT, automatyzacja, ESP32, Playwright, programowanie, sieci, web security'}
    ],
    navbar: {
      title: '',
      logo: {
        alt: 'Majdak Think Tank Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Dokumentacja',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        { to: '/automatyzacja', label: 'Automatyzacja', position: 'left' },
        { to: '/contact', label: 'Kontakt', position: 'left' },
        {
          href: 'https://github.com/przemyslvw',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Socials',
          items: [
            {
              label: '🐙 GitHub',
              href: 'https://github.com/przemyslvw',
            },
            {
              label: '📸 Instagram',
              href: 'https://www.instagram.com/przemas.ts/',
            },
            {
              label: '⌚ Garmin Connect',
              href: 'https://connect.garmin.com/modern/profile/396bbbd1-edbd-4fd4-a780-132723eef739',
            },
            {
              label: '🐦 X',
              href: 'https://x.com/przemyslvw',
            },
            {
              label: '📧 Email',
              href: 'mailto:kontakt@majdak.online',
            },
          ],
        },        
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Dokumentacja',
              to: '/docs/intro',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/przemyslvw',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Majdak.Online, Inc. Built with Passion.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};


export default config;

