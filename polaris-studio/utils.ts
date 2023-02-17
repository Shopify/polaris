import { Dispatch, useEffect, useState } from "react";
import { initialState } from "./components/App/App";
import { Action, MessageFromIframe, MessageToIframe, State } from "./types";

export function useIframeCommunication(): [
  state: State,
  dispatch: Dispatch<Action>
] {
  const [state, setState] = useState<State>(initialState);

  const dispatch = (action: Action) => {
    const message: MessageFromIframe = { source: "polaris-studio", action };
    console.log({ log: "Iframe is sending a message...", message });
    window.parent.postMessage(message);
  };

  useEffect(() => {
    console.log({ log: "Iframe is listening for messages..." });
    const listener = (event: MessageEvent<MessageToIframe>) => {
      const { state, source } = event.data;
      if (source !== "polaris-studio") return;
      console.log({ log: "Iframe recieved a message...", state });
      setState(state);
    };
    window.addEventListener("message", listener, false);
    return () => window.removeEventListener("message", listener);
  }, []);

  return [state, dispatch];
}

export const slugify = (str: string): string => {
  return (
    str
      // Camel to hyphen case
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // Replace spaces with hyphens
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
  );
};

export const className = (
  ...classNames: (string | boolean | null | undefined)[]
): string => {
  return classNames.filter((className) => Boolean(className)).join(" ");
};
