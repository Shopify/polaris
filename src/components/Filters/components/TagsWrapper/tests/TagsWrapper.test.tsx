import {mountWithApp} from 'tests/utilities';

import {TagsWrapper} from '../TagsWrapper';
import {VisuallyHidden} from '../../../../VisuallyHidden';

const MockChild = () => <div />;

describe('<TagsWrapper />', () => {
  it('renders visually hidden component when hidden is true', () => {
    const tagsWrapper = mountWithApp(
      <TagsWrapper hidden>
        <MockChild />
      </TagsWrapper>,
    );

    expect(tagsWrapper).toContainReactComponent(VisuallyHidden);
    expect(tagsWrapper.find(VisuallyHidden)).toContainReactComponent(MockChild);
  });

  it('renders children directly when hidden is false', () => {
    const tagsWrapper = mountWithApp(
      <TagsWrapper hidden={false}>
        <MockChild />
      </TagsWrapper>,
    );

    expect(tagsWrapper).not.toContainReactComponent(VisuallyHidden);
    expect(tagsWrapper).toContainReactComponent(MockChild);
  });
});
