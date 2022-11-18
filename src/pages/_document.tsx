import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { ColorModeScript } from '@chakra-ui/react';
import emotionCache from '../lib/emotion-cache';

const { extractCritical } = createEmotionServer(emotionCache);

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <style
          key="emotion-css"
          dangerouslySetInnerHTML={{ __html: styles.css }}
          data-emotion-css={styles.ids.join(' ')}
        />,
      ],
    };
  }

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
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
