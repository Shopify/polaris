import { Page, Grid, Card } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function GridExample() {
  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Card title="Sales" sectioned>
            <p>View a summary of your online store’s sales.</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Card title="Orders" sectioned>
            <p>View a summary of your online store’s orders.</p>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export default withPolarisExample(GridExample);
