import React, {type ReactNode} from 'react';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof DocItemType>;

export default function DocItemWrapper(props: Props): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const { content } = props;
  const { metadata } = content;
  const { title, description, permalink, lastUpdatedAt } = metadata;
  const baseUrl = siteConfig.url;

  const docSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "url": `${baseUrl}${permalink}`,
    "dateModified": lastUpdatedAt ? new Date(lastUpdatedAt * 1000).toISOString() : undefined,
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}${permalink}`
    }
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(docSchema)}
        </script>
      </Head>
      <DocItem {...props} />
    </>
  );
}
