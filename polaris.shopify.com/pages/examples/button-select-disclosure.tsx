import {Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return (
    <div style={{height: '100px'}}>
      <Button disclosure="select" onClick={() => console.log('Open Popover')}>
        Select options
      </Button>
    </div>
  );
}

export default withPolarisExample(ButtonExample);
