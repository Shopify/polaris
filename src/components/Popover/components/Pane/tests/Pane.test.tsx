import React from 'react';
import {TextContainer, Scrollable} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';

import {Pane} from '../Pane';
import {Section} from '../../Section';

describe('<Pane />', () => {
  describe('fixed', () => {
    it('does not render content in a Scrollable when set to true', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane fixed>
          <Children />
        </Pane>,
      );

      expect(popoverPane.find(Scrollable)).toHaveLength(0);
    });

    it('renders content in a Scrollable when set to false', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane fixed={false}>
          <Children />
        </Pane>,
      );

      expect(popoverPane.find(Scrollable)).toHaveLength(1);
    });

    it('renders content in a Scrollable when unset', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane>
          <Children />
        </Pane>,
      );

      expect(popoverPane.find(Scrollable)).toHaveLength(1);
    });
  });

  describe('sectioned', () => {
    it('renders children in a Section when set to true', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane sectioned>
          <Children />
        </Pane>,
      );

      expect(popoverPane.find(Section)).toHaveLength(1);
    });

    it('does not render content in a Section when set to false', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane sectioned={false}>
          <Children />
        </Pane>,
      );

      expect(popoverPane.find(Section)).toHaveLength(0);
    });

    it('does not render content in a Section when unset', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane>
          <Children />
        </Pane>,
      );

      expect(popoverPane.find(Section)).toHaveLength(0);
    });
  });

  describe('onScrolledToBottom', () => {
    it('is set on the Scrollable when provided', () => {
      const onScrolledToBottom = jest.fn();
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithAppProvider(
        <Pane onScrolledToBottom={onScrolledToBottom}>
          <Children />
        </Pane>,
      );

      trigger(popoverPane.find(Scrollable).first(), 'onScrolledToBottom');

      expect(onScrolledToBottom).toHaveBeenCalled();
    });
  });
});
