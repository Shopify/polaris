import { Banner } from "@shopify/polaris";
import { useEffect, useRef } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function BannerWithFocusExample() {
  const banner = useRef();

  useEffect(() => banner.current.focus(), []);

  return (
    <Banner
      title="High risk of fraud detected"
      onDismiss={() => {}}
      status="critical"
      ref={banner}
    >
      <p>
        Before fulfilling this order or capturing payment, please review the
        fraud analysis and determine if this order is fraudulent
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerWithFocusExample);
