export interface Polaris {
  VERSION: string;
}

declare global {
  interface Window {
    Polaris: Polaris;
  }
}

if (typeof window !== 'undefined') {
  window.Polaris = window.Polaris || {};
  window.Polaris.VERSION = '{{POLARIS_VERSION}}';
}

export const polarisVersion = '{{POLARIS_VERSION}}';
