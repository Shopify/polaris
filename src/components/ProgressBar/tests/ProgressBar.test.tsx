import * as React from 'react';
import {shallow} from 'enzyme';
import ProgressBar from '../';

describe('<ProgressBar />', () => {
  it('sets the progress element to 80 when the progress is 80', () => {
    const progress = shallow(<ProgressBar progress={80}>test</ProgressBar>);
    expect(progress.find('progress').prop('value')).toBe(80);
  });

  it('sets the progress element to 0 when the progress is negative', () => {
    const progress = shallow(<ProgressBar progress={-40}>test</ProgressBar>);
    expect(progress.find('progress').prop('value')).toBe(0);
  });

  it('sets the progress element to 100 when the progress is greater than 100', () => {
    const progress = shallow(<ProgressBar progress={120}>test</ProgressBar>);
    expect(progress.find('progress').prop('value')).toBe(100);
  });
});
