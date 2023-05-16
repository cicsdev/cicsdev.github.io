const dotenv = require('dotenv');
dotenv.config();

const { githubQuery } = require('./github-query')

module.exports = {
  siteMetadata: {
    title: 'CICS on GitHub',
    description: 'A Gatsby theme for the carbon design system',
    keywords: 'gatsby,theme,carbon',
    lang: 'en',
    navigationStyle: '',
    homepageTheme: 'g10',
    interiorTheme: 'g10',
    isSwitcherEnabled: false,
    isSearchEnabled: true,
    repository: {
      baseUrl:
        'https://github.com/cicsdev/cicsdev.github.io',
      subDirectory: '',
      branch: 'main',
    },
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'CICS on GitHub',
        icon: 'src/images/favicon.svg',
        short_name: 'CICS on GitHub',
        start_url: '/',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {},
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        url: "https://api.github.com/graphql",
        token: process.env.GITHUB_TOKEN,
        graphQLQuery: githubQuery,
        variables: {
          queryString: "is:public archived:false org:cicsdev"
        },
      },
    },
  ],
};
