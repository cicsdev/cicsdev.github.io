import React from 'react';
import { FourOhFour } from 'gatsby-theme-carbon';

const links = [
  { href: '/', text: 'CICS on GitHub Homepage' },
  { href: 'https://www.ibm.com/docs/en/cics-ts', text: 'CICS Transaction Server for z/OS documentation' },
];

const Custom404 = () => <FourOhFour links={links} />;

export default Custom404;
