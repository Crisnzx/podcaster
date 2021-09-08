import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          {/* Page Content */}
          <Main />
          {/* Scripts tags that our project needs to have */}
          <NextScript />
        </body>
      </Html>
    );
  }
}







// here in nextjs, we don't have the index.html file visible for us,
// so if we need to add some <link> tag to add fonts or something like that
// we need to create this file and follow next documentation

