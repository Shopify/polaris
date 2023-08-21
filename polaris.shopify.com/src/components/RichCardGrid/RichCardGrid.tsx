import {Grid, GridItem} from '../Grid';
import Preview from '../ThumbnailPreview';
import FoundationsThumbnail from '../FoundationsThumbnail';
import {Status} from '../../types';

export type RichCardGridProps = {
  title: string;
  description: string;
  /* url is usually derived from the file path, but can be overwritten here */
  url?: string;
  previewImg?: string;
  draft?: boolean;
  status?: Status;
  icon?: string;
}[];

function RichCardGrid({cards}: {cards: RichCardGridProps}) {
  return (
    <Grid>
      {cards
        .filter(({draft}) => !draft)
        .map(({title, description, url, previewImg, icon, status}, index) => (
          <GridItem
            key={index}
            title={title}
            description={description ?? ''}
            url={url ?? ''}
            renderPreview={() =>
              previewImg ? (
                <Preview alt={title} src={previewImg} />
              ) : (
                <FoundationsThumbnail
                  icon={icon!}
                  category={title.toLowerCase()}
                />
              )
            }
            status={status}
          />
        ))}
    </Grid>
  );
}

export default RichCardGrid;
