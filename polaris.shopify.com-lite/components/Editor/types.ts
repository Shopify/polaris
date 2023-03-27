import {Block, BlockType, Page} from '@/types';

type CreatePageAction = {
  type: 'ADD_PAGE';
  id: string;
  parentId: string | null;
};

type MovePageAction = {
  type: 'MOVE_PAGE';
  direction: 'up' | 'down';
  page: Page;
};

type UpdatePageAction = {
  type: 'UPDATE_PAGE';
  changedPage: Page;
};

type DeletePageAction = {
  type: 'DELETE_PAGE';
  page: Page;
};

type AddBlockAction = {
  type: 'ADD_BLOCK';
  blockType: BlockType;
  pageId: string;
  tabId: string | null;
  parentBlockId: string | null;
  index: number;
};

type UpdateBlockAction = {
  type: 'UPDATE_BLOCK';
  pageId: string;
  tabId: string | null;
  parentBlockId: string | null;
  newBlock: Block;
};

type MoveBlockAction = {
  type: 'MOVE_BLOCK';
  pageId: string;
  parentBlockId: string | null;
  tabId: string | null;
  fromIndex: number;
  toIndex: number;
};

type DeleteBlockAction = {
  type: 'DELETE_BLOCK';
  blockId: string;
  pageId: string;
  parentBlockId: string | null;
  tabId: string | null;
};

export type Action =
  | CreatePageAction
  | MovePageAction
  | UpdatePageAction
  | DeletePageAction
  | AddBlockAction
  | UpdateBlockAction
  | MoveBlockAction
  | DeleteBlockAction;
