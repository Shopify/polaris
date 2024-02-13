import {ActionList, Thumbnail, Icon, Avatar} from '@shopify/polaris';
import {ChevronRightIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ActionListWithPrefixSuffixExample() {
  return (
    <div style={{height: '250px', maxWidth: '350px'}}>
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Go here',
            prefix: (
              <Thumbnail
                source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                size="small"
                alt="Black leather pet collar"
              />
            ),
            suffix: <Icon source={ChevronRightIcon} />,
          },
          {
            content: 'Or there',
            prefix: <Avatar customer name="Farrah" size="sm" />,
            suffix: <Icon source={ChevronRightIcon} />,
          },
        ]}
      />
    </div>
  );
}

export default withPolarisExample(ActionListWithPrefixSuffixExample);
