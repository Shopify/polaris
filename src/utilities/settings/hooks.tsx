import {useContext} from 'react';
import {SettingsContext} from './context';

export function useSettings() {
  return useContext(SettingsContext);
}
