import React from 'react';
import {mountWithListboxProvider} from 'tests/utilities/listbox';
import {AddMajor} from '@shopify/polaris-icons';

import {Listbox} from '../../../../Listbox';
import {MappedAction} from '../MappedAction';
import {MappedActionContext} from '../../../../../utilities/autocomplete';
import {Badge} from '../../../../Badge';
import {Icon} from '../../../../Icon';

describe('MappedAction', () => {
  it('renders badge when provided', () => {
    const badge = {
      tone: 'new' as const,
      content: 'new',
    };
    const mappedAction = mountWithListboxProvider(
      <MappedAction badge={badge} />,
    );

    expect(mappedAction).toContainReactComponent(Badge, {
      tone: badge.tone,
      children: badge.content,
    });
  });

  it('renders suffix when provided', () => {
    const mappedAction = mountWithListboxProvider(
      <MappedAction suffix={<MockComponent />} />,
    );

    expect(mappedAction).toContainReactComponent(MockComponent);
  });

  it('renders helpText when provided', () => {
    const helpText = 'help text';
    const mappedAction = mountWithListboxProvider(
      <MappedAction helpText={helpText} />,
    );

    expect(mappedAction).toContainReactText(helpText);
  });

  it('renders ellipsis when true', () => {
    const mappedAction = mountWithListboxProvider(
      <MappedAction ellipsis content="content for ellipsis" />,
    );

    expect(mappedAction).toContainReactText('…');
  });

  it('renders MappedActionContext provider with values', () => {
    const props = {
      role: 'role',
      url: 'url',
      external: false,
      onAction: () => {},
      destructive: false,
    };
    const mappedAction = mountWithListboxProvider(<MappedAction {...props} />);

    expect(mappedAction).toContainReactComponent(MappedActionContext.Provider, {
      value: {
        ...props,
      },
    });
  });

  describe('Listbox.Action', () => {
    it('renders', () => {
      const mappedAction = mountWithListboxProvider(<MappedAction />);

      expect(mappedAction).toContainReactComponent(Listbox.Action);
    });

    it('passes active', () => {
      const mappedAction = mountWithListboxProvider(<MappedAction active />);

      expect(mappedAction).toContainReactComponent(Listbox.Action, {
        selected: true,
      });
    });

    it('passes disabled', () => {
      const disabled = true;
      const mappedAction = mountWithListboxProvider(
        <MappedAction disabled={disabled} />,
      );

      expect(mappedAction).toContainReactComponent(Listbox.Action, {
        disabled,
      });
    });

    it('passes value', () => {
      const value = 'value';
      const mappedAction = mountWithListboxProvider(
        <MappedAction content={value} />,
      );

      expect(mappedAction).toContainReactComponent(Listbox.Action, {
        value,
      });
    });

    it('defaults value to an empty string', () => {
      const value = '';
      const mappedAction = mountWithListboxProvider(<MappedAction />);

      expect(mappedAction).toContainReactComponent(Listbox.Action, {
        value,
      });
    });
  });

  describe('prefix markup', () => {
    it('renders images', () => {
      const image = 'image';
      const mappedAction = mountWithListboxProvider(
        <MappedAction image={image} />,
      );

      expect(mappedAction).toContainReactComponent('div', {
        role: 'presentation',
      });
    });

    it('renders icon', () => {
      const source = AddMajor;
      const mappedAction = mountWithListboxProvider(
        <MappedAction icon={source} />,
      );

      expect(mappedAction).toContainReactComponent(Icon, {source});
    });

    it('renders prefix', () => {
      const mappedAction = mountWithListboxProvider(
        <MappedAction prefix={<MockComponent />} />,
      );

      expect(mappedAction).toContainReactComponent(MockComponent);
    });

    it('renders icon instead of image', () => {
      const source = AddMajor;
      const image = 'image';
      const mappedAction = mountWithListboxProvider(
        <MappedAction icon={source} image={image} />,
      );

      expect(mappedAction).toContainReactComponent(Icon, {source});
      expect(mappedAction).not.toContainReactComponent('div', {
        role: 'presentation',
      });
    });

    it('renders prefix instead of image', () => {
      const image = 'image';
      const mappedAction = mountWithListboxProvider(
        <MappedAction prefix={<MockComponent />} image={image} />,
      );

      expect(mappedAction).toContainReactComponent(MockComponent);
      expect(mappedAction).not.toContainReactComponent('div', {
        role: 'presentation',
      });
    });

    it('renders prefix instead of icon', () => {
      const source = AddMajor;
      const mappedAction = mountWithListboxProvider(
        <MappedAction prefix={<MockComponent />} icon={source} />,
      );

      expect(mappedAction).toContainReactComponent(MockComponent);
      expect(mappedAction).not.toContainReactComponent(Icon, {
        source,
      });
    });
  });
});

function MockComponent() {
  return null;
}
