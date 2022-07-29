import * as ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Col,
  Layout,
  Progress,
  Row,
  Tabs,
  Typography,
} from 'antd';
import {ToolOutlined} from '@ant-design/icons';

import {Token, LintedLayer, PluginMessage, UIMessage} from './types';
import {rgbaToHex} from './utils';
import './styles.css';

const {Text} = Typography;
const {TabPane} = Tabs;

type PostMessageFunction = (message: UIMessage) => void;

function App() {
  const [lintedLayers, setLintedLayers] = useState<LintedLayer[]>([]);
  const [totalLayerCount, setTotalLayerCount] = useState(0);
  const [lintedLayerCount, setLintedLayerCount] = useState(0);

  const postMessage: PostMessageFunction = (message) => {
    parent.postMessage({pluginMessage: message}, '*');
  };

  useEffect(() => {
    window.onmessage = ({data: {pluginMessage}}: any) => {
      const message = pluginMessage as PluginMessage;

      if (message.type === 'linted-layer-list') {
        setLintedLayers(message.data.lintedLayers);
      }

      if (message.type === 'total-layer-count') {
        setTotalLayerCount(message.data.totalLayerCount);
      }

      if (message.type === 'linted-layer-count') {
        setLintedLayerCount(message.data.layerCount);
      }
    };

    postMessage({type: 'lint-layers'});
  }, []);

  const CrosshairIcon = () => (
    <svg
      className="crosshair"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="4" stroke="#1890FF" />
      <line
        x1="8"
        y1="6.09155"
        x2="11.5"
        y2="6.09155"
        stroke="#1890FF"
        stroke-linecap="round"
      />
      <line
        x1="6"
        y1="4"
        x2="6"
        y2="0.5"
        stroke="#1890FF"
        stroke-linecap="round"
      />
      <line
        x1="6"
        y1="11.5"
        x2="6"
        y2="8"
        stroke="#1890FF"
        stroke-linecap="round"
      />
      <line
        x1="0.5"
        y1="6.09155"
        x2="4"
        y2="6.09155"
        stroke="#1890FF"
        stroke-linecap="round"
      />
    </svg>
  );

  const progressPercentage =
    totalLayerCount > 0
      ? (lintedLayerCount / totalLayerCount) * 100
      : undefined;

  return (
    <Layout className="layout">
      {progressPercentage && progressPercentage > 0 ? (
        <Progress
          percent={progressPercentage}
          strokeWidth={3}
          className="loadingBar"
          strokeLinecap="square"
          showInfo={false}
        />
      ) : (
        <></>
      )}
      <Tabs defaultActiveKey="1">
        <TabPane
          style={{paddingBottom: '60px'}}
          tab={
            <span>
              <ToolOutlined />
              Token Linter
            </span>
          }
          key="1"
        >
          {lintedLayers.length > 0 ? (
            <>
              <Alert
                message={`${lintedLayers.length} layer${
                  lintedLayers.length > 1 ? 's are' : ' is'
                } not using Polaris tokens`}
                type="warning"
              />

              <div>
                {lintedLayers.map((layer) => (
                  <div className="layer" key={layer.id}>
                    <div
                      className="layerNameWrapper"
                      onClick={() =>
                        postMessage({
                          type: 'selected-layer',
                          id: layer.id,
                        })
                      }
                    >
                      <Text type="secondary" className="layerName">
                        {layer.name}
                      </Text>
                      <CrosshairIcon />
                    </div>
                    <ReplacementSuggestion
                      type="fill"
                      layer={layer}
                      postMessage={postMessage}
                    />
                    <ReplacementSuggestion
                      type="stroke"
                      layer={layer}
                      postMessage={postMessage}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Alert
              message="All layers in this file are using Polaris tokens. Good job!"
              type="success"
            />
          )}
        </TabPane>

        <Row className="footer" gutter={10}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => postMessage({type: 'lint-layers'})}
            >
              Scan document
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => postMessage({type: 'replace-all'})}
              disabled={lintedLayers.length === 0}
            >
              Fix all
            </Button>
          </Col>
        </Row>
      </Tabs>
    </Layout>
  );
}

function ReplacementSuggestion({
  type,
  layer,
  postMessage,
}: {
  type: 'fill' | 'stroke';
  layer: LintedLayer;
  postMessage: PostMessageFunction;
}) {
  let color: RGBA | undefined;
  let closestToken: Token | undefined;

  if (type === 'fill' && layer.fill && layer.fill.closestToken) {
    color = layer.fill.color;
    closestToken = layer.fill.closestToken;
  }

  if (type === 'stroke' && layer.stroke && layer.stroke.closestToken) {
    color = layer.stroke.color;
    closestToken = layer.stroke.closestToken;
  }

  if (!color || !closestToken) {
    return null;
  }

  const currentHexValue = rgbaToHex(color);
  return (
    <div className="suggestion">
      <div className="old-color">
        <div
          className={type === 'fill' ? 'fill-preview' : 'stroke-preview'}
          style={
            type === 'fill'
              ? {
                  background: `#${currentHexValue}`,
                  opacity: `${color.a * 100}%`,
                }
              : {
                  borderColor: `#${currentHexValue}`,
                  opacity: `${color.a * 100}%`,
                }
          }
          data-c={currentHexValue}
        />
        {currentHexValue}
      </div>
      <div>&rarr;</div>
      <div className="new-color">
        <div
          className="token-preview"
          style={{
            background: `rgba(${closestToken.value.r}, ${closestToken.value.g}, ${closestToken.value.b}, ${closestToken.value.a})`,
          }}
        />{' '}
        {closestToken.figmaName}
      </div>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          postMessage({
            type: type === 'fill' ? 'replace-fill' : 'replace-stroke',
            id: layer.id,
          });
        }}
      >
        Fix
      </Button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
