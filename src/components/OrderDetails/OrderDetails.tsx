import React from 'react';

import {ThemeProvider} from '../ThemeProvider';
import {Card} from '../Card';
import {TextContainer} from '../TextContainer';
import {Thumbnail} from '../Thumbnail';
import {Stack} from '../Stack';
import {Button} from '../Button';
import {TextStyle} from '../TextStyle';

export interface OrderDetailsProps {}

export class OrderDetails extends React.PureComponent<OrderDetailsProps> {
  render() {
    return (
      <ThemeProvider
        theme={{
          colorScheme: 'dark',
          colors: {
            surface: '#020c1d',
            secondary: '#103560',
            interactive: '#009973',
          },
        }}
      >
        <Card title="Order details">
          <Card.Section title="Unfulfilled">
            <Stack alignment="center" distribution="equalSpacing">
              <Stack alignment="center">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                  alt="Black choker necklace"
                />
                <TextStyle variation="positive">Enamel pin</TextStyle>
              </Stack>
              <span>$9.99</span>
            </Stack>
          </Card.Section>
          <Card.Section>
            <Stack distribution="equalSpacing" alignment="center">
              <TextContainer>Buy postage and ship 2 items</TextContainer>
              <Button>Continue</Button>
            </Stack>
          </Card.Section>
        </Card>
      </ThemeProvider>
    );
  }
}
