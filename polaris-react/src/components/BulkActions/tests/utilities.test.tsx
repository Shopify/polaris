import {getVisibleAndHiddenActionsIndices} from '../utilities';

describe('bulk actions utilities', () => {
  describe('getVisibleAndHiddenActionsIndices', () => {
    const promotedActions = [
      {content: 'Promoted Action 1'},
      {content: 'Promoted Action 2'},
      {content: 'Promoted Action 3'},
      {content: 'Promoted Action 4'},
      {content: 'Promoted Action 5'},
    ];
    const disclosureWidth = 20;
    const actionsWidths = [50, 60, 70, 80, 90];
    const containerWidth = 400;

    it('returns all promotedActions as visible when container width is greater than the sum of tab widths', () => {
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        disclosureWidth,
        actionsWidths,
        containerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([0, 1, 2, 3, 4]);
      expect(result.hiddenPromotedActions).toStrictEqual([]);
    });

    it('hides promotedActions that exceed the container width', () => {
      const customContainerWidth = 100;
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        disclosureWidth,
        actionsWidths,
        customContainerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([0]);
      expect(result.hiddenPromotedActions).toStrictEqual([1, 2, 3, 4]);
    });

    it('hides all promotedActions when container width is less than the width of the first action', () => {
      const customContainerWidth = 40;
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        disclosureWidth,
        actionsWidths,
        customContainerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([]);
      expect(result.hiddenPromotedActions).toStrictEqual([0, 1, 2, 3, 4]);
    });

    it('will not show not-in-order promotedActions if the other action widths do not fit', () => {
      const customActionWidths = [50, 400, 400, 60, 350];
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        disclosureWidth,
        customActionWidths,
        containerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([0]);
      expect(result.hiddenPromotedActions).toStrictEqual([1, 2, 3, 4]);
    });

    it('hides all promotedActions and actions when actionsWidths is larger than container width', () => {
      const customActionsWidths = [500, 400, 500, 600, 700];
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        disclosureWidth,
        customActionsWidths,
        containerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([]);
      expect(result.hiddenPromotedActions).toStrictEqual([0, 1, 2, 3, 4]);
    });
  });
});
