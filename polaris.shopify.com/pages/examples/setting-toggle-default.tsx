import {SettingToggle, TextStyle} from '@shopify/polaris';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SettingToggleExample() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback(() => {
    setActive((active) => !active);
    setLoading(true);
  }, []);

  const loadingTimeoutId = useRef();
  useEffect(() => {
    if (!loading) {
      loadingTimeoutId.current && clearTimeout(loadingTimeoutId.current);
      return;
    }

    loadingTimeoutId.current = setTimeout(() => setLoading(false), 1000);
  }, [loading]);

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      loading={loading}
      enabled={active}
    >
      {loading ? (
        'Loading...'
      ) : (
        <>
          This setting is <TextStyle variation="strong">{textStatus}</TextStyle>
          .
        </>
      )}
    </SettingToggle>
  );
}

export default withPolarisExample(SettingToggleExample);
