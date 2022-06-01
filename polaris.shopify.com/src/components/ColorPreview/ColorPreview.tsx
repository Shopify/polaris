import { tokens } from "@shopify/polaris-tokens";
import Token from "../Token";

const {
  colorSchemes: { light: colors },
} = tokens;

const ColorPreview = ({ name }: { name: string }) => {
  const isStateful =
    name.includes("hovered") ||
    name.includes("pressed") ||
    name.includes("depressed") ||
    (name.includes("disabled") && !name.startsWith("text"));

  const fullSize = 32;
  const smallSize = 32;
  const size = isStateful ? smallSize : fullSize;

  const { description, value } = colors[name];

  return (
    <Token
      name={name}
      description={description}
      value={value}
      renderPreview={() => (
        <div
          style={{
            minWidth: fullSize,
            maxWidth: fullSize,
            height: size,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div
            style={{
              minWidth: size,
              maxWidth: size,
              height: size,
              borderRadius: 100,
              background: value,
            }}
          ></div>
        </div>
      )}
    />
  );
}

export default ColorPreview