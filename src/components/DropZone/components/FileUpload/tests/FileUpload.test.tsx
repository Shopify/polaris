import * as React from 'react';
import {shallowWithAppProvider} from '../../../../../../tests/utilities';

import Link from '../../../../Link';
import Icon from '../../../../Icon';
import Button from '../../../../Button';
import DropZone from '../../../DropZone';
import Caption from '../../../../Caption';
import TextStyle from '../../../../TextStyle';

describe('<DropZone />', () => {
  it('renders large view', () => {
    const fileUpload = shallowWithAppProvider(<DropZone.FileUpload />, {
      context: {
        size: 'large',
        type: 'file',
      },
    });

    expect(fileUpload.find('img').length).toBe(1);
    expect(fileUpload.find(Button).length).toBe(1);
    expect(fileUpload.find(TextStyle).length).toBe(1);
  });

  it('renders medium view', () => {
    const fileUpload = shallowWithAppProvider(<DropZone.FileUpload />, {
      context: {
        size: 'medium',
      },
    });

    expect(fileUpload.find(Link).length).toBe(1);
    expect(fileUpload.find(Caption).length).toBe(1);
  });

  it('renders small view', () => {
    const fileUpload = shallowWithAppProvider(<DropZone.FileUpload />, {
      context: {
        size: 'small',
      },
    });

    expect(fileUpload.find(Icon).length).toBe(1);
  });
});
