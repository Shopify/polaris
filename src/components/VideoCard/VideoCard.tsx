import React, {useState, useCallback} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import {classNames} from '../../utilities/css';
import {Action, ActionListItemDescriptor} from '../../types';

import {Card} from '../Card';
import {Button} from '../Button';
import {Heading} from '../Heading';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {Stack} from '../Stack';
import {ButtonGroup} from '../ButtonGroup';
import styles from './VideoCard.scss';

interface VideoCardProps {
  children?: React.ReactNode;
  title: string;
  primaryActions: Action[];
  description: string;
  popoverActions?: ActionListItemDescriptor[];
  portrait?: boolean;
}

export function VideoCard({
  title,
  children,
  primaryActions,
  description,
  popoverActions,
  portrait = false,
}: VideoCardProps) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const popoverActivator = (
    <Button
      icon={HorizontalDotsMinor}
      onClick={togglePopoverActive}
      size="slim"
      plain
    />
  );

  const popoverActionsMarkup = popoverActions ? (
    <div className={styles.Popover}>
      <Popover
        active={popoverActive}
        activator={popoverActivator}
        onClose={togglePopoverActive}
        preferredAlignment="left"
        preferredPosition="below"
        preventAutofocus
      >
        <ActionList items={popoverActions} />
      </Popover>
    </div>
  ) : null;

  const primaryActionsMarkup = primaryActions.map(
    (
      {
        id = '',
        content = '',
        accessibilityLabel = '',
        url = '',
        onAction = noop,
        external = true,
        onMouseEnter = noop,
        onTouchStart = noop,
      },
      index,
    ) => {
      const secondaryButton = index !== 0;
      return (
        <Button
          id={id}
          accessibilityLabel={accessibilityLabel}
          url={url}
          external={external}
          plain={secondaryButton}
          key={`${content}-${url}`}
          onClick={onAction}
          onMouseEnter={onMouseEnter}
          onTouchStart={onTouchStart}
        >
          {content}
        </Button>
      );
    },
  );
  return (
    <Card>
      <div
        className={classNames(
          styles.Container,
          portrait && styles.PortraitContainer,
        )}
      />
      <div className={classNames(!portrait && styles.VideoContainer)}>
        {children}
      </div>
      <div
        className={classNames(
          styles.InfoWrapper,
          children == null && styles.InfoWrapperFull,
        )}
      >
        <Card.Section>
          <div
            className={classNames(
              styles.InfoContainer,
              portrait && styles.PortraitInfoContainer,
            )}
          >
            {popoverActionsMarkup}
            <Stack spacing="tight" vertical>
              <div
                className={classNames(popoverActions && styles.ContentIndented)}
              >
                <div className={styles.Heading}>
                  <Heading>{title}</Heading>
                </div>
              </div>
              <p className={styles.Description}>{description}</p>
              <div className={styles.PrimaryAction}>
                <Stack alignment="trailing" distribution="leading" wrap={false}>
                  {primaryActions.length > 0 ? (
                    <Stack.Item fill>
                      <ButtonGroup>{primaryActionsMarkup}</ButtonGroup>
                    </Stack.Item>
                  ) : null}
                </Stack>
              </div>
            </Stack>
          </div>
        </Card.Section>
      </div>
    </Card>
  );
}

function noop() {}
