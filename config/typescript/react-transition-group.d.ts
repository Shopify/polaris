declare module '@material-ui/react-transition-group' {
  import {Component} from 'react';

  import CSSTransitionNameSpace = require('react-transition-group/CSSTransition');
  import {TransitionProps} from 'react-transition-group/Transition';

  type FindDOMNode = () => HTMLElement | null;
  interface CombinedTransitionProps extends TransitionProps {
    findDOMNode: FindDOMNode;
  }
  type CombinedCSSTransitionProps = CSSTransitionNameSpace.CSSTransitionProps &
    CombinedTransitionProps;

  // eslint-disable-next-line react/prefer-stateless-function
  class Transition extends Component<CombinedTransitionProps> {}
  // eslint-disable-next-line react/prefer-stateless-function
  class CSSTransition extends Component<CombinedCSSTransitionProps> {}
  import TransitionGroup = require('react-transition-group/TransitionGroup');

  export {CSSTransition, Transition, TransitionGroup};
}
