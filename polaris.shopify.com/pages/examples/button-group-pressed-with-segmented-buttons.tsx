import {ButtonGroup, Button} from '@shopify/polaris';
import {useCallback, useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonGroupPressedWithSegmentedButtonsExample() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const handleButtonClick = useCallback(
    (index: number) => {
      if (activeButtonIndex === index) return;
      setActiveButtonIndex(index);
    },
    [activeButtonIndex],
  );

  return (
    <ButtonGroup segmented>
      <Button
        pressed={activeButtonIndex === 0}
        onClick={() => handleButtonClick(0)}
      >
        Bold
      </Button>
      <Button
        pressed={activeButtonIndex === 1}
        onClick={() => handleButtonClick(1)}
      >
        Italic
      </Button>
      <Button
        pressed={activeButtonIndex === 2}
        onClick={() => handleButtonClick(2)}
      >
        Underline
      </Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(
  ButtonGroupPressedWithSegmentedButtonsExample,
);
