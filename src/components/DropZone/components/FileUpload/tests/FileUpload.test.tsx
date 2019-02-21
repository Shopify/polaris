import * as React from 'react';
import {Link, Icon, Button, Caption, TextStyle} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import {Provider} from '../../Context';
import FileUpload from '../FileUpload';
import {Size} from '../../../types';

describe('<FileUpload />', () => {
  it('renders large view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Large, height: Size.Large, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find('img')).toHaveLength(1);
    expect(fileUpload.find(Button)).toHaveLength(1);
    expect(fileUpload.find(TextStyle)).toHaveLength(1);
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Medium, height: Size.Medium, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Link)).toHaveLength(1);
    expect(fileUpload.find(Caption)).toHaveLength(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Small, height: Size.Small, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Icon)).toHaveLength(1);
  });

  it('renders the smaller view when width is small but height is large', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Small, height: Size.Large, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );
    expect(fileUpload.find(Icon)).toHaveLength(1);
  });
});
