import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';

import Carbon from './carbon.jpg';

const FirstLeftText = () => <p>Welcome to CICS on GitHub</p>;

const FirstRightText = () => (
  <p>
    Here you will find example code for our portfolio of products to use and extend as you require.
  </p>
);

const BannerText = () => <h1>IBM CICS on GitHub</h1>;

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={Carbon} />,
  FirstCallout: (
    <HomepageCallout
      leftText={FirstLeftText}
      rightText={FirstRightText}
      color="white"
      backgroundColor="#061f80"
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
