import React from 'react';
import SchemaSEO from '@site/src/components/SEO/SchemaSEO';

export default function Root({children}) {
  return (
    <>
      <SchemaSEO />
      {children}
    </>
  );
}
