import Head from "next/head";
import Image from "next/image";

import Longform from "../Longform";
import Container from "../Container";
import styles from "./ErrorPage.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
  statusCode?: number;
}

function ErrorPage({ statusCode = 404 }: Props) {
  const router = useRouter();
  const [githubUrl, setGithubUrl] = useState(router.asPath);

  useEffect(() => {
    const issueTitle = `[polaris.shopify.com] ${statusCode} not found at ${router.asPath}`;
    const newGithubUrl = `https://github.com/shopify/polaris/issues/new?title=${issueTitle}&amp;labels=polaris.shopify.com`;
    setGithubUrl(newGithubUrl);
  }, [statusCode, router.asPath]);

  const title =
    statusCode === 404
      ? "There’s no page at this address"
      : "Something went wrong";

  const description =
    statusCode === 404
      ? "Check the URL and try again, or use the search field to find what you need."
      : "The Polaris team has been notified of the error.";

  return (
    <div className={styles.ErrorPage}>
      <Head>
        <title>{statusCode} — Page not found</title>
      </Head>
      <Container>
        <div className={styles.Text}>
          <Longform>
            <Image
              className={styles.Icon}
              src="/icons/CircleAlertMajor.svg"
              width={100}
              height={100}
              alt=""
            />

            <h1>{title}</h1>
            <p>{description}</p>
            <p>
              If there should be something here{" "}
              <a href={githubUrl}>let us know</a>.
            </p>
          </Longform>
        </div>
      </Container>
    </div>
  );
}

export default ErrorPage;
