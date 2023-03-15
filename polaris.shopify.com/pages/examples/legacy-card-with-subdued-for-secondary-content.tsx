import {LegacyCard, List} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Deactivated staff accounts" sectioned subdued>
      <List>
        <List.Item>Felix Crafford</List.Item>
        <List.Item>Ezequiel Manno</List.Item>
      </List>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
