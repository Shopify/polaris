import { AppProvider, ButtonGroup,Button } from "@shopify/polaris";
import { useState,useCallback } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
function PressedButton() {
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
  }, [isFirstButtonActive]);

  return (
    <ButtonGroup segmented>
      <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
        First button
      </Button>
      <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
        Second button
      </Button>
    </ButtonGroup>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <PressedButton />
      </div>
    </AppProvider>
  );
}

export default Example;
    