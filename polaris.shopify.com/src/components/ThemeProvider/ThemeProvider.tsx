import { useState } from "react";
import { useEffect } from "react";
import { className } from "../../utils/various";

type ThemeName = "light" | "dark";

type VariableName =
  | "--text"
  | "--text-strong"
  | "--text-subdued"
  | "--text-link"
  | "--surface"
  | "--surface-subdued"
  | "--primary"
  | "--border-color"
  | "--border-color-light"
  | "--border-inset-color"
  | "--border"
  | "--card-shadow"
  | "--card-shadow-hover"
  | "--decorative-1"
  | "--decorative-2"
  | "--decorative-3"
  | "--decorative-4"
  | "--backdrop"
  | "--search-highlight-color";

const themes: {
  [name in ThemeName]: {
    [variableName in VariableName]: string;
  };
} = {
  light: {
    "--text": "#3c4141",
    "--text-strong": "#111212",
    "--text-subdued": "#777",
    "--text-link": "#2e5dba",
    "--surface": "#fff",
    "--surface-subdued": "#fbfbfb",
    "--primary": "#008060",
    "--border-color": "#dedede",
    "--border-color-light": "#ededed",
    "--border-inset-color": "#aaa",
    "--border": "1px solid var(--border-color)",
    "--card-shadow": "0 0 0 1px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 4%)",
    "--card-shadow-hover":
      "0 4px 7px rgba(0, 0, 0, 0.1), 0 0 0 0.5px var(--border-color)",
    "--decorative-1": "#dfefd2",
    "--decorative-2": "#ffe6cd",
    "--decorative-3": "#f8dff1",
    "--decorative-4": "#dce0f5",
    "--backdrop": "rgba(0, 0, 0, 0.5)",
    "--search-highlight-color": "#f4f5f5",
  },
  dark: {
    "--text": "#aaa",
    "--text-strong": "#e7e7e7",
    "--text-subdued": "#777",
    "--text-link": "#6995ee",
    "--surface": "#202021",
    "--surface-subdued": "#2e2e30",
    "--primary": "#1aab87",
    "--border-color": "#555",
    "--border-color-light": "#343434",
    "--border-inset-color": "#555",
    "--border": "1px solid var(--border-color)",
    "--card-shadow": "inset 0 0 0 1px rgb(255 255 255 / 12%)",
    "--card-shadow-hover":
      "0 4px 7px rgba(0, 0, 0, 0.1), 0 0 0 0.5px var(--border-color)",
    "--decorative-1": "#224700",
    "--decorative-2": "#603900",
    "--decorative-3": "#601249",
    "--decorative-4": "#342484",
    "--backdrop": "rgba(0, 0, 0, 0.5)",
    "--search-highlight-color": "#444",
  },
} as const;

interface Props {
  theme: ThemeName;
  useBody?: boolean;
  children: React.ReactNode;
}

type CustomProperties = { [key: string]: string };

function ThemeProvider({ theme, useBody, children }: Props) {
  const [customProperties, setCustomProperties] = useState<CustomProperties>(
    {}
  );

  useEffect(() => {
    let newCustomProperties: CustomProperties = {};

    Object.entries(themes[theme]).forEach(([propertyName, value]) => {
      newCustomProperties[propertyName] = value;
    });

    if (useBody) {
      document.body.setAttribute(
        "style",
        Object.entries(newCustomProperties)
          .map((entry) => `${entry[0]}:${entry[1]}`)
          .join(";")
      );
    }

    setCustomProperties(newCustomProperties);
  }, [theme, useBody]);

  return (
    <div
      className={className("theme", `${theme}-mode`)}
      style={useBody ? undefined : customProperties}
    >
      {children}
    </div>
  );
}

export default ThemeProvider;
