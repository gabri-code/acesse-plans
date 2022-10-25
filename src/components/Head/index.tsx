import Head from 'next/head';

interface HeadProps {
  title: string;
}

export function HeadComponent({ title }: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
