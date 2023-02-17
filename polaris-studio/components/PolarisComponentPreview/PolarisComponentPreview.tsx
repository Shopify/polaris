import { components } from "@/components";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import styles from "./PolarisComponentPreview.module.scss";

interface Props {
  componentName: string;
}

function PolarisComponentPreview({ componentName }: Props) {
  const component = components[componentName];

  if (!component) {
    return <p>Component preview not available</p>;
  }

  const { renderPreview } = component;

  return (
    <div className={styles.PolarisComponentPreview}>
      <AppProvider i18n={enTranslations}>
        {renderPreview && renderPreview()}
      </AppProvider>
    </div>
  );
}

export default PolarisComponentPreview;
