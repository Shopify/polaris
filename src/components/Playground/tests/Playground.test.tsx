import React from 'react';
import { mountWithAppProvider, } from '../../../test-utilities/legacy';

import PlaygroundAsync from '../PlaygroundAsync';

const onActionEvent = jest.fn()

describe('<Playground>', () => {
	it('Playground renders correctly', () => {
		mountWithAppProvider(
			<PlaygroundAsync onActionEvent={onActionEvent} />
		);

		expect(onActionEvent).toHaveBeenCalledTimes(1);
	});
});