import {content} from '@/content';
import {ResolvedPage, ResolvedPageWithBlocks} from '@/types';
import {getPageByPath, getResolvedPage} from '@/utils';
import EditorRenderer from '@/components/EditorRenderer';
import Link from 'next/link';
import {Metadata} from 'next';
import Icons from '@/components/Icons';
import ChildpageListing from '@/components/ChildpageListing';
import styles from './page.module.scss';
import {notFound} from 'next/navigation';
import TOC from '@/components/TOC';

async function loadPage(
  slug?: string[],
): Promise<ResolvedPageWithBlocks | undefined> {
  if (!slug) return undefined;
  const page = getPageByPath(content, slug.join('/'));
  if (page) {
    return getResolvedPage(content, page, true);
  } else {
    return notFound();
  }
}

async function loadChildPages(
  page: ResolvedPageWithBlocks,
): Promise<ResolvedPage[]> {
  if (page.layout === 'listing') {
    return content.pages
      .filter(({parentId}) => parentId === page.id)
      .map((page) => getResolvedPage(content, page));
  }
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: {slug: string[] | undefined};
}): Promise<Metadata> {
  if (!params.slug)
    return {
      title: 'Shopify Polaris',
      description: '',
    };

  const page = getPageByPath(content, params.slug.join('/'));
  if (page) {
    const title = `${page.title} — Shopify Polaris`;
    return {
      title,
      description: page.excerpt,
    };
  } else {
    return {};
  }
}

export default async function Home({params}: {params: {slug: string[]}}) {
  const {slug} = params;

  const page = await loadPage(slug);

  if (!page) {
    return (
      <PageWrapper title="Shopify Polaris" breadcrumbs={[]}>
        Home
      </PageWrapper>
    );
  }

  if (slug.join('/') === 'icons') {
    return (
      <PageWrapper title={page.title} breadcrumbs={page.breadcrumbs}>
        <Icons />
      </PageWrapper>
    );
  }

  const childPages = await loadChildPages(page);

  return (
    <PageWrapper title={page.title} breadcrumbs={page.breadcrumbs}>
      {/* <p style={{fontSize: 9}}>
        Website route {JSON.stringify({page})} {JSON.stringify({childPages})}
      </p> */}

      <main>
        {page && (
          <>
            {page.layout === 'listing' ? (
              <ChildpageListing pages={childPages} />
            ) : (
              <>
                {page.pageMeta?.type === 'components' && (
                  <>
                    <p>Lifecycle phase: {page.pageMeta.lifeCyclePhase}</p>
                    {page.pageMeta.examples.length > 0 && (
                      <iframe
                        src={`/examples/${page.pageMeta.examples[0].fileName.replace(
                          '.tsx',
                          '',
                        )}`}
                      ></iframe>
                    )}
                  </>
                )}
                <EditorRenderer page={page} />
              </>
            )}
          </>
        )}
      </main>
      {page.layout === 'blocks' && (
        <aside>
          <TOC pageId={page.id} />
        </aside>
      )}
    </PageWrapper>
  );
}

function PageWrapper({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs: ResolvedPage['breadcrumbs'];
  children: React.ReactNode;
}) {
  let breadcrumbSlugs: string[] = [];
  return (
    <div className={styles.Page}>
      {breadcrumbs.length > 0 && (
        <ul className={styles.Breadcrumbs}>
          <Link href="">Home</Link>
          {breadcrumbs.map(({id, slug, title}) => {
            breadcrumbSlugs.push(slug);
            return (
              <Link key={id} href={breadcrumbSlugs.join('/')}>
                {title}
              </Link>
            );
          })}
        </ul>
      )}

      <h1>{title}</h1>

      <div className={styles.PageLayout}>{children}</div>
    </div>
  );
}

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json());

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }
