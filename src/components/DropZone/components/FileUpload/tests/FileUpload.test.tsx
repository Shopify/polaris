import * as React from 'react';
import {Link, Icon, Button, Caption, TextStyle} from 'components';
import {mountWithAppProvider} from 'tests/utilities';
import {Provider} from '../../Context';
import FileUpload from '../FileUpload';

describe('<FileUpload />', () => {
  it('renders large view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'large', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find('img').length).toBe(1);
    expect(fileUpload.find(Button).length).toBe(1);
    expect(fileUpload.find(TextStyle).length).toBe(1);
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'medium', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Link).length).toBe(1);
    expect(fileUpload.find(Caption).length).toBe(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'small', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Icon).length).toBe(1);
  });
});
