import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Scrollable} from '../../../../Scrollable';
import {TextContainer} from '../../../../TextContainer';
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

      const popoverPane = mountWithApp(
        <Pane fixed>
          <Children />
        </Pane>,
      );

      expect(popoverPane).not.toContainReactComponent(Scrollable);
    });

    it('renders content in a Scrollable when set to false', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithApp(
        <Pane fixed={false}>
          <Children />
        </Pane>,
      );

      expect(popoverPane).toContainReactComponentTimes(Scrollable, 1);
    });

    it('renders content in a Scrollable when unset', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithApp(
        <Pane>
          <Children />
        </Pane>,
      );

      expect(popoverPane).toContainReactComponentTimes(Scrollable, 1);
    });
  });

  describe('sectioned', () => {
    it('renders children in a Section when set to true', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithApp(
        <Pane sectioned>
          <Children />
        </Pane>,
      );

      expect(popoverPane).toContainReactComponentTimes(Section, 1);
    });

    it('does not render content in a Section when set to false', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithApp(
        <Pane sectioned={false}>
          <Children />
        </Pane>,
      );

      expect(popoverPane).not.toContainReactComponent(Section);
    });

    it('does not render content in a Section when unset', () => {
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithApp(
        <Pane>
          <Children />
        </Pane>,
      );

      expect(popoverPane).not.toContainReactComponent(Section);
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

      const popoverPane = mountWithApp(
        <Pane onScrolledToBottom={onScrolledToBottom}>
          <Children />
        </Pane>,
      );

      popoverPane.find(Scrollable)!.trigger('onScrolledToBottom');

      expect(onScrolledToBottom).toHaveBeenCalled();
    });
  });

  describe('height', () => {
    it('sets a height, max-height and min-height on Scrollable', () => {
      const height = '100px';
      const style = {
        height,
        maxHeight: height,
        minHeight: height,
      };
      const Children = () => (
        <TextContainer>
          <p>Text</p>
        </TextContainer>
      );

      const popoverPane = mountWithApp(
        <Pane height={height}>
          <Children />
        </Pane>,
      );

      expect(popoverPane).toContainReactComponent(Scrollable, {
        style,
      });
    });
  });

  describe('captureOverscroll', () => {
    const Children = () => (
      <TextContainer>
        <p>Text</p>
      </TextContainer>
    );

    describe('when not passed', () => {
      it('does not apply the Pane-captureOverscroll class', () => {
        const popoverPane = mountWithApp(
          <Pane>
            <Children />
          </Pane>,
        );

        expect(popoverPane).toContainReactComponent(Scrollable, {
          className: 'Pane',
        });
      });
    });

    describe('when passed as true', () => {
      it('applies the Pane-captureOverscroll class', () => {
        const popoverPane = mountWithApp(
          <Pane captureOverscroll>
            <Children />
          </Pane>,
        );

        expect(popoverPane).toContainReactComponent(Scrollable, {
          className: 'Pane Pane-captureOverscroll',
        });
      });
    });

    describe('when passed as false', () => {
      it('does not apply the Pane-captureOverscroll class', () => {
        const popoverPane = mountWithApp(
          <Pane captureOverscroll={false}>
            <Children />
          </Pane>,
        );

        expect(popoverPane).toContainReactComponent(Scrollable, {
          className: 'Pane',
        });
      });
    });
  });
});
