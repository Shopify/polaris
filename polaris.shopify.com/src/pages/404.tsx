import Page from "../components/Page";
import Longform from "../components/Longform";
import EmptyState from "../components/EmptyState";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  const issueTitle = `[polaris.shopify.com] 404 not found at ${router.asPath}`;
  const issueUrl = `https://github.com/shopify/polaris/issues/new?title=${issueTitle}&amp;labels=polaris.shopify.com`;
  const title = "404 - There is no page at this address";
  const description =
    "Check the URL and try again, or use the search field to find what you need.";

  return (
    <Page title={title} description={description}>
      <EmptyState
        icon="CircleAlertMajor"
        title={title}
        description={description}
      >
        <Longform>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>
            If there should be something here <a href={issueUrl}>let us know</a>
            .
          </p>
        </Longform>
      </EmptyState>
    </Page>
  );
}
