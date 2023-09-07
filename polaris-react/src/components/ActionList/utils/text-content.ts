import {renderToString} from 'react-dom/server';

export function textContent(obj?: any): string | undefined {
  if (!obj) {
    return;
  }

  if (typeof obj === 'string') {
    return obj;
  }

  return renderToString(obj);
}
