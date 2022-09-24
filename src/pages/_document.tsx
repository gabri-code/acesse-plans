import React from 'react';
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="preload"
            href="/fonts/Poppins-Light.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Regular.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Medium.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Poppins-SemiBold.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Bold.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
