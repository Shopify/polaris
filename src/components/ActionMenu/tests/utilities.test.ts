import {sortAndOverrideActionOrder} from '../utilities';

describe('sortAndOverrideActionOrder', () => {
  it('returns the original actions when no indexes are set', () => {
    const actions = [
      {content: 'Duplicate'},
      {content: 'View on your store'},
      {
        title: 'Print',
        actions: [
          {content: 'Print shipping label'},
          {content: 'Add to print queue'},
        ],
      },
      {
        title: 'Promote',
        actions: [{content: 'Share on Facebook'}],
      },
    ];

    expect(sortAndOverrideActionOrder(actions)).toBe(actions);
  });

  it('sorts actions with indexes from lowest to highest index', () => {
    const actions = [
      {content: 'Duplicate'},
      {index: 1, content: 'View on your store'},
      {
        index: 0,
        title: 'Print',
        actions: [
          {content: 'Print shipping label'},
          {content: 'Add to print queue'},
        ],
      },
      {
        title: 'Promote',
        actions: [{content: 'Share on Facebook'}],
      },
    ];

    const expectedActionOrder = [
      {
        index: 0,
        title: 'Print',
        actions: [
          {content: 'Print shipping label'},
          {content: 'Add to print queue'},
        ],
      },
      {index: 1, content: 'View on your store'},
      {content: 'Duplicate'},
      {
        title: 'Promote',
        actions: [{content: 'Share on Facebook'}],
      },
    ];

    sortAndOverrideActionOrder(actions).forEach((action, index) => {
      expect(action).toMatchObject(expectedActionOrder[index]);
    });
  });

  it('returns an action in its overridden order when index is set', () => {
    const overrideIndex = 1;
    const actionWithIndex = {
      content: 'mock content 1',
      index: overrideIndex,
    };

    const actions = [actionWithIndex, {content: 'mock content 0'}];

    const expectedActionOrder = [{content: 'mock content 0'}, actionWithIndex];

    sortAndOverrideActionOrder(actions).forEach((action, index) => {
      expect(action).toMatchObject(expectedActionOrder[index]);
    });
  });

  it('returns all actions in their overridden order when multiple indexes are set', () => {
    const actions = [
      {content: 'mock content 4', index: 3},
      {content: 'mock content 1', index: 0},
      {content: 'mock content 2'},
      {content: 'mock content 5', index: 4},
      {content: 'mock content 3'},
    ];

    const expectedActionOrder = [
      {content: 'mock content 1', index: 0},
      {content: 'mock content 2'},
      {content: 'mock content 3'},
      {content: 'mock content 4', index: 3},
      {content: 'mock content 5', index: 4},
    ];

    sortAndOverrideActionOrder(actions).forEach((action, index) => {
      expect(action).toMatchObject(expectedActionOrder[index]);
    });
  });

  it('returns actions with the same set index consecutively, in order from highest initial index to lowest', () => {
    const actions = [
      {content: 'mock content 3', index: 0},
      {content: 'mock content 2', index: 0},
      {content: 'mock content 1', index: 0},
    ];

    const expectedActionOrder = [
      {content: 'mock content 1', index: 0},
      {content: 'mock content 2', index: 0},
      {content: 'mock content 3', index: 0},
    ];

    sortAndOverrideActionOrder(actions).forEach((action, index) => {
      expect(action).toMatchObject(expectedActionOrder[index]);
    });
  });
});
