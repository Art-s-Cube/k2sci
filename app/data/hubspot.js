import React from 'react';

class HubSpotEmbed extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = '//js.hs-scripts.com/7387985.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return <div></div>;
  }
}

export default HubSpotEmbed;
