import {Button} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function RightAlignedDisclosureButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{width: '200px'}}>
      <Button
        fullWidth
        textAlign="left"
        disclosure={expanded ? 'up' : 'down'}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    </div>
  );
}

export default withPolarisExample(RightAlignedDisclosureButton);
