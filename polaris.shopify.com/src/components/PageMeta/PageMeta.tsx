import Head from "next/head";
import { getTitleTagValue } from "../../utils/various";

interface Props {
  title?: string;
  description?: string;
}

function PageMeta({ title, description }: Props) {
  return (
    <Head>
      <title>{getTitleTagValue(title)}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
}

export default PageMeta;
