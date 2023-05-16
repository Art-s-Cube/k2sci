import React from 'react';

class AnalyticsEmbed extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KKJFP4WYF2';
    script.async = true;
    document.body.appendChild(script);

    const analyticsScript = document.createElement('script');
    analyticsScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-KKJFP4WYF2');
    `;
    document.head.appendChild(analyticsScript);
  }

  render() {
    return <div></div>;
  }
}

export default AnalyticsEmbed;
