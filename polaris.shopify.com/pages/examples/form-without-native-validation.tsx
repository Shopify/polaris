import {Form, FormLayout, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function FormWithoutNativeValidationExample() {
  const [url, setUrl] = useState('');

  const handleSubmit = useCallback(() => setUrl(''), []);

  const handleUrlChange = useCallback((value: string) => setUrl(value), []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={url}
          onChange={handleUrlChange}
          label="App URL"
          type="url"
          autoComplete="off"
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}

export default withPolarisExample(FormWithoutNativeValidationExample);
