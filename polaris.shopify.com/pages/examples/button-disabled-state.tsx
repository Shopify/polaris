import {ButtonGroup, Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return (
    <ButtonGroup>
      <Button disabled>Buy shipping label</Button>
      <Button primary disabled>
        Buy shipping label
      </Button>
      <Button destructive disabled>
        Buy shipping label
      </Button>
      <Button outline disabled>
        Buy shipping label
      </Button>
      <span style={{color: '#bf0711'}}>
        <Button outline monochrome disabled>
          Buy shipping label
        </Button>
      </span>
      <Button plain disabled>
        Buy shipping label
      </Button>
      <Button plain destructive disabled>
        Buy shipping label
      </Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(ButtonExample);
