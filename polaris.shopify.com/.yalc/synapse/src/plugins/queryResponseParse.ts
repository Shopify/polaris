/** imports content of the a document following this simple format:
  [Query]

  [Expected Response]
 **/

import type { Processor } from "unified";
import { stripIndents } from "common-tags";
import type { SynapseTree } from "../interfaces";

export function queryResponseParse(
  this: Processor,
  options = { delim: "----------" }
) {
  const parser = (doc: any): SynapseTree => {
    const bitsRaw = doc.split(options.delim);
    const bits = bitsRaw.map((bit: any) => {
      const title = bit.split("\n\n")[0];

      return {
        type: "BitNode",
        data: {
          title,
          text: stripIndents(bit),
        },
      };
    });

    return {
      type: "root",
      children: bits,
    };
  };

  Object.assign(this, { Parser: parser });
}
