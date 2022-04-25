import React, {useCallback, useState} from 'react';
import {
  AnalyticsMajor,
  AppsMajor,
  CirclePlusMinor,
  CustomersMajor,
  DiscountsMajor,
  HomeMajor,
  MarketingMajor,
  OrdersMajor,
  ProductsMajor,
  SettingsMajor,
} from '@shopify/polaris-icons';

import {
  Caption,
  Card,
  ChoiceList,
  Frame,
  Image,
  Layout,
  Link,
  Page,
  Scrollable,
  Select,
  TextField,
} from '../src';

import styles from './MobilePrototype.scss';

export function MobilePrototype() {
  // ---- Gift cards ----

  const [selectedGiftCardExpiration, setSelectedGiftCardExpiration] = useState([
    'none',
  ]);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChoiceListChange = useCallback(
    (value) => setSelectedGiftCardExpiration(value),
    [],
  );

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const [selectValue, setSelectValue] = useState('Years');

  const handleConnectedSelectChange = useCallback(
    (value) => setSelectValue(value),
    [],
  );

  const renderChildren = useCallback(
    (selectedGiftCardExpiration) => (
      <TextField
        label="Gift cards expiration"
        labelHidden={true}
        type="number"
        inputMode="numeric"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        autoComplete="off"
        disabled={!selectedGiftCardExpiration}
        connectedRight={
          <Select
            disabled={!selectedGiftCardExpiration}
            value={selectValue}
            label="Time period"
            onChange={handleConnectedSelectChange}
            labelHidden
            options={['Years', 'Months']}
          />
        }
      />
    ),
    [handleTextFieldChange, textFieldValue],
  );

  const [selectedMultiChoice, setSelectedMultiChoice] = useState(['hidden']);

  const handleMultiChoiceChange = useCallback(
    (value) => setSelectedMultiChoice(value),
    [],
  );

  const giftCardsMarkup = (
    <Page>
      <Layout>
        <Image
          source="https://user-images.githubusercontent.com/3474483/164063378-671b89dc-5c3e-47e1-8622-ab39e938de54.png"
          alt="scrappy mobile static banner"
          className={styles.MobileNativeStatic}
        />
        <Scrollable style={{height: '641px'}}>
          <Layout.AnnotatedSection
            id="giftCards"
            title="Auto-expiration"
            description="Set your gift cards to expire a certain amount of time after they've been purchased."
          >
            <Card sectioned>
              <ChoiceList
                title="Expiration"
                titleHidden={true}
                choices={[
                  {
                    label: 'Gift cards never expire',
                    value: 'none',
                    helpText: 'Help text goes here',
                  },
                  {
                    label: 'Gift cards expire',
                    value: 'gift_card_expiration',
                    helpText: 'Help text goes here',
                    renderChildren,
                  },
                ]}
                selected={selectedGiftCardExpiration}
                onChange={handleChoiceListChange}
              />
              <Caption>
                Countries have different laws for gift card expiry dates. Check
                the laws for your country before changing this date.
              </Caption>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            id="appleWallet"
            title="Apple Wallet"
            description={
              <>
                Give your customers a digital gift card to use online or in your
                retail stores.{' '}
                <Link url="#" external>
                  Learn more about Apple Wallet Passes
                </Link>{' '}
              </>
            }
          >
            <Card sectioned>
              <ChoiceList
                allowMultiple
                title="Apple Wallet"
                titleHidden={true}
                choices={[
                  {
                    label: 'Enable Apple Wallet Passes',
                    value: 'shipping',
                    helpText: 'Help text goes here',
                  },
                  {
                    label: 'Label',
                    value: 'confirmation',
                    helpText: 'Help text goes here',
                  },
                ]}
                selected={selectedMultiChoice}
                onChange={handleMultiChoiceChange}
              />
            </Card>
          </Layout.AnnotatedSection>
        </Scrollable>
        <Image
          source="https://user-images.githubusercontent.com/3474483/164063402-bbf4ba88-1279-4f7a-a16c-0c2b9e420b40.png"
          alt="scrappy mobile static footer"
          className={styles.MobileNativeStatic}
        />
      </Layout>
    </Page>
  );

  return <Frame>{giftCardsMarkup}</Frame>;
}
