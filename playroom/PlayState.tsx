import React, {useState} from 'react';

interface Props {
  state: any;
  children(state: any, setState: any): React.ReactNode;
}

export default function PlayState({state: defaultState, children}: Props) {
  const [state, setState] = useState(defaultState);
  return children(state, setState);
}
