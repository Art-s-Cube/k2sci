
import React from 'react';

class analyticsEmbed extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KKJFP4WYF2';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return <div></div>;
  }
}

export default analyticsEmbed;
