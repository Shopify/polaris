import * as React from 'react';
import {TextContainer, Scrollable} from 'components';
import {mountWithAppProvider, trigger} from 'test-utilities';
import Pane from '../Pane';
import Section from '../../Section';

describe('<Pane />', () => {
  describe('fixed', () => {
    it('does not render content in a Scrollable when set to true', async () => {
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(
        <Pane fixed>{children}</Pane>,
      );

      expect(popoverPane.find(Scrollable)).toHaveLength(0);
    });

    it('renders content in a Scrollable when set to false', async () => {
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(
        <Pane fixed={false}>{children}</Pane>,
      );

      expect(popoverPane.find(Scrollable)).toHaveLength(1);
    });

    it('renders content in a Scrollable when unset', async () => {
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(<Pane>{children}</Pane>);

      expect(popoverPane.find(Scrollable)).toHaveLength(1);
    });
  });

  describe('sectioned', () => {
    it('renders children in a Section when set to true', async () => {
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(
        <Pane sectioned>{children}</Pane>,
      );

      expect(popoverPane.find(Section)).toHaveLength(1);
    });

    it('does not render content in a Section when set to false', async () => {
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(
        <Pane sectioned={false}>{children}</Pane>,
      );

      expect(popoverPane.find(Section)).toHaveLength(0);
    });

    it('does not render content in a Section when unset', async () => {
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(<Pane>{children}</Pane>);

      expect(popoverPane.find(Section)).toHaveLength(0);
    });
  });

  describe('onScrolledToBottom', () => {
    it('is set on the Scrollable when provided', async () => {
      const onScrolledToBottom = jest.fn();
      const children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = await mountWithAppProvider(
        <Pane onScrolledToBottom={onScrolledToBottom}>{children}</Pane>,
      );

      trigger(popoverPane.find(Scrollable).first(), 'onScrolledToBottom');

      expect(onScrolledToBottom).toHaveBeenCalled();
    });
  });
});
