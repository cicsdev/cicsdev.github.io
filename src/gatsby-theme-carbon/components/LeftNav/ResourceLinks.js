import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
  {
    title: 'Github',
    href: 'https://github.com/cicsdev',
  },
  {
    title: 'Blogs',
    href: 'https://community.ibm.com/community/user/ibmz-and-linuxone/groups/topic-home?CommunityKey=8bc7f42b-b4ba-4419-80d8-2fbf894a6649',
  },
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
