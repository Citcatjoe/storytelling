import Script from "next/script";

export function Consent() {
  return (
    <>
      {/* OneTrust Cookies Consent Notice */}
      <Script 
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" 
        data-document-language="true" 
        type="text/javascript" 
        charSet="UTF-8" 
        data-domain-script="d57e5842-f42f-46bc-a4ea-4a82bd82322c"
        strategy="beforeInteractive"
      />
      <Script id="optanon-wrapper" strategy="beforeInteractive">
        {`function OptanonWrapper() { }`}
      </Script>
    </>
  );
}
