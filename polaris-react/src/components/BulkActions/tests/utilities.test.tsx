import {
  getVisibleAndHiddenActionsIndices,
  flattenActions,
  getUnflattenedHiddenActions,
} from '../utilities';

describe('bulk actions utilities', () => {
  describe('getVisibleAndHiddenActionsIndices', () => {
    const promotedActions = [
      {content: 'Promoted Action 1'},
      {content: 'Promoted Action 2'},
    ];
    const actions = [
      {content: 'Action 1'},
      {content: 'Action 2'},
      {content: 'Action 3'},
    ];
    const disclosureWidth = 20;
    const actionsWidths = [50, 60, 70, 80, 90];
    const containerWidth = 400;

    it('returns all promotedActions and actions as visible when container width is greater than the sum of tab widths', () => {
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        actions,
        disclosureWidth,
        actionsWidths,
        containerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([0, 1]);
      expect(result.hiddenPromotedActions).toStrictEqual([]);
      expect(result.visibleActions).toStrictEqual([0, 1, 2]);
      expect(result.hiddenActions).toStrictEqual([]);
    });

    it('hides promotedActions and actions that exceed the container width', () => {
      const customContainerWidth = 100;
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        actions,
        disclosureWidth,
        actionsWidths,
        customContainerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([0]);
      expect(result.hiddenPromotedActions).toStrictEqual([1]);
      expect(result.visibleActions).toStrictEqual([]);
      expect(result.hiddenActions).toStrictEqual([0, 1, 2]);
    });

    it('hides all promotedActions and actions when container width is less than the width of the first action', () => {
      const customContainerWidth = 40;
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        actions,
        disclosureWidth,
        actionsWidths,
        customContainerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([]);
      expect(result.hiddenPromotedActions).toStrictEqual([0, 1]);
      expect(result.visibleActions).toStrictEqual([]);
      expect(result.hiddenActions).toStrictEqual([0, 1, 2]);
    });

    it('will show one promotedAction and one action if the other action widths do not fit', () => {
      const customActionWidths = [50, 400, 400, 60, 350];
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        actions,
        disclosureWidth,
        customActionWidths,
        containerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([0]);
      expect(result.hiddenPromotedActions).toStrictEqual([1]);
      expect(result.visibleActions).toStrictEqual([1]);
      expect(result.hiddenActions).toStrictEqual([0, 2]);
    });

    it('hides all promotedActions and actions when actionsWidths is larger than container width', () => {
      const customActionsWidths = [500, 400, 500, 600, 700];
      const result = getVisibleAndHiddenActionsIndices(
        promotedActions,
        actions,
        disclosureWidth,
        customActionsWidths,
        containerWidth,
      );

      expect(result.visiblePromotedActions).toStrictEqual([]);
      expect(result.hiddenPromotedActions).toStrictEqual([0, 1]);
      expect(result.visibleActions).toStrictEqual([]);
      expect(result.hiddenActions).toStrictEqual([0, 1, 2]);
    });
  });

  describe('flattenActions', () => {
    it('flattens actions and action sections', () => {
      const actionSections = [
        {
          title: 'Section 1',
          items: [
            {content: 'Action 1'},
            {content: 'Action 2'},
            {content: 'Action 3'},
          ],
        },
        {content: 'Action 4'},
        {content: 'Action 5'},
      ];

      const result = flattenActions(actionSections);

      expect(result).toStrictEqual([
        {content: 'Action 1'},
        {content: 'Action 2'},
        {content: 'Action 3'},
        {content: 'Action 4'},
        {content: 'Action 5'},
      ]);
    });

    it('returns an empty array when no actions are provided', () => {
      const result = flattenActions([]);
      expect(result).toStrictEqual([]);
    });

    it('keeps an already-flat array flat', () => {
      const actions = [
        {content: 'Action 1'},
        {content: 'Action 2'},
        {content: 'Action 3'},
      ];
      const result = flattenActions(actions);
      expect(result).toStrictEqual(actions);
    });
  });

  describe('getUnflattenedHiddenActions', () => {
    it('returns the array correctly when passed a simple array', () => {
      const actions = [
        {content: 'Action 1'},
        {content: 'Action 2'},
        {content: 'Action 3'},
      ];
      const hiddenActions = [0, 2];

      const result = getUnflattenedHiddenActions(actions, hiddenActions);

      expect(result).toStrictEqual([
        {content: 'Action 1'},
        {content: 'Action 3'},
      ]);
    });

    it('returns the array correctly when passed an array with sections', () => {
      const actions = [
        {
          title: 'Section 1',
          items: [
            {content: 'Action 1'},
            {content: 'Action 2'},
            {content: 'Action 3'},
          ],
        },
        {content: 'Action 4'},
        {content: 'Action 5'},
      ];
      const hiddenActions = [1, 3];

      const result = getUnflattenedHiddenActions(actions, hiddenActions);

      expect(result).toStrictEqual([
        {
          title: 'Section 1',
          items: [{content: 'Action 2'}],
        },
        {content: 'Action 4'},
      ]);
    });

    it('returns the array correctly when passed an complex array with sections', () => {
      const actions = [
        {
          title: 'Section 1',
          items: [
            {content: 'Action 1'},
            {content: 'Action 2'},
            {content: 'Action 3'},
          ],
        },
        {content: 'Action 4'},
        {content: 'Action 5'},
        {
          title: 'Section 2',
          items: [
            {content: 'Action 6'},
            {content: 'Action 7'},
            {content: 'Action 8'},
            {content: 'Action 9'},
            {content: 'Action 10'},
          ],
        },
        {
          content: 'Action 11',
        },
        {
          content: 'Action 12',
        },
      ];
      const hiddenActions = [3, 4, 6, 7, 9, 10];

      const result = getUnflattenedHiddenActions(actions, hiddenActions);

      expect(result).toStrictEqual([
        {content: 'Action 4'},
        {content: 'Action 5'},
        {
          title: 'Section 2',
          items: [
            {content: 'Action 7'},
            {content: 'Action 8'},
            {content: 'Action 10'},
          ],
        },
        {content: 'Action 11'},
      ]);
    });
  });
});
