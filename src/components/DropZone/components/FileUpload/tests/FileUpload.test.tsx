import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';

import DropZone from '../../../DropZone';
import {Provider} from '../../Context';
import Link from '../../../../Link';
import Icon from '../../../../Icon';
import Button from '../../../../Button';
import Caption from '../../../../Caption';
import TextStyle from '../../../../TextStyle';

describe('<DropZone />', () => {
  it('renders large view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'large', type: 'file'}}>
        <DropZone.FileUpload />
      </Provider>,
    );

    expect(fileUpload.find('img').length).toBe(1);
    expect(fileUpload.find(Button).length).toBe(1);
    expect(fileUpload.find(TextStyle).length).toBe(1);
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'medium', type: 'file'}}>
        <DropZone.FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Link).length).toBe(1);
    expect(fileUpload.find(Caption).length).toBe(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'small', type: 'file'}}>
        <DropZone.FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Icon).length).toBe(1);
  });
});
