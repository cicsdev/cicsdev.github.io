import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import BannerImg from '../images/ibm-cics-on-github-lead-banner.png'

const FirstLeftText = () => <p>Welcome to CICS on GitHub</p>;

const FirstRightText = () => (
  <p>
    Here you will find example code for our portfolio of products to use and extend as you require.
  </p>
);

const BannerText = () => <></>;

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={BannerImg} position={"center right"} />,
  FirstCallout: (
    <HomepageCallout
      leftText={FirstLeftText}
      rightText={FirstRightText}
    />
  ),
  SecondCallout: (
    <></>
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
