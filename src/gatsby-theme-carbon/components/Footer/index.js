import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const Content = ({ buildTime }) => (
  <>
    <p>
      Last updated {buildTime}
    </p>
  </>
);

const links = {
  firstCol: [{ href: "https://ibm.com", linkText: "IBM.com" }],
  secondCol: [
    { href: "https://www.ibm.com/contact/us/en/", linkText: "Contact IBM"},
    { href: "https://www.ibm.com/privacy", linkText: "Privacy" },
    { href: "https://www.ibm.com/legal", linkText: "Terms of Use" },
  ],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;
