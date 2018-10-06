import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities/enzyme';
import {WithContextTypes} from '../../../types';
import withContext from '../WithContext';

interface ContextTypes {
  test: boolean;
}

interface HeaderProps {
  title: string;
}

const defaultContext = {test: true};

const {Provider, Consumer} = React.createContext<ContextTypes>(defaultContext);

describe('withContext', () => {
  it('passes the consumer context to the wrapped component', () => {
    const Header = () => <h1>Polaris</h1>;
    const WrappedHeader = withContext(Consumer)(Header);
    const element = mountWithAppProvider(
      <Provider value={defaultContext}>
        <WrappedHeader />
      </Provider>,
    );
    expect(element.find(Header).prop('context')).toEqual(defaultContext);
  });

  it('passes the the original props to the wrapped component', () => {
    const title = 'Polaris';
    const Header = ({title}: HeaderProps) => <h1>{title}</h1>;
    const WrappedHeader = () => (
      <header>
        <Header title={title} />
      </header>
    );
    const WrappedHeaderWithContext = withContext(Consumer)(WrappedHeader);
    const element = mountWithAppProvider(
      <Provider value={defaultContext}>
        <WrappedHeaderWithContext />
      </Provider>,
    );
    const {context, ...rest} = element.find(Header).props() as HeaderProps &
      WithContextTypes<ContextTypes>;
    expect(rest).toEqual({title});
  });
});
