import React from 'react'
import {tokens} from '@shopify/polaris-tokens'

export function MotionExplorer() {
	
	return (
		<>
			<h1>Motion Explorer</h1>
			<pre>
				<code>
					{JSON.stringify(tokens.motion, null, 2)}
				</code>
			</pre>
		</>
	)
}

