import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Row } from "gatsby-theme-carbon/src/components/Grid";
import SquareCard from "gatsby-theme-carbon/src/components/SquareCard";
import { LogoGithub } from '@carbon/icons-react';

const Repositories = () => {
  const data = useStaticQuery(
    graphql`
      query RepoQuery {
        allGithubData {
          nodes {
            data {
              search {
                edges {
                  node {
                    description
                    name
                    url
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const repos = data.allGithubData.nodes[0].data.search.edges;

  return (
    <Row className="square-card-group">
      {
        repos.map(repo =>
          <SquareCard
            title={repo.node.name}
            bodyText={repo.node.description}
            href={repo.node.url}
          >
            <LogoGithub />
          </SquareCard>
        )
      }
    </Row>
  )
};

export default Repositories;
