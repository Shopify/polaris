import React, {PropTypes} from 'react';

import Stack from '../Stack';
import {Spacing} from '../shared';

export default function ButtonGroup({children}) {
  return <Stack spacing={Spacing.tight}>{children}</Stack>;
}

ButtonGroup.propTypes = {children: PropTypes.node};
