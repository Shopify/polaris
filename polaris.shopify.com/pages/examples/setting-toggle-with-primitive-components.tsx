import {
  Text,
  Inline,
  Box,
  AlphaCard,
  Button,
  Badge,
  AlphaStack,
} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function WithPrimitiveComponents() {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const toggleId = 'setting-toggle-uuid';
  const descriptionId = 'setting-toggle-description-uuid';

  const isNavigationCollapsed = useMedia('screen and (max-width: 767.95px)');

  const badgeStatus = enabled ? 'success' : undefined;

  const badgeContent = enabled ? 'On' : 'Off';

  const title = 'Test mode';
  const description =
    'Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards.';

  const settingStatusMarkup = (
    <Badge
      status={badgeStatus}
      statusAndProgressLabelOverride={`Setting is ${badgeContent}`}
    >
      {badgeContent}
    </Badge>
  );

  const settingTitle = title ? (
    <Inline gap="2" wrap={false}>
      <label htmlFor={toggleId}>
        <Inline gap="2" align="start" blockAlign="baseline" wrap={false}>
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
          {settingStatusMarkup}
        </Inline>
      </label>
    </Inline>
  ) : null;

  const actionMarkup = (
    <Button
      role="switch"
      id={toggleId}
      ariaChecked={enabled ? 'true' : 'false'}
      onClick={handleToggle}
      size="slim"
    >
      {contentStatus}
    </Button>
  );

  const headerMarkup = (
    <Box width="100%">
      <Inline gap="12" align="space-between" blockAlign="start" wrap={false}>
        {settingTitle}
        {!isNavigationCollapsed ? (
          <Box minWidth="fit-content">
            <Inline align="end">{actionMarkup}</Inline>
          </Box>
        ) : null}
      </Inline>
    </Box>
  );

  const descriptionMarkup = (
    <AlphaStack gap="4">
      <Text id={descriptionId} variant="bodyMd" as="p" color="subdued">
        {description}
      </Text>
      {isNavigationCollapsed ? (
        <Box width="100%">
          <Inline align="start">{actionMarkup}</Inline>
        </Box>
      ) : null}
    </AlphaStack>
  );

  return (
    <AlphaCard>
      <AlphaStack gap={{xs: '4', sm: '5'}}>
        <Box width="100%">
          <AlphaStack gap={{xs: '2', sm: '4'}}>
            {headerMarkup}
            {descriptionMarkup}
          </AlphaStack>
        </Box>
        <Text variant="bodyMd" as="p">
          Your checkout is only accepting test payments.
        </Text>
      </AlphaStack>
    </AlphaCard>
  );

  function useMedia(media: string): boolean {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const mediaQueryList = window.matchMedia(media);

        setIsActive(mediaQueryList.matches);

        const listener = (evt: MediaQueryListEvent) => {
          setIsActive(evt.matches);
        };

        mediaQueryList.addEventListener('change', listener);

        return () => {
          mediaQueryList.removeEventListener('change', listener);
        };
      }
    }, [media]);

    return isActive;
  }
}

export default withPolarisExample(WithPrimitiveComponents);
