import {Stack} from '../Stack';
import {Heading} from '../Heading';
import styles from './PatternsRelatedResources.module.scss';
import Markdown from '../Markdown';

export type Resource = {
  description: string;
  title: string;
  href: string;
};
export default function PatternsRelatedResources({
  children,
}: {
  children: string;
}) {
  return (
    <Stack as="section" gap="4" className={styles.RelatedResources}>
      <Heading as="h2" id="related-resources">
        Related resources
      </Heading>
      <Markdown>{children}</Markdown>
    </Stack>
  );
}
