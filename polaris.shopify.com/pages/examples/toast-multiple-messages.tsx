import {Toast, Frame, Page, ButtonGroup, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function MultipleToastExample() {
  const [activeToasts, setActiveToasts] = useState<number[]>([]);

  const toggleActive = (id: number) =>
    setActiveToasts((activeToasts) => {
      const isToastActive = activeToasts.includes(id);
      return isToastActive
        ? activeToasts.filter((activeToast) => activeToast !== id)
        : [...activeToasts, id];
    });

  const toggleActiveOne = useCallback(() => toggleActive(1), []);

  const toggleActiveTwo = useCallback(() => toggleActive(2), []);

  const toggleActiveThree = useCallback(() => toggleActive(3), []);

  const toggleActiveFour = useCallback(() => toggleActive(4), []);

  const toggleActiveFive = useCallback(() => toggleActive(5), []);

  const toggleActiveSix = useCallback(() => toggleActive(6), []);

  const toastDuration = 5000;

  const toastMarkup1 = activeToasts.includes(1) ? (
    <Toast
      content="Message sent 1"
      onDismiss={toggleActiveOne}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup2 = activeToasts.includes(2) ? (
    <Toast
      content="Image uploaded 2"
      onDismiss={toggleActiveTwo}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup3 = activeToasts.includes(3) ? (
    <Toast
      content="Notification sent 3"
      onDismiss={toggleActiveThree}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup4 = activeToasts.includes(4) ? (
    <Toast
      content="Content updated 4"
      onDismiss={toggleActiveFour}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup5 = activeToasts.includes(5) ? (
    <Toast
      content="Server error 5"
      error
      onDismiss={toggleActiveFive}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup6 = activeToasts.includes(6) ? (
    <Toast
      content="Sidekick enabled 6"
      tone="magic"
      onDismiss={toggleActiveSix}
      duration={toastDuration}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Multiple Messages">
          <ButtonGroup variant="segmented">
            <Button onClick={toggleActiveOne}>Show toast 1</Button>
            <Button onClick={toggleActiveTwo}>Show toast 2</Button>
            <Button onClick={toggleActiveThree}>Show toast 3</Button>
            <Button onClick={toggleActiveFour}>Show toast 4</Button>
            <Button onClick={toggleActiveFive}>Show toast 5 (error)</Button>
            <Button onClick={toggleActiveSix}>Show toast 6 (Magic) </Button>
          </ButtonGroup>
          {toastMarkup1}
          {toastMarkup2}
          {toastMarkup3}
          {toastMarkup4}
          {toastMarkup5}
          {toastMarkup6}
        </Page>
      </Frame>
    </div>
  );
}

export default withPolarisExample(MultipleToastExample);
