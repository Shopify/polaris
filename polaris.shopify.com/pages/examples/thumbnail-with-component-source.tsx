import {Thumbnail} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ThumbnailExample() {
  return <Thumbnail source={NoteMinor} size="large" alt="Small document" />;
}

export default withPolarisExample(ThumbnailExample);
