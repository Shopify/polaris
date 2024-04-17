import React from 'react';

import type {IconSource} from '../../../..';
import {Box} from '../../../Box';
import {Button} from '../../../Button';

interface Props {
  source: IconSource;
  disabled: boolean;
  onPress: () => void;
}

export function StepperButton({source, disabled, onPress}: Props) {
  return (
    <Box padding="300">
      <Button disabled={disabled} icon={source} onClick={onPress} />
    </Box>
  );
}
