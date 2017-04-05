import * as React from 'react';
import {buttonsFrom, Props as ButtonProps} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Modal from '../Modal';
import Slider from '../Slider';
import Stack from '../Stack';
import FadeBetween from './FadeBetween';

export interface PageRenderer {
  (currentPage: number, animating: boolean): React.ReactNode,
}

export interface Props {
  open: boolean,
  currentPage: number,
  focusReturnPoint?: React.ReactNode,
  instant?: boolean,
  renderPage: PageRenderer,
  renderTitle(currentPage: number): React.ReactNode,
  renderFooter(currentPage: number): React.ReactNode,
  renderPrimaryActions?(currentPage: number): ButtonProps[],
  renderSecondaryActions?(currentPage: number): ButtonProps[],
  onCloseRequest(): void,
}

export default function PagedModal({
  open,
  currentPage,
  renderTitle,
  renderPage,
  renderFooter,
  renderPrimaryActions,
  renderSecondaryActions,
  focusReturnPoint,
  instant,
  onCloseRequest,
}: Props) {
  const primaryActionsMarkup = renderPrimaryActions
    ? buttonsFrom(renderPrimaryActions(currentPage))
    : undefined;

  const secondaryActionsMarkup = renderSecondaryActions
    ? buttonsFrom(renderSecondaryActions(currentPage))
    : undefined;

  const actions = (primaryActionsMarkup || secondaryActionsMarkup)
    ? (
      <ButtonGroup>
        {primaryActionsMarkup}
        {secondaryActionsMarkup}
      </ButtonGroup>
    )
    : null;

  return (
    <Modal
      title={
        <FadeBetween contentKey={currentPage}>
          {renderTitle(currentPage)}
        </FadeBetween>
      }
      footer={
        <FadeBetween contentKey={currentPage}>
          <Stack alignment="center">
            <Stack.Item fill>
                {renderFooter(currentPage)}
            </Stack.Item>
            {actions}
          </Stack>
        </FadeBetween>
      }
      open={open}
      focusReturnPoint={focusReturnPoint}
      instant={instant}
      onCloseRequest={onCloseRequest}
    >
      <Slider
        slideRenderer={renderPage}
        currentSlide={currentPage}
      />
    </Modal>
  );
}
