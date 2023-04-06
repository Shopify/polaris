export interface PolarisPatterns {
  VERSION: string;
}

declare global {
  interface Window {
    PolarisPatterns: PolarisPatterns;
  }
}

if (typeof window !== 'undefined') {
  window.PolarisPatterns = window.PolarisPatterns || {};
  window.PolarisPatterns.VERSION = '{{POLARIS_PATTERNS_VERSION}}';
}

export const polarisPatternsVersion = '{{POLARIS_PATTERNS_VERSION}}';
