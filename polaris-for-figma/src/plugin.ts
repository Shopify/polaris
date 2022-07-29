import {LintedLayer, PluginMessage, UIMessage} from './types';
import {getClosestToken, solidPaintToRgba} from './utils';

figma.skipInvisibleInstanceChildren = true;

const postMessage = (message: PluginMessage): void => {
  figma.ui.postMessage(message);
};

figma.showUI(__html__, {
  width: 440,
  height: 600,
});

let lintedLayers: LintedLayer[] = [];

function lintLayers() {
  let layerCount = 0;
  lintedLayers = [];

  const allLayers = figma.currentPage.findAll();

  postMessage({
    type: 'total-layer-count',
    data: {totalLayerCount: allLayers.length},
  });

  for (const layer of allLayers) {
    let currentLayer: LintedLayer = {id: layer.id, name: layer.name};
    if (
      'fills' in layer &&
      layer.fills &&
      layer.fills !== figma.mixed &&
      layer.fills.length > 0 &&
      layer.fills[0].type === 'SOLID'
    ) {
      if (layer.fillStyleId === '') {
        const color = solidPaintToRgba(layer.fills[0]);

        currentLayer = {
          ...currentLayer,
          fill: {
            color,
            closestToken: getClosestToken(color, 'fill', layer.type),
          },
        };
      }
    }

    if (
      'strokes' in layer &&
      layer.strokes &&
      layer.strokes.length > 0 &&
      layer.strokes[0].type === 'SOLID'
    ) {
      if (layer.strokeStyleId === '') {
        const color = solidPaintToRgba(layer.strokes[0]);

        currentLayer = {
          ...currentLayer,
          stroke: {
            color,
            closestToken: getClosestToken(color, 'stroke', layer.type),
          },
        };
      }
    }

    if (currentLayer.fill || currentLayer.stroke) {
      lintedLayers.push(currentLayer);
    }

    layerCount++;

    postMessage({
      type: 'linted-layer-count',
      data: {layerCount},
    });
  }

  postMessage({
    type: 'linted-layer-list',
    data: {lintedLayers},
  });
}

async function replaceFill(layerId: string) {
  const layer = figma.currentPage.findOne((layer) => layer.id === layerId);

  if (
    layer &&
    'fills' in layer &&
    layer.fills &&
    layer.fills !== figma.mixed &&
    layer.fills.length > 0 &&
    layer.fills[0].type === 'SOLID'
  ) {
    const fillRGBA = solidPaintToRgba(layer.fills[0]);
    const closestToken = getClosestToken(fillRGBA);

    if (closestToken) {
      await figma.importStyleByKeyAsync(closestToken.id).then((result) => {
        layer.fillStyleId = result.id;
      });
    }
  }
}

async function replaceStroke(layerId: string) {
  const layer = figma.currentPage.findOne((layer) => layer.id === layerId);

  if (
    layer &&
    'strokes' in layer &&
    layer.strokes &&
    layer.strokes.length > 0 &&
    layer.strokes[0].type === 'SOLID'
  ) {
    const strokeRGBA = solidPaintToRgba(layer.strokes[0]);
    const closestToken = getClosestToken(strokeRGBA);

    if (closestToken) {
      await figma.importStyleByKeyAsync(closestToken.id).then((result) => {
        layer.strokeStyleId = result.id;
      });
    }
  }
}

figma.ui.onmessage = async (message: UIMessage) => {
  if (message.type === 'lint-layers') {
    lintLayers();
  }

  if (message.type === 'replace-fill') {
    await replaceFill(message.id);
    lintLayers();
  }

  if (message.type === 'replace-stroke') {
    await replaceStroke(message.id);
    lintLayers();
  }

  if (message.type === 'replace-all') {
    for (const layer of lintedLayers) {
      await replaceStroke(layer.id);
      await replaceFill(layer.id);
    }
    lintLayers();
  }

  if (message.type === 'selected-layer') {
    const selectedLayer = figma.currentPage
      .findAll()
      .find((layer) => layer.id === message.id);
    if (selectedLayer !== undefined) {
      figma.currentPage.selection = [selectedLayer];
      figma.viewport.scrollAndZoomIntoView([selectedLayer]);
    }
  }
};
