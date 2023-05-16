import React from 'react';

class AnalyticsEmbed extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KKJFP4WYF2';
    script.async = true;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-KKJFP4WYF2');
  }

  render() {
    return <div></div>;
  }
}

export default AnalyticsEmbed;
