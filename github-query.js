exports.githubQuery = `
query ($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 100) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            description
            url
          }
        }
      }
    }
  }
`
