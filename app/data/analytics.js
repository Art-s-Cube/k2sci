import Script from 'next/script'

function AnalyticsEmbed() {
  return (
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=id=G-KKJFP4WYF2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
           window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-KKJFP4WYF2');
        `}
      </Script>
  )
}

export default AnalyticsEmbed
