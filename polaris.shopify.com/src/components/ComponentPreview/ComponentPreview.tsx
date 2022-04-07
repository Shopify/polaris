import { useEffect, useRef, useState } from "react";
import colors from "../../../../polaris-react/src/tokens/token-groups/color.light.json";
import styles from "./ComponentPreview.module.scss";

interface Props {
  src: string;
  id: string;
  highlights?: {
    selectors: string[];
    tooltip?: string;
  }[];
  aspectRatio?: number;
}

type HoveredElement = {
  className: string;
  rect: { x: number; y: number; width: number; height: number };
  tokens: {
    property: string;
    name: string;
    value: string;
  }[];
};

function ComponentPreview({
  src,
  id,
  highlights,
  aspectRatio = 0.6525,
}: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const borderRadius = 4;

  const [hoveredElement, setHoveredElement] = useState<HoveredElement>();

  useEffect(() => {
    if (hasLoaded) {
      const body = iframeRef.current?.contentDocument?.body;
      body?.addEventListener("mouseover", (evt) => {
        // const polarisElements = body.querySelectorAll("[class^=Polaris]");

        const element = evt?.target as Element;

        const isHTMLAndNotSvg = !!element?.className?.includes;

        if (!isHTMLAndNotSvg) return;

        if (
          !element ||
          !element.className ||
          !element.className.includes("Polaris")
        )
          return;

        const styles = window.getComputedStyle(element);
        const tokens: HoveredElement["tokens"] = [];

        // Find background color
        const backgroundColor = styles.backgroundColor;
        const backgroundColorAsRgba = backgroundColor
          .replace("rgb", "rgba")
          .replace(")", ", 1)");
        const matchingToken = Object.entries(colors).find(
          ([tokenName, tokenValue]) => {
            return tokenValue === backgroundColorAsRgba;
          }
        );
        if (matchingToken) {
          console.log(
            `${element.className} has background: ${matchingToken[0]}`
          );
          tokens.push({
            property: "background",
            name: matchingToken[0],
            value: matchingToken[1],
          });
        }

        // Copy of above: Find color
        const color = styles.color;
        const colorAsRgba = color.replace("rgb", "rgba").replace(")", ", 1)");
        const matchingToken2 = Object.entries(colors).find(
          ([tokenName, tokenValue]) => {
            return tokenValue === colorAsRgba;
          }
        );
        if (matchingToken2) {
          tokens.push({
            property: "color",
            name: matchingToken2[0],
            value: matchingToken2[1],
          });
        }

        const { x, y, width, height } = element.getBoundingClientRect();

        // Set state
        setHoveredElement({
          className: element.className,
          rect: { x, y, width, height },
          tokens,
        });
      });
    }
  }, [hasLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        highlights &&
        wrapperRef.current &&
        canvasRef.current &&
        iframeRef.current
      ) {
        const canvas = canvasRef.current;

        const wrapperBounds = wrapperRef.current.getBoundingClientRect();
        canvas.width = wrapperBounds.width * 2;
        canvas.height = wrapperBounds.height * 2;
        canvas.style.width = `${wrapperBounds.width}px`;
        canvas.style.height = `${wrapperBounds.height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          highlights.forEach((highlight) => {
            const yValues: number[] = [];
            const xValues: number[] = [];
            const xPlusWidthValues: number[] = [];
            const yPlusHeightValues: number[] = [];

            highlight.selectors.forEach((selector) => {
              const el =
                iframeRef.current?.contentDocument?.querySelector(selector);
              if (el) {
                const { x, y, width, height } = el.getBoundingClientRect();
                xValues.push(x);
                yValues.push(y);
                xPlusWidthValues.push(x + width);
                yPlusHeightValues.push(y + height);
              }
            });

            let area = {
              x: Math.min(...xValues),
              y: Math.min(...yValues),
              width: Math.max(...xPlusWidthValues) - Math.min(...xValues),
              height: Math.max(...yPlusHeightValues) - Math.min(...yValues),
            };

            ctx.fillStyle = "rgba(255,0,0,.33)";
            ctx.fillRect(
              area.x * 2,
              area.y * 2,
              area.width * 2,
              area.height * 2
            );
          });
        }
      }
    }, 500);
    return () => clearInterval(timer);
  }, [highlights, hasLoaded]);

  return (
    <div
      ref={wrapperRef}
      style={{
        borderRadius,
        background: "rgba(246, 246, 247, 1)",
        height: 0,
        paddingBottom: `${aspectRatio * 100}%`,
        position: "relative",
      }}
      onMouseLeave={() => setHoveredElement(undefined)}
    >
      {hoveredElement && (
        <ul
          style={{
            position: "absolute",
            background: "#444",
            padding: `5px 9px`,
            borderRadius: 12,
            zIndex: 100,
            color: "white",
            boxShadow: "0 1px 50px rgba(0,0,0,.5)",
            fontSize: 14,
            left:
              (hoveredElement?.rect.x || 0) +
              (hoveredElement?.rect.width || 0) / 2,
            top:
              (hoveredElement?.rect.y || 0) +
              (hoveredElement?.rect.height || 0) +
              4,
            transform: `translateX(-50%)`,
            pointerEvents: "none",
          }}
        >
          {
            <li key={hoveredElement.className}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {hoveredElement.className
                  .replace("Polaris-", "")
                  .replace("__", " → ")}
              </span>
              <ul>
                {hoveredElement.tokens.map((token) => (
                  <li key={`${token.name}-${token.value}`}>
                    {/* <span>{token.property}</span> */}
                    <div
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        background: token.value,
                        borderRadius: 4,
                        marginRight: 1,
                        verticalAlign: "middle",
                        boxShadow: `inset 0 0 0 1px rgba(0,0,0,.1)`,
                        transform: `translateY(-1px)`,
                      }}
                    ></div>{" "}
                    --p-{token.name}
                  </li>
                ))}
              </ul>
            </li>
          }
        </ul>
      )}

      {hoveredElement && (
        <div
          style={{
            position: "absolute",
            left: hoveredElement.rect.x,
            top: hoveredElement.rect.y,
            width: hoveredElement.rect.width,
            height: hoveredElement.rect.height,
            zIndex: 100,
            pointerEvents: "none",
            transition: "all .05s linear",
            borderRadius: 4,
            background: `rgba(0,100,255,.125)`,
          }}
        ></div>
      )}

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", pointerEvents: "none", zIndex: 1 }}
      ></canvas>
      <iframe
        ref={iframeRef}
        id={id}
        width={500}
        height={600}
        style={{
          borderRadius,
          opacity: hasLoaded ? 1 : 0,
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
          transition: `opacity .5s .2s linear`,
        }}
        src={src}
        onLoad={() => setHasLoaded(true)}
      ></iframe>
    </div>
  );
}

export default ComponentPreview;
