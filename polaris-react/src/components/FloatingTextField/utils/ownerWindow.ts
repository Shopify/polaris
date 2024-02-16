import {ownerDocument} from './ownerDocument';

export function ownerWindow(node: Node | undefined): Window {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
