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
  window.Polaris.VERSION = '{{VERSION}}';
}
