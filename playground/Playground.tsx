import { createAsyncComponent } from '@shopify/react-async';

export const Playground = createAsyncComponent({
	load: () => import('../src/components/Playground/PlaygroundAsync')
});
