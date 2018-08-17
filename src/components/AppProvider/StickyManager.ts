import {autobind} from '@shopify/javascript-utilities/decorators';
import {getRectForNode, Rect} from '@shopify/javascript-utilities/geometry';
import throttle from 'lodash-decorators/throttle';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import tokens from '@shopify/polaris-tokens';
import {stackedContent} from '../../utilities/breakpoints';

export interface StickyItem {
  /** Node of the sticky element */
  stickyNode: HTMLElement;
  /** Placeholder element */
  placeHolderNode: HTMLElement;
  /** Element outlining the fixed position boundaries */
  boundingElement: HTMLElement | null;
  /** Offset vertical spacing from the top of the scrollable container */
  offset: boolean;
  /** Should the element remain in a fixed position when the layout is stacked (smaller screens)  */
  disableWhenStacked: boolean;
  /** Method to handle positioning */
  handlePositioning(
    stick: boolean,
    top?: number,
    left?: number,
    width?: string | number,
  ): void;
}

export default class StickyManager {
  private stickyItems: StickyItem[] = [];
  private stuckItems: StickyItem[] = [];
  private container: Document | HTMLElement;

  constructor(container?: Document | HTMLElement) {
    if (container) {
      this.setContainer(container);
    }
  }

  registerStickyItem(stickyItem: StickyItem): void {
    this.stickyItems.push(stickyItem);
  }

  unregisterStickyItem(nodeToRemove: HTMLElement) {
    const nodeIndex = this.stickyItems.findIndex(
      ({stickyNode}) => nodeToRemove === stickyNode,
    );
    this.stickyItems.splice(nodeIndex, 1);
  }

  setContainer(el: Document | HTMLElement) {
    this.container = el;
    addEventListener(this.container, 'scroll', this.handleScroll);
    addEventListener(window, 'resize', this.handleResize);
    this.manageStickyItems();
  }

  removeScrollListener() {
    if (this.container) {
      removeEventListener(this.container, 'scroll', this.handleScroll);
      removeEventListener(window, 'resize', this.handleResize);
    }
  }

  @throttle(50)
  @autobind
  private handleResize() {
    this.manageStickyItems();
  }

  @throttle(50)
  @autobind
  private handleScroll() {
    this.manageStickyItems();
  }

  private manageStickyItems() {
    if (this.stickyItems.length <= 0) {
      return;
    }

    const scrollTop = scrollTopFor(this.container);
    const containerTop = getRectForNode(this.container).top;

    this.stickyItems.forEach((stickyItem) => {
      const {handlePositioning} = stickyItem;

      const {sticky, top, left, width} = this.evaluateStickyItem(
        stickyItem,
        scrollTop,
        containerTop,
      );

      this.updateStuckItems(stickyItem, sticky);

      handlePositioning(sticky, top, left, width);
    });
  }

  private evaluateStickyItem(
    stickyItem: StickyItem,
    scrollTop: number,
    containerTop: number,
  ): {
    sticky: boolean;
    top: number;
    left: number;
    width: string | number;
  } {
    const {
      stickyNode,
      placeHolderNode,
      boundingElement,
      offset,
      disableWhenStacked,
    } = stickyItem;

    if (disableWhenStacked && stackedContent().matches) {
      return {
        sticky: false,
        top: 0,
        left: 0,
        width: 'auto',
      };
    }

    const stickyOffset = offset
      ? this.getOffset(stickyNode) + parseInt(tokens.spacingLoose, 10)
      : this.getOffset(stickyNode);

    const scrollPosition = scrollTop + stickyOffset;
    const placeHolderNodeCurrentTop =
      placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop;
    const top = containerTop + stickyOffset;
    const width = placeHolderNode.getBoundingClientRect().width;
    const left = placeHolderNode.getBoundingClientRect().left;

    let sticky: boolean;

    if (boundingElement == null) {
      sticky = scrollPosition >= placeHolderNodeCurrentTop;
    } else {
      const stickyItemHeight = stickyNode.getBoundingClientRect().height;
      const stickyItemBottomPosition =
        boundingElement.getBoundingClientRect().bottom -
        stickyItemHeight +
        scrollTop -
        containerTop;

      sticky =
        scrollPosition >= placeHolderNodeCurrentTop &&
        scrollPosition < stickyItemBottomPosition;
    }

    return {
      sticky,
      top,
      left,
      width,
    };
  }

  private updateStuckItems(item: StickyItem, sticky: boolean) {
    const {stickyNode} = item;
    if (sticky && !this.isNodeStuck(stickyNode)) {
      this.addStuckItem(item);
    } else if (!sticky && this.isNodeStuck(stickyNode)) {
      this.removeStuckItem(item);
    }
  }

  private addStuckItem(stickyItem: StickyItem) {
    this.stuckItems.push(stickyItem);
  }

  private removeStuckItem(stickyItem: StickyItem) {
    const {stickyNode: nodeToRemove} = stickyItem;
    const nodeIndex = this.stuckItems.findIndex(
      ({stickyNode}) => nodeToRemove === stickyNode,
    );
    this.stuckItems.splice(nodeIndex, 1);
  }

  private getOffset(node: HTMLElement) {
    if (this.stuckItems.length === 0) {
      return 0;
    }

    let offset = 0;
    let count = 0;
    const stuckNodesLength = this.stuckItems.length;
    const nodeRect = getRectForNode(node);

    while (count < stuckNodesLength) {
      const stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        const stuckNodeRect = getRectForNode(stuckNode);
        if (!horizontallyOverlaps(nodeRect, stuckNodeRect)) {
          offset += getRectForNode(stuckNode).height;
        }
      } else {
        break;
      }
      count++;
    }

    return offset;
  }

  private isNodeStuck(node: HTMLElement): boolean {
    const nodeFound = this.stuckItems.findIndex(
      ({stickyNode}) => node === stickyNode,
    );

    return nodeFound >= 0;
  }
}

function isDocument(node: HTMLElement | Document): node is Document {
  return node === document;
}

function scrollTopFor(container: HTMLElement | Document) {
  return isDocument(container)
    ? document.body.scrollTop || document.documentElement.scrollTop
    : container.scrollTop;
}

function horizontallyOverlaps(rect1: Rect, rect2: Rect) {
  const rect1Left = rect1.left;
  const rect1Right = rect1.left + rect1.width;
  const rect2Left = rect2.left;
  const rect2Right = rect2.left + rect2.width;

  return rect2Right < rect1Left || rect1Right < rect2Left;
}
