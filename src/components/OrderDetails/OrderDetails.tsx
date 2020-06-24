import React, {useEffect, useState} from 'react';
import AddressFormatter from '@shopify/address';

import {ThemeProvider} from '../ThemeProvider';
import {Card} from '../Card';
import {TextContainer} from '../TextContainer';
import {Thumbnail} from '../Thumbnail';
import {Stack} from '../Stack';
import {Button} from '../Button';
import {TextStyle} from '../TextStyle';

export function OrderDetails() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const address = {
      company: 'Shopify',
      firstName: '恵子',
      lastName: '田中',
      address1: '八重洲1-5-3',
      address2: '',
      city: '目黒区',
      province: 'JP-13',
      zip: '100-8994',
      country: 'JP',
      phone: '',
    };

    const addressFormatter = new AddressFormatter('ja');

    (async () => {
      try {
        const formattedAddress = await addressFormatter.format(address);
        setAddress(formattedAddress.join(','));
      } catch {
        // Do nothing for now
      }
    })();
  });

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
            <TextContainer>
              Buy postage and ship 2 items to {address}
            </TextContainer>
            <Button>Continue</Button>
          </Stack>
        </Card.Section>
      </Card>
    </ThemeProvider>
  );
}
