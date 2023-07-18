const React = require("react");

const script = `
  window._ibmAnalytics = {
    "settings": {
      "name": "CICSdev"
    },
    "trustarc": {
      "isCookiePreferencesButtonAlwaysOn": true
    }
  };
  digitalData = {
    "page": {
      "pageInfo": {
        "ibm": {
          "siteId": "IBM_" + _ibmAnalytics.settings.name,
        }
      },
      "category": {
        "primaryCategory": "PC210"
      }
    }
  };`;

const HeadComponents = [
  <script dangerouslySetInnerHTML={{ __html: script }} />,
  <script src="//1.www.s81c.com/common/stats/ibm-common.js" type="text/javascript" async="async"></script>
];

exports.onRenderBody = ({
  setHeadComponents
}) => {
  setHeadComponents(HeadComponents);
}
