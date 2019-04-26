import React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Page} from '../src';
import {UIStateController} from './UIState';

interface Props {
  title?: string;
  breadcrumbs?: boolean;
  action?: boolean;
  secondaryActions?: boolean;
  state?: string;
  children: React.ReactNode;
}

export interface PageActionsState {
  dirty: boolean;
  loading: boolean;
  onClick(): void;
}

export interface PageActionsContextType extends PageActionsState {
  setPageActionsState(state: any): void;
}

export const PageActionsContext = React.createContext({
  dirty: false,
  loading: false,
  setPageActionsState: (state: any) => {},
});

class PlayroomPage extends React.PureComponent<Props, PageActionsState> {
  state = {
    dirty: false,
    loading: false,
    onClick() {
      return null;
    },
  };

  render() {
    const {
      title,
      children,
      action,
      breadcrumbs,
      secondaryActions,
      state,
    } = this.props;
    const {dirty, loading, onClick} = this.state;
    return (
      <PageActionsContext.Provider
        value={{
          dirty,
          loading,
          setPageActionsState: this.setPageActionsState,
        }}
      >
        <Page
          breadcrumbs={breadcrumbs && [{content: 'Previous Page', url: '#'}]}
          title={title || 'Mock Title'}
          primaryAction={
            action && {
              content: 'Primary Action',
              disabled: !dirty,
              loading,
              onAction: onClick,
            }
          }
          secondaryActions={
            secondaryActions && [
              {content: 'Secondary Action 1'},
              {content: 'Secondary Action 2'},
            ]
          }
        >
          <UIStateController state={state}>{children}</UIStateController>
        </Page>
      </PageActionsContext.Provider>
    );
  }

  @autobind
  private setPageActionsState(newState: any) {
    this.setState(newState);
  }
}

export default PlayroomPage;
