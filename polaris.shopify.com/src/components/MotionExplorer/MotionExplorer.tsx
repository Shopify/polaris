// @ts-nocheck
import React from 'react'
import {tokens} from '@shopify/polaris-tokens'
import { FrameVisualizer, getEasingTokens, getDurationTokens } from "../FrameVisualizer/FrameVisualizer";

export function MotionExplorer() {
	const { motion } = tokens;
	
	return (
		<>
			{Object.entries(getEasingTokens(motion))
				.map(([easingName, { value: easing }], i) => (
				  <>
						<h2>{easingName}</h2>
						{Object.entries(getDurationTokens(motion))
							.map(([durationName, { value: duration }], j) => (
								<>
									<h4>{durationName}</h4>
									<FrameVisualizer
									  key={`${easingName}-${durationName}`}
										id={`${i}-${j}`}
										duration={parseInt(duration, 10)}
										easing={easing}
									/>
								</>
							))
						}
					</>
				))}
		</>
	)
}

