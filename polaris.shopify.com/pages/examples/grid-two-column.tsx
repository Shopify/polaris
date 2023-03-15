import {Page, Grid, LegacyCard} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function GridExample() {
  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <LegacyCard title="Sales" sectioned>
            <p>View a summary of your online store’s sales.</p>
          </LegacyCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <LegacyCard title="Orders" sectioned>
            <p>View a summary of your online store’s orders.</p>
          </LegacyCard>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export default withPolarisExample(GridExample);
