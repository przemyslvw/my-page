import React, {type ReactNode} from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const { content } = props;
  const { metadata } = content;
  const { title, description, date, readingTime, authors, tags, permalink } = metadata;
  const baseUrl = siteConfig.url;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": date,
    "author": authors.map(author => ({
      "@type": "Person",
      "name": author.name,
      "url": author.url
    })),
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}${permalink}`
    },
    "keywords": tags.map(tag => tag.label).join(', ')
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(blogPostSchema)}
        </script>
      </Head>
      <BlogPostPage {...props} />
    </>
  );
}
