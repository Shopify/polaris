import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Connected} from '../../Connected';
import {InlineError} from '../../InlineError';
import {Labelled} from '../../Labelled';
import {Select} from '../../Select';
import {Tag} from '../../Tag';
import {Resizer, Spinner} from '../components';
import {TextField} from '../TextField';
import styles from '../TextField.scss';

describe('<TextField />', () => {
  it('allows specific props to pass through properties on the input', () => {
    const pattern = '\\d\\d';
    const inputMode = 'numeric';
    const input = mountWithApp(
      <TextField
        label="TextField"
        disabled
        readOnly={false}
        onChange={noop}
        autoFocus
        name="TextField"
        placeholder="A placeholder"
        value="Some value"
        min={20}
        max={50}
        minLength={2}
        maxLength={2}
        spellCheck={false}
        pattern={pattern}
        inputMode={inputMode}
        align="left"
        autoComplete="name"
      />,
    );

    expect(input).toContainReactComponent('input', {
      disabled: true,
      readOnly: false,
      autoFocus: true,
      placeholder: 'A placeholder',
      value: 'Some value',
      max: 50,
      minLength: 2,
      maxLength: 2,
      name: 'TextField',
      spellCheck: false,
      pattern,
      min: 20,
      inputMode,
      autoComplete: 'name',
    });
  });

  it('blocks props not listed as component props to pass on the input', () => {
    const input = mountWithApp(
      <TextField
        label="TextField"
        disabled
        readOnly={false}
        onChange={noop}
        name="TextField"
        placeholder="A placeholder"
        value="Some value"
        prefix="test-prefix"
        autoComplete="off"
      />,
    );

    expect(input).toContainReactComponent('input', {
      prefix: undefined,
    });
  });

  it('always has an `aria-labelledby` property', () => {
    const textField = mountWithApp(
      <TextField label="TextField" onChange={noop} autoComplete="off" />,
    );

    expect(textField).toContainReactComponent('input', {
      'aria-labelledby': 'PolarisTextField1Label',
    });
  });

  describe('click events', () => {
    it('bubbles up to the parent element when it occurs in the input', () => {
      const onClick = jest.fn();
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      const textField = mountWithApp(
        <div onClick={onClick}>
          <TextField type="text" label="TextField" autoComplete="off" />
        </div>,
      );

      textField.find('input')!.domNode?.dispatchEvent(event);
      expect(onClick).toHaveBeenCalled();
    });

    it('bubbles up to the parent element when it occurs in the spinner', () => {
      const onClick = jest.fn();
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      const textField = mountWithApp(
        <div onClick={onClick}>
          <TextField type="number" label="TextField" autoComplete="off" />
        </div>,
      );

      textField.find(Spinner)!.domNode?.dispatchEvent(event);
      expect(onClick).toHaveBeenCalled();
    });

    it('does not bubble up to the parent element when it occurs in an element other than the input', () => {
      const onClick = jest.fn();
      const children = 'vertical-content-children';
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      const verticalContent = <span>{children}</span>;
      const textField = mountWithApp(
        <div onClick={onClick}>
          <TextField
            type="text"
            label="TextField"
            autoComplete="off"
            verticalContent={verticalContent}
          />
        </div>,
      );

      textField.find('span', {children})!.domNode?.dispatchEvent(event);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <TextField
          id="MyTextField"
          label="TextField"
          onChange={spy}
          autoComplete="off"
        />,
      );

      element.find('input')!.trigger('onChange', {
        currentTarget: {
          value: 'two',
        },
      });
      expect(spy).toHaveBeenCalledWith('two', 'MyTextField');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      mountWithApp(
        <TextField
          label="TextField"
          onFocus={spy}
          onChange={noop}
          autoComplete="off"
        />,
      )
        .find('input')!
        .trigger('onFocus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is blurred', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <TextField
          label="TextField"
          onBlur={spy}
          onChange={noop}
          autoComplete="off"
        />,
      );
      element.find('input')!.trigger('onBlur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        id: 'MyField',
      });
    });

    it('sets a random id on the input when none is passed', () => {
      const textField = mountWithApp(
        <TextField label="TextField" onChange={noop} autoComplete="off" />,
      );

      expect(textField).toContainReactComponent('input', {
        id: 'PolarisTextField1',
      });
    });

    it('updates with the new id from props', () => {
      const id = 'input field';
      const textField = mountWithApp(
        <TextField label="TextField" onChange={noop} autoComplete="off" />,
      );
      textField.setProps({id});
      expect(textField).toContainReactComponent('input', {
        id,
      });
    });

    it('updates with the previous id after the id prop has been removed', () => {
      const id = 'input field';
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id={id}
          onChange={noop}
          autoComplete="off"
        />,
      );
      textField.setProps({});
      expect(textField).toContainReactComponent('input', {
        id,
      });
    });
  });

  describe('focused', () => {
    it('input is in focus state if focused is true', () => {
      const element = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          autoComplete="off"
          focused
        />,
      );

      expect(document.activeElement).toBe(element.find('input')!.domNode);
    });

    it('focuses input if focused is toggled', () => {
      const element = mountWithApp(
        <TextField label="TextField" onChange={noop} autoComplete="off" />,
      );

      element.setProps({focused: true});

      expect(document.activeElement).toBe(element.find('input')!.domNode);
    });

    it('blurs input if focused is toggled', () => {
      const element = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          autoComplete="off"
          focused
        />,
      );

      element.setProps({focused: false});

      expect(document.activeElement).not.toBe(element.find('input')!.domNode);
    });

    it('multiline input is in focus state if focused is true', () => {
      const element = mountWithApp(
        <TextField
          label="MultiLineTextField"
          onChange={noop}
          autoComplete="off"
          focused
          multiline={3}
        />,
      );

      expect(document.activeElement).toBe(element.find('textarea')!.domNode);
    });
  });

  describe('autoComplete', () => {
    it('is passed to input as autoComplete', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          autoComplete="firstName"
          onChange={noop}
        />,
      );
      expect(textField).toContainReactComponent('input', {
        autoComplete: 'firstName',
      });
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          helpText="Some help"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        'aria-describedby': 'PolarisTextField1HelpText',
      });
      expect(textField.find('div')).toContainReactText('Some help');
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const textField = mountWithApp(
        <TextField
          error={<span>Invalid</span>}
          label="TextField"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        'aria-invalid': true,
      });

      textField.setProps({error: 'Some error'});

      expect(textField).toContainReactComponent('input', {
        'aria-invalid': true,
      });
    });

    it('connects the input to the error', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          error="Some error"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        'aria-describedby': 'PolarisTextField1Error',
      });
    });

    it('connects the input to an error rendered separately', () => {
      const errorMessage = 'Some error';
      const textFieldID = 'collectionRuleType';
      const fieldGroup = mountWithApp(
        <div>
          <TextField
            error={Boolean(errorMessage)}
            id={textFieldID}
            label="textField"
            onChange={noop}
            autoComplete="off"
          />
          <InlineError message={errorMessage} fieldID={textFieldID} />
        </div>,
      );

      expect(fieldGroup.find(TextField)).toContainReactComponent('input', {
        'aria-describedby': 'collectionRuleTypeError',
        'aria-invalid': true,
      });
    });

    it('connects the input to both an error and help text', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          error="Some error"
          helpText="Some help"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        'aria-describedby': 'PolarisTextField1Error PolarisTextField1HelpText',
      });

      expect(textField.find('div')).toContainReactText('Some error');
      expect(textField.find('div')).toContainReactText('Some help');
    });

    it('only renders error markup when not a boolean', () => {
      const textField = mountWithApp(
        <TextField
          error
          label="TextField"
          helpText="Some help"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).not.toContainReactComponent(InlineError);

      textField.setProps({error: 'Some error'});
      expect(textField).toContainReactComponent(InlineError);
    });
  });

  describe('prefix', () => {
    it('connects the input to the prefix and label', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          prefix="$"
          onChange={noop}
          autoComplete="off"
        />,
      );

      const labels = textField
        .find('input')!
        .prop('aria-labelledby')!
        .split(' ');

      expect(labels).toHaveLength(2);

      const label = textField.find('label', {
        id: labels[0],
      });

      const prefix = textField.find('div', {
        id: labels[1],
      });

      expect(label?.text()).toBe('TextField');
      expect(prefix?.text()).toBe('$');
    });

    it('connects the input to the prefix, suffix, and label', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          prefix="$"
          suffix=".00"
          onChange={noop}
          autoComplete="off"
        />,
      );

      const labels = textField
        .find('input')!
        .prop('aria-labelledby')!
        .split(' ');

      expect(labels).toHaveLength(3);

      const label = textField.find('label', {
        id: labels[0],
      });

      const prefix = textField.find('div', {
        id: labels[1],
      });

      const suffix = textField.find('div', {
        id: labels[2],
      });

      expect(label?.text()).toBe('TextField');
      expect(prefix?.text()).toBe('$');
      expect(suffix?.text()).toBe('.00');
    });

    it('does not set focus `onClick` for the <input /> if the `target` is the `prefix`', () => {
      const mockButtonId = 'MockPrefix';
      const mockPrefixButton = <button id={mockButtonId} onClick={noop} />;
      const textField = mountWithApp(
        <TextField
          label="TextField"
          prefix={mockPrefixButton}
          onChange={noop}
          autoComplete="off"
        />,
      );

      const button = textField.find('button', {id: mockButtonId})!.domNode!;

      textField
        .find('div', {className: styles.TextField})!
        .trigger('onClick', {target: button});

      expect(textField.find(Connected)!).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.focus),
      });
    });
  });

  describe('suffix', () => {
    it('connects the input to the suffix and label', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          suffix="kg"
          onChange={noop}
          autoComplete="off"
        />,
      );
      const labels = textField
        .find('input')!
        .prop('aria-labelledby')!
        .split(' ');
      expect(labels).toHaveLength(2);

      expect(
        textField.find('label', {
          id: `${labels[0]}`,
        }),
      )!.toContainReactText('TextField');

      expect(
        textField.find('div', {
          id: `${labels[1]}`,
        }),
      )!.toContainReactText('kg');
    });

    it('does not set focus `onClick` for the <input /> if the `target` is the `suffix`', () => {
      const mockButtonId = 'MockSuffix';
      const mockSuffixButton = <button id={mockButtonId} onClick={noop} />;
      const textField = mountWithApp(
        <TextField
          label="TextField"
          suffix={mockSuffixButton}
          onChange={noop}
          autoComplete="off"
        />,
      );
      const button = textField.find('button', {id: mockButtonId})!.domNode!;

      textField
        .find('div', {className: styles.TextField})!
        .trigger('onClick', {target: button});

      expect(textField.find(Connected)!).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.focus),
      });
    });
  });

  describe('verticalContent', () => {
    it('connects the input to the inline vertical content and label', () => {
      const tags = ['Antique'];
      const verticalContent = tags.map((tag) => <Tag key={tag}>{tag}</Tag>);
      const textField = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          autoComplete="off"
          verticalContent={verticalContent}
        />,
      );
      const labels = textField
        .find('input')!
        .prop('aria-labelledby')!
        .split(' ');
      expect(labels).toHaveLength(2);

      expect(
        textField.find('label', {
          id: `${labels[0]}`,
        }),
      )!.toContainReactText('TextField');

      expect(
        textField.find('div', {
          id: `${labels[1]}`,
        }),
      )!.toContainReactText('Antique');
    });

    it('sets focus on the input when focused', () => {
      const tags = ['Rustic'];
      const verticalContent = tags.map((tag) => (
        <Tag key={tag} onRemove={noop}>
          {tag}
        </Tag>
      ));
      const textField = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          autoComplete="off"
          verticalContent={verticalContent}
          focused
        />,
      );

      expect(document.activeElement).toBe(textField.find('input')!.domNode);
    });
  });

  describe('characterCount', () => {
    it('displays number of characters entered in input field', () => {
      const textField = mountWithApp(
        <TextField
          value="test"
          showCharacterCount
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
        />,
      );

      const div = textField.find('div', {
        id: 'MyField-CharacterCounter',
      });

      expect(div).toContainReactText('4');
      expect(div!.props).toHaveProperty('aria-label', '4 characters');
    });

    it('displays remaining characters as fraction in input field with maxLength', () => {
      const textField = mountWithApp(
        <TextField
          value="T"
          maxLength={10}
          showCharacterCount
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
        />,
      );

      const div = textField.find('div', {
        id: 'MyField-CharacterCounter',
      });

      expect(div).toContainReactText('1/10');
      expect(div!.props).toHaveProperty(
        'aria-label',
        '1 of 10 characters used',
      );
    });

    it('announces updated character count only when input field is in focus', () => {
      const textField = mountWithApp(
        <TextField
          value="test"
          showCharacterCount
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('div', {
        id: 'MyField-CharacterCounter',
        'aria-live': 'off',
      });

      const textFieldDiv = textField.find('div', {
        className: 'TextField hasValue',
      })!;
      // onClick callback sets dom focus on input
      textFieldDiv.trigger('onClick', {target: textFieldDiv.domNode!});

      expect(textField).toContainReactComponent('div', {
        id: 'MyField-CharacterCounter',
        'aria-live': 'polite',
      });
    });
  });

  describe('type', () => {
    it('sets the type on the input', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          type="email"
          onChange={noop}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        type: 'email',
      });
    });

    describe('number', () => {
      it('adds an increment button that increases the value', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="3"
            onChange={spy}
            autoComplete="off"
          />,
        );
        element!
          .find('div', {
            role: 'button',
          })!
          .trigger('onClick');
        expect(spy).toHaveBeenCalledWith('4', 'MyTextField');
      });

      it('adds a decrement button that increases the value', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="3"
            onChange={spy}
            autoComplete="off"
          />,
        );

        element
          .findAll('div', {
            role: 'button',
          })[1]!
          .trigger('onClick');
        expect(spy).toHaveBeenCalledWith('2', 'MyTextField');
      });

      it('does not call the onChange if the value is not a number', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="not a number"
            onChange={spy}
            autoComplete="off"
          />,
        );

        element!
          .find('div', {
            role: 'button',
          })!
          .trigger('onClick');

        expect(spy).not.toHaveBeenCalled();
      });

      it('handles incrementing from no value', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            onChange={spy}
            autoComplete="off"
          />,
        );
        element
          .findAll('div', {
            role: 'button',
          })[0]!
          .trigger('onClick');
        expect(spy).toHaveBeenCalledWith('1', 'MyTextField');
      });

      it('passes the step prop to the input', () => {
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            step={6}
            value="4"
            onChange={noop}
            autoComplete="off"
          />,
        );

        expect(element).toContainReactComponent('input', {
          step: 6,
        });
      });

      it('uses the step prop when incrementing', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            step={0.5}
            value="1.25"
            onChange={spy}
            autoComplete="off"
          />,
        );
        element!
          .find('div', {
            role: 'button',
          })!
          .trigger('onClick');
        expect(spy).toHaveBeenCalledWith('1.75', 'MyTextField');
      });

      it('respects a min value', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            min={2}
            value="2"
            onChange={spy}
            autoComplete="off"
          />,
        );

        element
          .findAll('div', {
            role: 'button',
          })[1]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('2', 'MyTextField');

        element
          .findAll('div', {
            role: 'button',
          })[0]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('3', 'MyTextField');
      });

      it('respects a max value', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            max={2}
            value="2"
            onChange={spy}
            autoComplete="off"
          />,
        );

        element
          .findAll('div', {
            role: 'button',
          })[0]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('2', 'MyTextField');

        element
          .findAll('div', {
            role: 'button',
          })[1]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('1', 'MyTextField');
      });

      it('brings an invalid value up to the min', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            min={2}
            value="-1"
            onChange={spy}
            autoComplete="off"
          />,
        );

        element
          .findAll('div', {
            role: 'button',
          })[0]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('2', 'MyTextField');

        element
          .findAll('div', {
            role: 'button',
          })[1]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('2', 'MyTextField');
      });

      it('brings an invalid value down to the max', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            max={2}
            value="12"
            onChange={spy}
            autoComplete="off"
          />,
        );

        element
          .findAll('div', {
            role: 'button',
          })[0]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('2', 'MyTextField');

        element
          .findAll('div', {
            role: 'button',
          })[1]!
          .trigger('onClick');
        expect(spy).toHaveBeenLastCalledWith('2', 'MyTextField');
      });

      it('removes increment and decrement buttons when disabled', () => {
        const element = mountWithApp(
          <TextField
            id="MyNumberField"
            label="NumberField"
            type="number"
            autoComplete="off"
            disabled
          />,
        );
        expect(element).not.toContainReactComponent('[role="button"]');
      });

      it('removes increment and decrement buttons when readOnly', () => {
        const element = mountWithApp(
          <TextField
            id="MyNumberField"
            label="NumberField"
            type="number"
            autoComplete="off"
            readOnly
          />,
        );
        expect(element).not.toContainReactComponent(Spinner);
      });

      it('removes spinner buttons when type is number and step is 0', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyNumberField"
            label="NumberField"
            type="number"
            step={0}
            onChange={spy}
            autoComplete="off"
          />,
        );
        expect(element).not.toContainReactComponent(Spinner);
      });

      it('increments by step when value, step, or both are float numbers', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="3.02"
            step={1.044}
            onChange={spy}
            autoComplete="off"
          />,
        );

        element.findAll('div', {role: 'button'})[0].trigger('onClick');
        expect(spy).toHaveBeenCalledWith('4.064', 'MyTextField');
      });

      it('decrements by step when value, step, or both are float numbers', () => {
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="3.02"
            step={1.044}
            onChange={spy}
            autoComplete="off"
          />,
        );
        element.findAll('div', {role: 'button'})[1].trigger('onClick');

        expect(spy).toHaveBeenCalledWith('1.976', 'MyTextField');
      });

      it('decrements on mouse down', () => {
        jest.useFakeTimers();
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="3"
            onChange={spy}
            autoComplete="off"
          />,
        );
        element
          .findAll('div', {role: 'button'})[1]
          .trigger('onMouseDown', {button: 0});

        jest.runOnlyPendingTimers();
        expect(spy).toHaveBeenCalledWith('2', 'MyTextField');
      });

      it('stops decrementing on mouse up', () => {
        jest.useFakeTimers();
        const spy = jest.fn();
        const element = mountWithApp(
          <TextField
            id="MyTextField"
            label="TextField"
            type="number"
            value="3"
            onChange={spy}
            autoComplete="off"
          />,
        );

        const buttonDiv = element.findAll('div', {role: 'button'})[1];

        buttonDiv.trigger('onMouseDown', {button: 0});
        buttonDiv.trigger('onMouseUp');

        jest.runOnlyPendingTimers();
        expect(spy).not.toHaveBeenCalled();
      });

      describe('document events', () => {
        type EventCallback = (mockEventData?: {[key: string]: any}) => void;

        const documentEvent: {[eventType: string]: EventCallback} = {};

        beforeAll(() => {
          jest
            .spyOn(document, 'addEventListener')
            .mockImplementation(
              (eventType: string, callback: EventCallback) => {
                documentEvent[eventType] = callback;
              },
            );
        });

        afterAll(() => {
          (document.addEventListener as jest.Mock).mockRestore();
        });

        it('stops decrementing on mouse up anywhere in document', () => {
          jest.useFakeTimers();
          const spy = jest.fn();
          const element = mountWithApp(
            <TextField
              id="MyTextField"
              label="TextField"
              type="number"
              value="3"
              onChange={spy}
              autoComplete="off"
            />,
          );

          element
            .findAll('div', {role: 'button'})[1]
            .trigger('onMouseDown', {button: 0});

          documentEvent.mouseup();

          jest.runOnlyPendingTimers();
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('multiline', () => {
    it('does not render a resizer if `multiline` is false', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
        />,
      );
      expect(textField).not.toContainReactComponent(Resizer);
    });

    it('renders a resizer with `minimumLines` set to 1 if `multiline` is true', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
          multiline
        />,
      );
      expect(textField).toContainReactComponentTimes(Resizer, 1, {
        minimumLines: 1,
      });
    });

    it('renders a resizer with `minimumLines` set to the `multiline` numeric value', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          multiline={5}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponentTimes(Resizer, 1, {
        minimumLines: 5,
      });
    });

    it('passes the `placeholder` to the resizer `contents` prop', () => {
      const placeholderText = 'placeholder text';
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          placeholder={placeholderText}
          multiline={5}
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponentTimes(Resizer, 1, {
        contents: placeholderText,
      });
    });
  });

  describe('aria labels', () => {
    it('sets aria labels on the input element', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          ariaOwns="Aria owns"
          ariaExpanded
          ariaActiveDescendant="Aria active descendant"
          ariaAutocomplete="inline"
          ariaControls="Aria controls"
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent('input', {
        'aria-owns': 'Aria owns',
        'aria-expanded': true,
        'aria-activedescendant': 'Aria active descendant',
        'aria-autocomplete': 'inline',
        'aria-controls': 'Aria controls',
      });
    });

    it('renders a textarea element with `aria-multiline` set to true if multiline greater than 0', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          multiline={4}
          ariaOwns="Aria owns"
          ariaActiveDescendant="Aria active descendant"
          ariaAutocomplete="Aria autocomplete"
          ariaControls="Aria controls"
          autoComplete="off"
        />,
      );
      expect(textField).toContainReactComponent('textarea', {
        'aria-multiline': true,
      });
    });

    it('renders an input element without `aria-multiline` if multiline is equal to 0', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          multiline={0}
          ariaOwns="Aria owns"
          ariaActiveDescendant="Aria active descendant"
          ariaAutocomplete="Aria autocomplete"
          ariaControls="Aria controls"
          autoComplete="off"
        />,
      );
      expect(textField).toContainReactComponent('input', {
        'aria-multiline': undefined,
      });
    });

    it('renders an input element without `aria-multiline` if multiline is undefined', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          ariaOwns="Aria owns"
          ariaActiveDescendant="Aria active descendant"
          ariaAutocomplete="Aria autocomplete"
          ariaControls="Aria controls"
          autoComplete="off"
        />,
      );
      expect(textField).toContainReactComponent('input', {
        'aria-multiline': undefined,
      });
    });
  });

  describe('Labelled', () => {
    it('passes props to Labelled', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          helpText="Help text"
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent(Labelled, {
        id: 'MyField',
        label: 'TextField',
        helpText: 'Help text',
      });
    });

    it('passes error to Labelled', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          error
          autoComplete="off"
        />,
      );

      expect(textField).toContainReactComponent(Labelled, {
        error: true,
      });
    });

    it('passes labelHidden to Labelled', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          autoComplete="off"
          labelHidden
        />,
      );

      expect(textField).toContainReactComponent(Labelled, {
        labelHidden: true,
      });
    });
  });

  describe('Connected', () => {
    it('passes props to Connected', () => {
      const connectedLeft = (
        <Select
          label="Currency unit"
          labelHidden
          options={['$', '€']}
          onChange={noop}
        />
      );
      const connectedRight = (
        <Select
          label="Weight unit"
          labelHidden
          options={['kg', 'lb']}
          onChange={noop}
        />
      );
      const textField = mountWithApp(
        <TextField
          label="TextField"
          id="MyField"
          onChange={noop}
          connectedLeft={connectedLeft}
          connectedRight={connectedRight}
          autoComplete="off"
          prefix
        />,
      );

      expect(textField).toContainReactComponent(Connected, {
        left: connectedLeft,
        right: connectedRight,
      });
    });

    it('sets focus to the <input /> `onClick`', () => {
      const textField = mountWithApp(
        <TextField label="TextField" onChange={noop} autoComplete="off" />,
      );

      expect(document.activeElement).not.toBe(textField.find('input')!.domNode);

      textField.find(Connected)!.triggerKeypath('children.props.onClick', {});

      expect(document.activeElement).toBe(textField.find('input')!.domNode);
    });
  });

  describe('clearButton', () => {
    it('renders a clear button when true', () => {
      const textField = mountWithApp(
        <TextField
          id="MyTextField"
          label="TextField"
          onChange={noop}
          type="text"
          value="test value"
          autoComplete="off"
          clearButton
        />,
      );
      expect(textField).toContainReactComponent('button', {
        className: 'ClearButton',
      });
    });

    it('does not render a clear button in inputs without a value', () => {
      const textField = mountWithApp(
        <TextField
          id="MyTextField"
          label="TextField"
          type="text"
          onChange={noop}
          autoComplete="off"
          clearButton
        />,
      );

      expect(textField).not.toContainReactComponent('button', {
        className: 'ClearButton',
      });
    });

    it('calls onClearButtonClicked() with an id when the clear button is clicked', () => {
      const spy = jest.fn();
      const textField = mountWithApp(
        <TextField
          id="MyTextField"
          label="TextField"
          type="search"
          onChange={noop}
          onClearButtonClick={spy}
          value="test value"
          autoComplete="off"
          clearButton
        />,
      );

      textField.find('button', {className: 'ClearButton'})!.trigger('onClick');

      expect(spy).toHaveBeenCalledWith('MyTextField');
    });

    it('does not render a clear button by default', () => {
      const textField = mountWithApp(
        <TextField
          id="MyTextField"
          label="TextField"
          onChange={noop}
          type="text"
          value="test value"
          autoComplete="off"
        />,
      );

      expect(textField).not.toContainReactComponent('button', {
        className: 'ClearButton',
      });
    });

    it('adds a connected left and right class when a connected element is present', () => {
      const textField = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          connectedLeft={<div />}
          connectedRight={<div />}
          autoComplete="off"
        />,
      );
      expect(textField).toContainReactComponent('div', {
        className: 'Backdrop Backdrop-connectedLeft Backdrop-connectedRight',
      });
    });
  });

  describe('requiredIndicator', () => {
    it('passes requiredIndicator prop to Labelled', () => {
      const element = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          autoComplete="off"
          requiredIndicator
        />,
      );

      expect(element).toContainReactComponent(Labelled, {
        requiredIndicator: true,
      });
    });
  });

  describe('monospaced', () => {
    it('applies the monospaced style', () => {
      const input = mountWithApp(
        <TextField
          label="TextField"
          onChange={noop}
          monospaced
          autoComplete="off"
        />,
      );

      expect(input).toContainReactComponent('input', {
        className: expect.stringContaining('monospaced'),
      });
    });
  });

  describe('selectTextOnFocus', () => {
    it('selects entire input onFocus', () => {
      const value = 'test';
      const selection = {start: 0, end: value.length};

      const element = mountWithApp(
        <TextField
          value={value}
          label="TextField"
          onChange={noop}
          selectTextOnFocus
          autoComplete="off"
        />,
      );

      element?.find('input')!.trigger('onFocus');

      const textareaDOMNode = element.find('input')!
        .domNode as HTMLInputElement;

      const currentSelection = {
        start: textareaDOMNode.selectionStart,
        end: textareaDOMNode.selectionEnd,
      };

      expect(currentSelection).toStrictEqual(selection);
    });

    it('selects entire textarea onFocus', () => {
      const value = 'multiline';
      const selection = {start: 0, end: value.length};

      const element = mountWithApp(
        <TextField
          value={value}
          label="TextField"
          onChange={noop}
          selectTextOnFocus
          autoComplete="off"
          multiline
        />,
      );

      element?.find('textarea')!.trigger('onFocus');

      const textareaDOMNode = element.find('textarea')!
        .domNode as HTMLTextAreaElement;

      const currentSelection = {
        start: textareaDOMNode.selectionStart,
        end: textareaDOMNode.selectionEnd,
      };

      expect(currentSelection).toStrictEqual(selection);
    });
  });

  describe('suggestion', () => {
    it('selects entire input when suggestion is set but value is empty', () => {
      const value = '';
      const suggestion = 'test';
      const element = mountWithApp(
        <TextField
          value={value}
          label="TextField"
          onChange={noop}
          autoComplete="off"
        />,
      );

      element.setProps({suggestion});

      const input = element.find('input')!.domNode as HTMLInputElement;
      const expectedSelection = {start: value.length, end: suggestion.length};
      const currentSelection = {
        start: input.selectionStart,
        end: input.selectionEnd,
      };

      expect(currentSelection).toStrictEqual(expectedSelection);
    });

    it('selects the suggestion text not matching the value', () => {
      const value = 't';
      const suggestion = 'test';
      const element = mountWithApp(
        <TextField
          focused
          value=""
          suggestion=""
          label="TextField"
          onChange={jest.fn()}
          autoComplete="off"
        />,
      );

      element.setProps({value, suggestion});

      const expectedSelection = {start: value.length, end: suggestion.length};
      const input = element.find('input')!.domNode as HTMLInputElement;
      const currentSelection = {
        start: input.selectionStart,
        end: input.selectionEnd,
      };

      expect(currentSelection).toStrictEqual(expectedSelection);
    });
  });
});

function noop() {}
