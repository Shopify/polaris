import {LegacyCard, Popover, Button, ActionList, List} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard>
      <LegacyCard.Header
        actions={[
          {
            content: 'Preview',
          },
        ]}
        title="Staff accounts"
      >
        <Popover
          active
          activator={
            <Button disclosure plain>
              Add account
            </Button>
          }
          onClose={() => {}}
        >
          <ActionList items={[{content: 'Member'}, {content: 'Admin'}]} />
        </Popover>
      </LegacyCard.Header>
      <LegacyCard.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
