import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const sheet = new ServerStyleSheet();
  //   const originalRenderPage = ctx.renderPage;

  //   try {
  //     ctx.renderPage = () =>
  //       originalRenderPage({
  //         enhanceApp: (App) => (props) =>
  //           sheet.collectStyles(<App {...props} />),
  //       });

  //     const initialProps = await Document.getInitialProps(ctx);
  //     return {
  //       ...initialProps,
  //       styles: (
  //         <>
  //           {initialProps.styles}
  //           {sheet.getStyleElement()}
  //         </>
  //       ),
  //     };
  //   } finally {
  //     sheet.seal();
  //   }
  // }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="preload"
            href="/fonts/Gilroy-Light.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Gilroy-Regular.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Gilroy-Medium.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Gilroy-SemiBold.ttf"
            as="font"
            type="font/truetype"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Gilroy-Bold.ttf"
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
