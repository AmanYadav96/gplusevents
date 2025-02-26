import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="GPlus Event Website" />
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.jpg" />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@300;400;500;600;700;800&amp;family=Open+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Archivo:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/flaticon.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        {/* <link rel="stylesheet" href="assets/css/swiper-bundle.min.css" /> */}
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/aos.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/page.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async strategy="beforeInteractive" src="/assets/js/vendor/jquery-1.12.4.min.js"></script>
        <script async src="/assets/js/vendor/modernizr-3.11.7.min.js"></script>
        <script async src="/assets/js/popper.min.js"></script>
        <script async src="/assets/js/bootstrap.min.js"></script>
        {/* <script async src="assets/js/swiper-bundle.min.js"></script> */}
        <script async src="/assets/js/all.js"></script>
        {/* <script async src="/assets/js/back-to-top.js"></script> */}
        <script async src="/assets/js/jquery.magnific-popup.min.js"></script>
        <script async src="/assets/js/jquery.counterup.min.js"></script>
        <script async src="/assets/js/waypoints.min.js"></script>
        <script async src="/assets/js/aos.js"></script>
        <script async src="/assets/js/jquery.nice-select.min.js"></script>
        <script async src="/assets/js/main.js"></script>
      </body>
    </Html>
  );
}
