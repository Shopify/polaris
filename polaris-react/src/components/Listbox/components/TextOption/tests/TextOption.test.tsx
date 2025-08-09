import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {Badge} from '../../../../Badge';
import {InlineStack} from '../../../../InlineStack';
import {Text} from '../../../../Text';
import {Icon} from '../../../../Icon';
import {Box} from '../../../../Box';
import {TextOption} from '../TextOption';
import {Listbox} from '../../..';
import {Checkbox} from '../../../../Checkbox';
import {ComboboxListboxOptionContext} from '../../../../../utilities/combobox/context';

describe('TextOption', () => {
  it('renders children', () => {
    const child = 'child';
    const textOption = mountWithApp(<TextOption>{child}</TextOption>);

    expect(textOption).toContainReactText(child);
  });

  it('renders visually disabled text when disabled', () => {
    const textOption = mountWithApp(<TextOption disabled>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption disabled',
    });
  });

  it('renders visually selected text when selected', () => {
    const textOption = mountWithApp(<TextOption selected>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption selected',
    });
  });

  it('renders visual checkbox when allowMultiple is provided', () => {
    const textOption = mountWithApp(
      <ComboboxListboxOptionContext.Provider value={{allowMultiple: true}}>
        <TextOption>child</TextOption>
      </ComboboxListboxOptionContext.Provider>,
    );

    expect(textOption).toContainReactComponent(Checkbox);
  });

  it('does not render visual checkbox when allowMultiple is false', () => {
    const textOption = mountWithApp(
      <ComboboxListboxOptionContext.Provider value={{allowMultiple: false}}>
        <TextOption>child</TextOption>
      </ComboboxListboxOptionContext.Provider>,
    );

    expect(textOption).not.toContainReactComponent(Checkbox);
  });

  it('does not render visual checkbox wrapped in a ListBox.Action', () => {
    const textOption = mountWithApp(
      <ComboboxListboxOptionContext.Provider value={{allowMultiple: true}}>
        <Listbox accessibilityLabel="Listbox with Action example">
          <Listbox.Action value="action">
            <TextOption>child</TextOption>
          </Listbox.Action>
        </Listbox>
      </ComboboxListboxOptionContext.Provider>,
    );

    expect(textOption).not.toContainReactComponent(Checkbox);
  });

  const defaultContext = {
    allowMultiple: false,
  };

  function mountWithContext(
    children: React.ReactNode,
    context = defaultContext,
  ) {
    return mountWithApp(
      <ComboboxListboxOptionContext.Provider value={context}>
        {children}
      </ComboboxListboxOptionContext.Provider>,
    );
  }

  describe('children', () => {
    it('renders string children', () => {
      const textOption = mountWithContext(
        <TextOption>Simple text</TextOption>,
      );

      expect(textOption).toContainReactText('Simple text');
    });

    it('renders ReactNode children', () => {
      const complexContent = (
        <InlineStack gap="200">
          <Text as="span">Complex content</Text>
          <Badge>New</Badge>
        </InlineStack>
      );

      const textOption = mountWithContext(
        <TextOption>{complexContent}</TextOption>,
      );

      expect(textOption).toContainReactComponent(InlineStack, {
        children: [
          expect.objectContaining({
            type: Text,
            props: {as: 'span', children: 'Complex content'},
          }),
          expect.objectContaining({
            type: Badge,
            props: {children: 'New'},
          }),
        ],
      });
    });

    it('wraps ReactNode children in Box when selected', () => {
      const complexContent = (
        <InlineStack gap="200">
          <Text as="span">Complex content</Text>
          <Badge>New</Badge>
        </InlineStack>
      );

      const textOption = mountWithContext(
        <TextOption selected>{complexContent}</TextOption>,
      );

      expect(textOption).toContainReactComponent(Box, {
        width: '100%',
      });
    });

    it('maintains proper layout with ReactNode children in multiple selection mode', () => {
      const complexContent = (
        <InlineStack gap="200">
          <Text as="span">Complex content</Text>
          <Badge>New</Badge>
        </InlineStack>
      );

      const textOption = mountWithContext(
        <TextOption>{complexContent}</TextOption>,
        {allowMultiple: true},
      );

      expect(textOption).toContainReactComponent(Box, {
        width: '100%',
      });
    });
  });
});
