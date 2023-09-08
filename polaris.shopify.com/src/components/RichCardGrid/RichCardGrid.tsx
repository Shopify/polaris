import {Grid, GridItem} from '../Grid';
import Preview from '../ThumbnailPreview';
import FoundationsThumbnail from '../FoundationsThumbnail';
import type {Status, FoundationsCategory} from '../../types';

export interface RichCardGridProps {
  title: string;
  description: string;
  shortDescription?: string;
  /* url is usually derived from the file path, but can be overwritten here */
  url?: string;
  previewImg?: string;
  draft?: boolean;
  status?: Status;
  icon?: string;
  featured?: boolean;
}

function RichCardGrid({
  cards,
  category,
}: {
  cards: RichCardGridProps[];
  category?: FoundationsCategory;
}) {
  return (
    <Grid>
      {cards
        .filter(({draft}) => !draft)
        .map(
          (
            {
              title,
              description,
              shortDescription,
              url,
              previewImg,
              icon,
              status,
            },
            index,
          ) => (
            <GridItem
              key={index}
              title={title}
              description={shortDescription ?? description ?? ''}
              url={url ?? ''}
              renderPreview={() =>
                previewImg ? (
                  <Preview alt={title} src={previewImg} />
                ) : (
                  <FoundationsThumbnail
                    icon={icon!}
                    category={
                      category ?? (title.toLowerCase() as FoundationsCategory)
                    }
                  />
                )
              }
              status={status}
            />
          ),
        )}
    </Grid>
  );
}

export default RichCardGrid;
