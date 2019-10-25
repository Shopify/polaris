import React from 'react';
import {MonorailContext} from './context';

export function useMonorail() {
  return React.useContext(MonorailContext);
}
