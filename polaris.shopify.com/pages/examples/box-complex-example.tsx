import React from 'react';
import {Box} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBorderRadiusExample() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="400"
      paddingInline={{xs: '0', sm: '400'}}
    >
      <Box
        borderRadius={{xs: '0', sm: '500'}}
        boxShadow={{xs: '0', sm: '400'}}
        overflow="hidden"
        flexGrow={{xs: 1, sm: 0}}
      >
        <Box
          backgroundColor="bg-fill-critical"
          color="text-critical-on-bg-fill"
          padding="400"
        >
          Leave page with unsaved changes?
        </Box>
        <Box display="flex" flexDirection="column" gap="400" padding="400">
          <Box as="p">Leaving this page will delete all unsaved changes.</Box>
          <Box
            alignSelf="flex-end"
            display="flex"
            flexDirection="row"
            gap="400"
          >
            <Box
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
            </Box>
            <Box
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withPolarisExample(BoxWithBorderRadiusExample);
