import {GridItem} from '../Grid';
import {Grid} from '@shopify/polaris';
import {RichCardGridProps} from '../RichCardGrid';
import Preview from '../ThumbnailPreview';

export function FeaturedCardGrid({posts}: {posts: RichCardGridProps[]}) {
  let featured: RichCardGridProps | undefined;

  const gridPosts = posts.filter((post) => {
    if (post.featured) {
      featured = post;
    } else {
      return post;
    }
  });

  return (
    <Grid>
      {featured !== undefined && (
        <Grid.Cell columnSpan={{xs: 6, md: 6, lg: 12, xl: 12}}>
          <GridItem
            title={featured.title}
            description={featured.description}
            url={featured.url ?? ''}
            renderPreview={() =>
              featured !== undefined && (
                <Preview alt={featured.title} src={featured.previewImg} />
              )
            }
          />
        </Grid.Cell>
      )}
      {gridPosts.map((post) => (
        <Grid.Cell columnSpan={{xs: 6}} key={post.title}>
          <GridItem
            title={post.title}
            description={post.description}
            url={post.url ?? ''}
            renderPreview={() => (
              <Preview alt={post.title} src={post.previewImg} />
            )}
          />
        </Grid.Cell>
      ))}
    </Grid>
  );
}
