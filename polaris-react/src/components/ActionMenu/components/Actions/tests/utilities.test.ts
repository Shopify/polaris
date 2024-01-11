import {getVisibleAndHiddenActionsIndices} from '../utilities';

describe('getVisibleAndHiddenActionsIndices', () => {
  const actions = ['Action 1', 'Action 2', 'Action 3'];
  const groups = ['Group 1', 'Group 2'];
  const disclosureWidth = 20;
  const actionsWidths = [50, 60, 70];
  const containerWidth = 200;

  it('should return all actions and groups as visible when container width is greater than the sum of tab widths', () => {
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

  it('should hide actions and groups that exceed the container width', () => {
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
    expect(result.visibleGroups).toStrictEqual([0]);
    expect(result.hiddenGroups).toStrictEqual([1]);
  });

  it('should hide all actions and groups when container width is less than the width of the first action', () => {
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

  it('should return empty arrays for visible and hidden actions/groups when actions and groups are empty', () => {
    const emptyActions: string[] = [];
    const emptyGroups: string[] = [];
    const result = getVisibleAndHiddenActionsIndices(
      emptyActions,
      emptyGroups,
      disclosureWidth,
      actionsWidths,
      containerWidth,
    );

    expect(result.visibleActions).toStrictEqual([]);
    expect(result.hiddenActions).toStrictEqual([]);
    expect(result.visibleGroups).toStrictEqual([]);
    expect(result.hiddenGroups).toStrictEqual([]);
  });

  it('should return empty arrays for visible and hidden actions/groups when actionsWidths is empty', () => {
    const emptyActionsWidths: number[] = [];
    const result = getVisibleAndHiddenActionsIndices(
      actions,
      groups,
      disclosureWidth,
      emptyActionsWidths,
      containerWidth,
    );

    expect(result.visibleActions).toStrictEqual([]);
    expect(result.hiddenActions).toStrictEqual([]);
    expect(result.visibleGroups).toStrictEqual([]);
    expect(result.hiddenGroups).toStrictEqual([]);
  });

  it('should hide all actions and groups when container width is less than the width of the first action and disclosureWidth', () => {
    const customContainerWidth = 10;
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

  it('should hide all actions and groups when actionsWidths is larger than container width', () => {
    const customActionsWidths = [300, 400, 500];
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
