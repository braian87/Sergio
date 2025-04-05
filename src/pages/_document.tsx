import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Sergio López Photography - Professional photographer specializing in weddings, portraits, and product photography" />
          <meta property="og:title" content="Sergio López Photography" />
          <meta property="og:description" content="Professional photographer specializing in weddings, portraits, and product photography" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://sergiolopez-photography.com" />
          <meta property="og:image" content="https://sergiolopez-photography.com/images/og-image.jpg" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
