import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {SearchIcon} from '@shopify/polaris-icons';

import {Icon} from '../../Icon';
import {Tag} from '../Tag';

describe('<Tag />', () => {
  describe('onRemove', () => {
    it('calls onRemove when remove button is clicked', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onRemove={spy} />);
      tag.find('button')!.domNode!.click();
      expect(spy).toHaveBeenCalled();
    });

    it('does not call onRemove when remove button is disabled', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onRemove={spy} disabled />);
      tag.find('button')!.domNode!.click();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    it('calls onClick when tag is clicked', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onClick={spy} />);
      tag.find('button')!.domNode!.click();
      expect(spy).toHaveBeenCalled();
    });

    it('does not call onClick when disabled', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onClick={spy} disabled />);
      tag.find('button')!.domNode!.click();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('url', () => {
    it('renders an anchor tag when url is provided', () => {
      const tag = mountWithApp(<Tag url="#" />);
      expect(tag).toContainReactComponent('a', {href: '#'});
    });

    it('allows url and onRemove props at the same time', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onRemove={spy} url="#" />);
      tag.find('button')!.domNode!.click();
      expect(spy).toHaveBeenCalled();
      expect(tag).toContainReactComponent('a', {href: '#'});
    });

    it('renders plain text when the tag is disabled', () => {
      const tag = mountWithApp(
        <Tag url="#" disabled>
          #
        </Tag>,
      );
      expect(tag).not.toContainReactComponent('a', {href: '#'});
      expect(tag).toContainReactComponent('span', {children: '#'});
    });
  });

  describe('children', () => {
    it('accepts simple strings as children', () => {
      const tag = mountWithApp(<Tag>children</Tag>);
      expect(tag).toContainReactComponent('span', {
        children: 'children',
        title: 'children',
      });
    });

    it('accepts React components as children', () => {
      const tag = mountWithApp(
        <Tag>
          <Icon source={SearchIcon} />
        </Tag>,
      );
      expect(tag).toContainReactComponent(Icon, {source: SearchIcon});
    });
  });

  describe('accessibilityLabel', () => {
    it('uses children to render title if no accessibilityLabel prop is provided', () => {
      const tag = mountWithApp(<Tag>children</Tag>);
      expect(tag).toContainReactComponent('span', {
        children: 'children',
        title: 'children',
      });
    });

    it('uses the accessibilityLabel prop to render title when a string is received as children', () => {
      const tag = mountWithApp(
        <Tag accessibilityLabel="customTitle">children</Tag>,
      );
      expect(tag).toContainReactComponent('span', {
        children: 'children',
        title: 'customTitle',
      });
    });

    it('uses the accessibilityLabel prop to render title when a component is received as children and url prop is passed', () => {
      const tag = mountWithApp(
        <Tag accessibilityLabel="customTitle" url="#">
          <Icon source={SearchIcon} />
        </Tag>,
      );
      expect(tag).toContainReactComponent('span', {
        title: 'customTitle',
      });
    });

    it('does not render the title attribute if accessibilityLabel is `undefined` when a component is received as children and url prop is passed', () => {
      const tag = mountWithApp(
        <Tag url="#">
          <Icon source={SearchIcon} />
        </Tag>,
      );
      expect(tag).not.toContainReactComponent('span', {
        title: '',
      });
      expect(tag).toContainReactComponent('span', {
        title: undefined,
      });
    });
  });
});
