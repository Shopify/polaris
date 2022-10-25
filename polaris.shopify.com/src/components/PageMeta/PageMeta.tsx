import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

function PageMeta({title, description}: Props) {
  let siteName = 'Shopify Polaris';

  if (title) {
    siteName = `${title} — ${siteName}`;
  }

  return (
    <Head>
      <title>{siteName}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
}

export default PageMeta;
