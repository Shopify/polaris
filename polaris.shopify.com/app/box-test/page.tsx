'use client';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import React from 'react';
import {Cube} from '../../src/components/Cube';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <AppProvider i18n={translations}>
      {/*
        <h1>Hello, Cube test!</h1>
        {[...Array(1).keys()].map((id) => (
          <div key={id}>A cube</div>
        ))}
      */}
      <Cube display="flex">
        1. A simple style prop is applied directly to the css declaration.
      </Cube>
      <Cube backgroundColor="bg-fill-info">
        2. A tokenized style prop is converted to the correct Polaris custom
        property.
      </Cube>
      <Cube borderColor="black">
        3. Defaults are applied (in this case; <code>border-style: solid</code>)
      </Cube>
      <Cube borderColor="coral" color="text-emphasis">
        4. Multiple style props are applied at the same time.
      </Cube>
      <Cube padding="400">
        5. Shorthand style props are expanded to their longhand CSS
        declarations.
      </Cube>
      <Cube
        paddingInlineStart="200"
        padding="400"
        paddingBlockStart="600"
        backgroundColor="bg-fill-info"
      >
        6. Shorthand style props are overridden by more specific longhand props
        regardless of prop order.
      </Cube>
      <Cube backgroundColor={{xs: 'bg-fill-warning', md: 'bg-fill-success'}}>
        7. Responsive props are mobile first (ie; least specific style is 'xs'
        breakpoint).
      </Cube>
      <Cube backgroundColor={{md: 'bg-fill-info'}}>
        8. Responsive props fallback to 'unset' when width below smallest
        breakpoint specified.
      </Cube>
      <Cube paddingInline={{md: '400', lg: '800'}}>
        9. Shorthand props are also responsive.
      </Cube>
      <Cube backgroundColor="bg-fill-info">
        10. Nested DOM elements styles are more specific than their parent
        <Cube backgroundColor="bg-fill-warning">Child</Cube>
      </Cube>
      <Cube borderColor="black" paddingInlineStart={{xs: '400', md: '600'}}>
        11. Child styles are scoped to the DOM element; children wont inherit
        parent styles for breakpoints they're missing.
        <Cube borderColor="coral" paddingInlineStart={{lg: '800'}}>
          Child
        </Cube>
      </Cube>
      <Cube color={{xs: 'text-emphasis'}}>
        12. Except when the CSS declaration's default is 'inherit'.
        <Cube color={{md: 'text-warning'}}>
          This child inherits 'color' below 'md' breakpoint.
        </Cube>
      </Cube>
      <Cube
        backgroundColor="bg-fill-info"
        _hover={{backgroundColor: 'bg-fill-warning'}}
      >
        13. Modifiers are more specific than base style props. (hover me!)
      </Cube>
      <Cube
        backgroundColor="bg-fill-success"
        _hover={{
          backgroundColor: {sm: 'bg-fill-warning', md: 'bg-fill-critical'},
        }}
      >
        13. Modifiers are also responsive (hover me above and below 'md'
        breakpoint).
      </Cube>
      <Cube
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="400"
        paddingInline={{xs: '0', sm: '400'}}
      >
        <Cube
          borderRadius={{xs: '0', sm: '500'}}
          boxShadow={{xs: '0', sm: '400'}}
          overflow="hidden"
          flexGrow={{xs: 1, sm: 0}}
        >
          <Cube
            backgroundColor="bg-fill-critical"
            color="text-critical-on-bg-fill"
            padding="400"
          >
            Leave page with unsaved changes?
          </Cube>
          <Cube display="flex" flexDirection="column" gap="400" padding="400">
            <Cube as="p">
              Leaving this page will delete all unsaved changes.
            </Cube>
            <Cube
              alignSelf="flex-end"
              display="flex"
              flexDirection="row"
              gap="400"
            >
              <Cube
                as="button"
                borderRadius="200"
                borderStyle="solid"
                borderWidth="0165"
                paddingInline="300"
                paddingBlock="150"
                _hover={{
                  cursor: 'pointer',
                  backgroundColor: 'bg-fill-hover',
                }}
              >
                Stay
              </Cube>
              <Cube
                as="button"
                backgroundColor="bg-fill-critical"
                color="text-critical-on-bg-fill"
                borderRadius="200"
                borderStyle="solid"
                borderWidth="0165"
                paddingInline="300"
                paddingBlock="150"
                _hover={{
                  cursor: 'pointer',
                  backgroundColor: 'bg-fill-critical-hover',
                }}
              >
                Leave page
              </Cube>
            </Cube>
          </Cube>
        </Cube>
      </Cube>
    </AppProvider>
  );
}
