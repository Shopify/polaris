import Head from "next/head";
import Image from "next/image";

import Longform from "../Longform";
import Container from "../Container";
import styles from "./Error404Page.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

interface Props {}

function Error404Page({}: Props) {
  const router = useRouter();
  const [githubUrl, setGithubUrl] = useState(router.asPath);

  useEffect(() => {
    const title = `[polaris.shopify.com] 404 not found at ${router.asPath}`;
    const newGithubUrl = `https://github.com/shopify/polaris/issues/new?title=${title}&amp;labels=polaris.shopify.com`;
    setGithubUrl(newGithubUrl);
  }, [router.asPath]);

  return (
    <div className={styles.Error404Page}>
      <Head>
        <title>404 — Page not found</title>
      </Head>
      <Container>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Longform>
            <Image
              className={styles.Icon}
              src="/icons/CircleAlertMajor.svg"
              width={100}
              height={100}
              alt=""
            />
            <h1 style={{ marginTop: "2rem" }}>
              There’s no page at this address
            </h1>
            <p>
              Check the URL and try again, or use the search field to find what
              you need.
            </p>
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

export default Error404Page;
