const dotenv = require('dotenv');
dotenv.config();

const { githubQuery } = require('./github-query')

const pathPrefix = process.env.PATH_PREFIX || '/';

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    title: 'CICS on GitHub',
    description: 'CICS application development samples on GitHub',
    keywords: 'CICS,samples,developer',
    lang: 'en',
    navigationStyle: '',
    homepageTheme: 'dark',
    interiorTheme: 'g10',
    isSwitcherEnabled: false,
    isSearchEnabled: false,
    repository: {
      baseUrl:
        'https://github.com/cicsdev/cicsdev.github.io',
      subDirectory: '',
      branch: 'main',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-theme-carbon',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'CICS on GitHub',
        icon: 'src/images/favicon.svg',
        short_name: 'CICS on GitHub',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#161616',
        display: 'browser',
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        url: "https://api.github.com/graphql",
        token: process.env.GITHUB_TOKEN,
        graphQLQuery: githubQuery,
        variables: {
          queryString: "is:public archived:false org:cicsdev sort:name-asc"
        },
      },
    },
  ],
};
