import { LineConfig } from "../types";

export function createLineAttribute(target: LineConfig): {
  "data-line": string;
} {
  return { "data-line": JSON.stringify(target) };
}
