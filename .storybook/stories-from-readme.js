import * as React from 'react';
import * as Polaris from '../src';
import {withA11y} from '@storybook/addon-a11y';
import {storiesOf} from '@storybook/react';
import Playground from '../playground/Playground';

/**
 * In most cases we want to test the "All Examples" page as fewer snapshots
 * means cheaper pricing. However some examples we need to test individually,
 * usually because they use position:fixed and we don't want examples to
 * overlay each other as it stops the test being useful.
 */
function percyShouldTestIndividualExamples(readmeName) {
  return ['Modal'].includes(readmeName);
}

export function generateStories(readme, readmeModule) {
  // Only generate stories if there are examples
  if (readme.examples.length === 0) {
    return;
  }

  const testIndividualExamples = percyShouldTestIndividualExamples(readme.name);

  storiesOf(`All Components|${readme.name}`, readmeModule)
    .addDecorator(AppProviderDecorator)
    .addDecorator(withA11y)
    .addParameters({
      percy: {skip: testIndividualExamples},
    })
    .add('All Examples', () => AllExamplesStoryForReadme(readme));

  readme.examples.forEach((example) => {
    storiesOf(`All Components|${readme.name}`, readmeModule)
      .addDecorator(AppProviderDecorator)
      .addDecorator(withA11y)
      .addParameters({
        // TODO links use styleguide-style URLs. It'd be neat to mutate them
        // to deeplink to examples in storybook.
        notes: example.description,
        percy: {skip: !testIndividualExamples},
      })
      .add(example.name, () => <example.Component />);
  });
}

export function hydrateExecutableExamples(readme) {
  readme.examples = readme.examples.map((example) => {
    example.Component = example.code({React, ...Polaris});
    return example;
  });

  return readme;
}

export function addPlaygroundStory(playgroundModule) {
  storiesOf('Playground|Playground', playgroundModule)
    .addDecorator(AppProviderDecorator)
    .add('Playground', () => <Playground />);
}

function AppProviderDecorator(story) {
  return (
    <div style={{padding: '8px'}}>
      <Polaris.AppProvider>{story()}</Polaris.AppProvider>
    </div>
  );
}

/**
 * A React component that renders all examples for a given component
 * We only screenshot this with Percy instead of every example individually to
 * keep the costs down as they charge per screenshot.
 */
function AllExamplesStoryForReadme(readme) {
  // Prevent false positives in visual regression testing.
  // Set a minimum height so that examples don't shift and triger
  // a failure if an example above them changes height
  const containerStyle = {
    minHeight: '720px',
    borderBottom: '1px solid #000',
    marginBottom: '8px',
  };

  return (
    <React.Fragment>
      {readme.examples.map((example) => (
        <div key={example.name} style={containerStyle}>
          <Polaris.Heading>{example.name}</Polaris.Heading>
          <example.Component />
        </div>
      ))}
    </React.Fragment>
  );
}
