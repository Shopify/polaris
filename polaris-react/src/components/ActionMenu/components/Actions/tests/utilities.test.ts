import {getVisibleAndHiddenActionsIndices} from '../utilities';

describe('getVisibleAndHiddenActionsIndices', () => {
  const actions = ['Action 1', 'Action 2', 'Action 3'];
  const groups = ['Group 1', 'Group 2'];
  const disclosureWidth = 20;
  const actionsWidths = [50, 60, 70, 80, 90];
  const containerWidth = 400;

  it('returns all actions and groups as visible when container width is greater than the sum of tab widths', () => {
    const result = getVisibleAndHiddenActionsIndices(
      actions,
      groups,
      disclosureWidth,
      actionsWidths,
      containerWidth,
    );

    expect(result.visibleActions).toStrictEqual([0, 1, 2]);
    expect(result.hiddenActions).toStrictEqual([]);
    expect(result.visibleGroups).toStrictEqual([0, 1]);
    expect(result.hiddenGroups).toStrictEqual([]);
  });

  it('hides actions and groups that exceed the container width', () => {
    const customContainerWidth = 100;
    const result = getVisibleAndHiddenActionsIndices(
      actions,
      groups,
      disclosureWidth,
      actionsWidths,
      customContainerWidth,
    );

    expect(result.visibleActions).toStrictEqual([0]);
    expect(result.hiddenActions).toStrictEqual([1, 2]);
    expect(result.visibleGroups).toStrictEqual([]);
    expect(result.hiddenGroups).toStrictEqual([0, 1]);
  });

  it('hides all actions and groups when container width is less than the width of the first action', () => {
    const customContainerWidth = 40;
    const result = getVisibleAndHiddenActionsIndices(
      actions,
      groups,
      disclosureWidth,
      actionsWidths,
      customContainerWidth,
    );

    expect(result.visibleActions).toStrictEqual([]);
    expect(result.hiddenActions).toStrictEqual([0, 1, 2]);
    expect(result.visibleGroups).toStrictEqual([]);
    expect(result.hiddenGroups).toStrictEqual([0, 1]);
  });

  it('will show one action and one group if the other action widths do not fit', () => {
    const customActionWidths = [50, 400, 400, 60, 350];
    const result = getVisibleAndHiddenActionsIndices(
      actions,
      groups,
      disclosureWidth,
      customActionWidths,
      containerWidth,
    );

    expect(result.visibleActions).toStrictEqual([0]);
    expect(result.hiddenActions).toStrictEqual([1, 2]);
    expect(result.visibleGroups).toStrictEqual([0]);
    expect(result.hiddenGroups).toStrictEqual([1]);
  });

  it('hides all actions and groups when actionsWidths is larger than container width', () => {
    const customActionsWidths = [500, 400, 500, 600, 700];
    const result = getVisibleAndHiddenActionsIndices(
      actions,
      groups,
      disclosureWidth,
      customActionsWidths,
      containerWidth,
    );

    expect(result.visibleActions).toStrictEqual([]);
    expect(result.hiddenActions).toStrictEqual([0, 1, 2]);
    expect(result.visibleGroups).toStrictEqual([]);
    expect(result.hiddenGroups).toStrictEqual([0, 1]);
  });
});
