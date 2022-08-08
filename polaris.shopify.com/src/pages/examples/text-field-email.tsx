import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function EmailFieldExample() {
  const [value, setValue] = useState('bernadette.lapresse@jadedpixel.com');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Email"
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
    />
  );
}

export default withPolarisExample(EmailFieldExample);
