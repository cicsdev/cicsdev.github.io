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
                nodes {
                  description
                  name
                  url
                }
              }
            }
          }
        }
      }
    `
  );

  const repos = data.allGithubData.nodes[0].data.search.nodes;

  return (
    <Row className="square-card-group">
      {
        repos.map(repo =>
          <SquareCard
            title={repo.name}
            bodyText={repo.description}
            href={repo.url}
            color="dark"
          >
            <LogoGithub />
          </SquareCard>
        )
      }
    </Row>
  )
};

export default Repositories;
