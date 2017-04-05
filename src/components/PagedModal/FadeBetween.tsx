import * as React from 'react';
import {TransitionGroup, TransitionStatus} from '@shopify/react-utilities/animation';
import {classNames} from '@shopify/react-utilities/styles';

import * as styles from './PagedModal.scss';

export interface Props {
  children?: React.ReactNode,
  component?: string | React.ComponentClass<any> | React.Factory<any>,
  contentKey: number,
}

export default class FadeBetween extends React.Component<Props, {}> {
  render() {
    const {
      component = FadeContainer,
      contentKey,
    } = this.props;

    const fadeBetweenWithTransitionWithStatus = (transitionStatus: TransitionStatus) => {
      const {children} = this.props;

      return (
        <FadeBetweenContent transitionStatus={transitionStatus}>
          {children}
        </FadeBetweenContent>
      );
  };

    return (
      <TransitionGroup component={component}>
        <TransitionGroup.TransitionChild
          skipAppearing
          key={contentKey}
          render={fadeBetweenWithTransitionWithStatus}
        />
      </TransitionGroup>
    );
  }
}

function FadeContainer(props: {children?: React.ReactElement<{}>}) {
  return (
    <div className={styles.FadeContainer}>
      {props.children}
    </div>
  );
}

interface TransitionableProps {
  children?: React.ReactNode,
  transitionStatus: TransitionStatus,
}

function FadeBetweenContent({children, transitionStatus}: TransitionableProps) {
  const classes = classNames(
    styles.FadeBetween,
    transitionStatus && animationVariations(transitionStatus),
  );
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case TransitionStatus.Shown:
    case TransitionStatus.AppearingStart:
    case TransitionStatus.Appearing:
      return null;
    case TransitionStatus.EnteringStart:
      return styles.enteringStart;
    case TransitionStatus.Entering:
      return styles.entering;
    case TransitionStatus.LeavingStart:
      return styles.leavingStart;
    case TransitionStatus.Leaving:
      return styles.leaving;
  }
}
