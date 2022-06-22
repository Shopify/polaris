import Head from "next/head";
import Image from "next/image";

import Longform from "../components/Longform";
import Container from "../components/Container";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Longform>
            <Image src="/blah.png" width={200} height={200} />
            <h1>There’s no page at this address</h1>
            <p>
              Check the URL and try again, or use the search field to find what
              you need.
            </p>
            <p>
              If there should be something here [let us
              know](https://github.com/shopify/polaris/issues/new?title=[404]%20polaris.shopify.com&labels=polaris.shopify.com).
            </p>
          </Longform>
        </div>
      </Container>
    </>
  );
}
