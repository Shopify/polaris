import React, { useState, useEffect } from 'react';
import { Page, Card, MediaCard, VideoThumbnail } from '../';

{/* <AppProvider
	i18n={{}}
	features={{ newDesignLanguage: true }}
	theme={{
		colorScheme: 'dark',
		colors: {
			surface: '#020c1d',
			secondary: '#103560',
			interactive: '#009973'
		}
	}}
>
</AppProvider> */}

export interface PlaygroundProps {
	onActionEvent(className: string | undefined): void
}

export default function Playground({
	onActionEvent
}: PlaygroundProps) {
	const [className, setClassName] = useState<string | undefined>('Gabs simple component');

	useEffect(() => {
		if (onActionEvent) {
			onActionEvent(className);
		}
	}, [className]);

	return (
		<Page title={className}>
			<Card
				title='Top stories of the week'
				primaryFooterAction={{
					content: 'Add new story',
					onAction: () => {
						setClassName('Add new story');
					}
				}}
			>
				<Card.Section>
					<MediaCard
						title="Turn your side-project into a business"
						primaryAction={{
							content: 'Learn more',
							onAction: () => {
								setClassName('Learn More');
							},
						}}
						description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
						popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
					>
						<VideoThumbnail
							videoLength={80}
							thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
							onClick={() => {
								setClassName('Thumbnail');
							}}
						/>
					</MediaCard>

					<MediaCard
						title="From 0 to 100 in 5 years"
						primaryAction={{
							content: 'Learn more',
							onAction: () => {
								setClassName('Learn More');
							},
						}}
						description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
						popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
					>
						<VideoThumbnail
							videoLength={125}
							thumbnailUrl="https://cdn.shopify.com/shopifycloud/brochure/assets/about/video-poster-large-977aea197d7e664408c6c419d0aee9e155e21f5943962979dc6acf14192b92d8.jpg?quality=50"
							onClick={() => {
								setClassName('Thumbnail');
							}}
						/>
					</MediaCard>

				</Card.Section>
			</Card>
		</Page >
	);
}