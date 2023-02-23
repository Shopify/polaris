import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

function PageMeta({title, description, noIndex = false}: Props) {
  let siteName = 'Shopify Polaris';

  if (title) {
    siteName = `${title} — ${siteName}`;
  }

  return (
    <Head>
      <title>{siteName}</title>
      {noIndex ? <meta name="robots" content="noindex"></meta> : null}
      {description && <meta name="description" content={description} />}
    </Head>
  );
}

export default PageMeta;
