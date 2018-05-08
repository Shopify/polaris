import {autobind} from '@shopify/javascript-utilities/decorators';
import {getRectForNode} from '@shopify/javascript-utilities/geometry';
import throttle from 'lodash-decorators/throttle';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';

export interface StickyItem {
  /** Node of the sticky element */
  stickyNode: HTMLElement;
  /** Placeholder element */
  placeHolderNode: HTMLElement;
  /** The bounding element */
  boundingElement: HTMLElement | null;
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
    const {stickyNode, placeHolderNode, boundingElement} = stickyItem;
    const stickyOffset = this.getOffset(stickyNode);
    const scrollPosition = scrollTop + stickyOffset;
    const placeHolderNodeCurrentTop =
      placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop;
    const top = containerTop + stickyOffset;

    if (boundingElement == null) {
      return {
        sticky: scrollPosition >= placeHolderNodeCurrentTop,
        top,
        left: 0,
        width: '100%',
      };
    }

    const stickyItemHeight = stickyNode.getBoundingClientRect().height;
    const stickyItemBottomPosition =
      boundingElement.getBoundingClientRect().bottom -
      stickyItemHeight +
      scrollTop -
      containerTop;

    const sticky =
      scrollPosition >= placeHolderNodeCurrentTop &&
      scrollPosition < stickyItemBottomPosition;

    const left = boundingElement.getBoundingClientRect().left;
    const width = boundingElement.getBoundingClientRect().width;

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

    while (count < stuckNodesLength) {
      const stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        offset += getRectForNode(stuckNode).height;
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
