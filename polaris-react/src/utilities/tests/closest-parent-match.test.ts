import {closestParentMatch} from '../closest-parent-match';

describe('closest-parent-match', () => {
  it('matches first parent element', () => {
    const {parent, child, matcher} = setUpParentAndChild();
    const closestParent = closestParentMatch(child, matcher);

    expect(parent).toBe(closestParent);
  });

  it('matches nested elements', () => {
    const {parent, nestedChild, matcher} = setUpParentAndChild();
    const closestParent = closestParentMatch(nestedChild, matcher);

    expect(parent).toBe(closestParent);
  });
});

function setUpParentAndChild() {
  const id = 'parent';

  const parent = document.createElement('div');
  const child = document.createElement('div');
  const nestedChild = document.createElement('div');

  parent.id = id;
  parent.append(child, nestedChild);

  return {parent, child, nestedChild, matcher: `#${id}`};
}
