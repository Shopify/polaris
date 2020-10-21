import React, {useState, useRef, useContext, useEffect} from 'react';
import {createPortal} from 'react-dom';

import {ThemeContext} from '../../utilities/theme';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {portal} from '../shared';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

export const UNIQUE_CONTAINER_ID = 'polaris-portal-container';

const getUniqueID = globalIdGeneratorFactory('portal-');

export function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop,
}: PortalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const portalNode = useRef<HTMLElement | null>(null);
  const portalsContainerNode = useRef<HTMLElement | null>(null);
  const context = useContext(ThemeContext);

  const portalId =
    idPrefix !== '' ? `${idPrefix}-${getUniqueID()}` : getUniqueID();

  useEffect(() => {
    const containerNode = document.getElementById(UNIQUE_CONTAINER_ID);

    portalsContainerNode.current =
      containerNode || document.createElement('div');

    if (!containerNode)
      portalsContainerNode.current.setAttribute('id', UNIQUE_CONTAINER_ID);
    portalNode.current = document.createElement('div');
    portalNode.current.setAttribute(portal.props[0], portalId);

    if (context != null && !containerNode) {
      const {cssCustomProperties} = context;
      if (cssCustomProperties != null) {
        portalsContainerNode.current.setAttribute('style', cssCustomProperties);
      } else {
        portalsContainerNode.current.removeAttribute('style');
      }
    }

    if (!containerNode) {
      document.body.appendChild(portalsContainerNode.current);
    }

    portalsContainerNode.current.appendChild(portalNode.current);

    setIsMounted(true);
  }, [isMounted, context, portalId]);

  useEffect(() => {
    if (isMounted && portalsContainerNode.current && context != null) {
      const {cssCustomProperties, textColor} = context;
      if (cssCustomProperties != null) {
        const style = textColor
          ? `${cssCustomProperties};color:${textColor};`
          : `${cssCustomProperties}`;
        const currentStyle = portalsContainerNode.current.getAttribute('style');
        if (style !== currentStyle) {
          portalsContainerNode.current.setAttribute('style', style);
        }
      } else {
        portalsContainerNode.current.removeAttribute('style');
      }
    }

    return function cleanup() {
      const containerNode = portalsContainerNode.current
        ? portalsContainerNode.current
        : document.getElementById(UNIQUE_CONTAINER_ID);
      if (portalNode.current && containerNode) {
        containerNode.removeChild(portalNode.current);
        if (containerNode && containerNode.childElementCount === 0) {
          document.body.removeChild(containerNode);
        }
      }
    };
  }, [isMounted, context]);

  useEffect(() => {
    if (isMounted) {
      onPortalCreated();
    }
  }, [isMounted, onPortalCreated]);

  return portalNode.current && isMounted
    ? createPortal(children, portalNode.current)
    : null;
}

function noop() {}
