import type React from 'react';
import {renderToString} from 'react-dom/server';

export function textContent(
  obj?: React.ReactElement | string,
): string | undefined {
  if (!obj) {
    return;
  }

  if (typeof obj === 'string') {
    return obj;
  }

  return renderToString(obj);
}
