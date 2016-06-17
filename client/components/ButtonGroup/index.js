import React, {PropTypes} from 'react';

import Stack from '../Stack';

export default function ButtonGroup({children}) {
  return <Stack>{children}</Stack>;
}

ButtonGroup.propTypes = {children: PropTypes.node};
