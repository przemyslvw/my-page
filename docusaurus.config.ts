import fs from 'fs';
import path from 'path';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Posty miały kiedyś adresy datowe (/blog/YYYY/MM/DD/nazwa-folderu), zanim
// dostały jawne slugi. Google wciąż zna stare adresy (404 w Search Console),
// więc generujemy przekierowania stary adres -> aktualny slug.
function buildBlogRedirects(): { from: string; to: string }[] {
  const blogDir = path.join(__dirname, 'blog');
  const redirects: { from: string; to: string }[] = [];
  for (const name of fs.readdirSync(blogDir)) {
    const m = name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
    if (!m) continue;
    const indexFile = path.join(blogDir, name, 'index.md');
    if (!fs.existsSync(indexFile)) continue;
    const frontmatter = fs.readFileSync(indexFile, 'utf8').slice(0, 2000);
    const slugMatch = frontmatter.match(/^slug:\s*["']?([^\s"']+)/m);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    const to = slug.startsWith('/') ? `/blog${slug}` : `/blog/${slug}`;
    const from = `/blog/${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
    if (from !== to) redirects.push({ from, to });
  }
  return redirects;
}

const config: Config = {
  title: 'MAJDAK.ONLINE',
  tagline: 'Systemy Bezpieczeństwa, Automatyzacja, IoT',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.majdak.online',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Content-Security-Policy',
        content: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';",
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'strict-origin-when-cross-origin',
      },
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'przemyslvw', // Usually your GitHub org/user name.
  projectName: 'my-page', // Usually your repo name.
  markdown: {
    format: 'mdx',
    mermaid: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    // @ts-ignore
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  onBrokenLinks: 'throw',

  trailingSlash: false, // (opcjonalne) usuwa ostrzeżenia o ukośnikach

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
          editUrl: 'https://github.com/przemyslvw/my-page/edit/master/',
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
          editUrl: 'https://github.com/przemyslvw/my-page/edit/master/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          // Strony tagów i paginacji nie powinny konkurować o crawl budget —
          // Google i tak oznacza je jako "zeskanowane, niezindeksowane".
          ignorePatterns: ['/blog/tags/**', '/blog/page/**', '/blog/archive', '/docs/tags/**'],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: buildBlogRedirects(),
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark', // Ustawia ciemny motyw jako domyślny
      disableSwitch: false, // Pozwala użytkownikom przełączać motyw
      respectPrefersColorScheme: false, // Ignoruje ustawienia systemu
    },
    // Replace with your project's social card
    image: 'img/logo.png',
    metadata: [
      {
        name: 'description',
        content: 'Skalowalna architektura systemowa i ofensywne cyberbezpieczeństwo (Red Teaming). Wdrażamy i audytujemy zaawansowane środowiska IT. Dokumentacje techniczne: Kali Linux, standardy transmisji danych (Link 16) oraz systemy wbudowane (esp-idf).',
      },
      {
        name: 'keywords',
        content:
          'cybersecurity, środowisko Kali Linux, Link 16 standard, MIDS, ofensywne bezpieczeństwo, Dev-Ops, Node.js mikroserwisy, esp-idf development, NIS2, ISO 27001, automatyzacja n8n, Red Teaming',
      },
    ],
    navbar: {
      title: 'MAJDAK.ONLINE',
      items: [
        { to: '/blog', label: 'Research / Base', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs / Specs',
        },
        { to: '/automatyzacja', label: 'Capabilities / Ops', position: 'left' },
        { to: '/contact', label: 'Contact / Secure Comms', position: 'left' },
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
              label: 'OWASP top 10',
              to: '/docs/category/owasp-top-10--testy-penetracyjne-aplikacji-webowych',
            },
            {
              label: 'Kurs Security Engineer',
              to: '/docs/category/kurs-security-engineer',
            },
            {
              label: 'Kurs Kali Linux',
              to: '/docs/kurs-kali-linux',
            },
            {
              label: 'ISO27002',
              to: '/docs/iso27002',
            },
            {
              label: 'ISO27001',
              to: '/docs/iso27001',
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
              href: 'mailto:kontakt@baluarte.pl',
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
            {
              label: 'Doceń naszą pracę',
              to: '/wsparcie',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://baluarte.pl" target="_blank" rel="noopener noreferrer" style="color: var(--ifm-color-primary); font-weight: bold; text-decoration: none;">baluarte.pl</a>, Inc. Built with Passion.`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: [
        'java',
        'http',
        'csharp',
        'php',
        'toml',
        'powershell',
        'nginx',
        'apacheconf',
        'batch',
        'graphql',
        'promql',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
