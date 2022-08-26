import React from "react";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function FrameComponent({ theme = enTranslations, children }: { theme: any; children: React.ReactNode }) {
  return <AppProvider i18n={theme}>{children}</AppProvider>;
}
