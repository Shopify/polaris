import fs from 'fs';
import ChildpageListing from '@/components/ChildpageListing';
import EditorRenderer from '@/components/EditorRenderer';
import Icons from '@/components/Icons';
import PropsTable from '@/components/PropsTable';
import TOC from '@/components/TOC';
import {content} from '@/content';
import {
  ComponentsPageMeta,
  ResolvedPage,
  ResolvedPageWithoutBlocks,
} from '@/types';
import {
  getPageById,
  getPageByPath,
  getResolvedPage,
  toPascalCase,
} from '@/utils';
import {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {JSONOutput} from 'typedoc';
import styles from './page.module.scss';
import ComponentMeta from './componentMeta';
import Markdown from '@/components/Markdown';
import {HOME_PAGE_ID} from '@/config';

async function loadPage(slug?: string[]): Promise<ResolvedPage> {
  const page = slug
    ? getPageByPath(content, slug.join('/'))
    : getPageById(content, HOME_PAGE_ID);

  if (!page) {
    return notFound();
  }

  if (page) {
    return getResolvedPage(content, page);
  } else {
    return notFound();
  }
}

async function loadChildPages(
  page: ResolvedPageWithoutBlocks,
): Promise<ResolvedPageWithoutBlocks[]> {
  if (page.layout === 'listing') {
    return content.pages
      .filter(({parentId}) => parentId === page.id)
      .map((page) => getResolvedPage(content, page));
  }
  return [];
}

async function loadProps(propName: string): Promise<{
  props: JSONOutput.DeclarationReflection | undefined;
  references: JSONOutput.DeclarationReflection[];
}> {
  const propsFile = fs.readFileSync('./.cache/props.json', 'utf8');
  const props = JSON.parse(propsFile) as JSONOutput.DeclarationReflection;

  let references: {[id: string]: JSONOutput.DeclarationReflection} = {};

  function findReferences(declaration: JSONOutput.DeclarationReflection) {
    function unpackType(type: JSONOutput.DeclarationReflection['type']) {
      if (type && type.type === 'reference' && type.id) {
        if (!references[type.id]) {
          const referencedDeclaration = props.children?.find(
            (child) => child.id === type.id,
          );
          if (referencedDeclaration) {
            references[type.id] = referencedDeclaration;
          }
        }
      } else if (type && type.type === 'array') {
        unpackType(type.elementType);
      } else if (type && type.type === 'union') {
        type.types.forEach((subType) => unpackType(subType));
      } else if (type && type.type === 'intersection') {
        type.types.forEach((subType) => unpackType(subType));
      }
    }

    unpackType(declaration.type);

    declaration.children?.forEach((child) => findReferences(child));
    declaration.signatures?.forEach((child) => findReferences(child));
  }
  props.children?.forEach((prop) => {
    findReferences(prop);
  });
  props.signatures?.forEach((prop) => {
    findReferences(prop);
  });

  const propsForComponent = props.children?.find(({name}) => name === propName);
  return {
    props: propsForComponent,
    references: Object.values(references),
  };
}

export async function generateMetadata({
  params,
}: {
  params: {slug: string[] | undefined};
}): Promise<Metadata> {
  const page = params.slug
    ? getPageByPath(content, params.slug.join('/'))
    : getPageById(content, HOME_PAGE_ID);

  if (!page) {
    return notFound();
  }

  if (page) {
    const title = `${page.title} — Shopify Polaris`;
    return {
      title,
      description: page.excerpt,
      openGraph: {
        images: [`/og.png?id=${page.id}`],
      },
    };
  } else {
    return {};
  }
}

async function LoadCodeExamples(
  componentsPageMeta: ComponentsPageMeta,
): Promise<{[fileName: string]: string}> {
  const examples: {[fileName: string]: string} = {};
  componentsPageMeta.examples.forEach((example) => {
    const fileName = `./app/examples/${example.fileName.replace(
      '.tsx',
      '',
    )}/page.tsx`;
    const fileExists = fs.existsSync(fileName);
    if (fileExists) {
      examples[example.fileName] = fs.readFileSync(fileName, 'utf-8');
    }
  });
  return examples;
}

export default async function Home({params}: {params: {slug: string[]}}) {
  const {slug} = params;
  const page = await loadPage(slug);

  if (slug && slug.join('/') === 'icons') {
    return (
      <PageWrapper
        id={page.id}
        title={page.title}
        breadcrumbs={page.breadcrumbs}
      >
        <Icons />
      </PageWrapper>
    );
  }

  if (slug && slug.length === 2 && slug[0] === 'tokens') {
    return <p>Tokens</p>;
  }

  const childPages = await loadChildPages(page);
  const {pageMeta} = page;
  const props =
    pageMeta?.type === 'components'
      ? await loadProps(toPascalCase(`${page.title}Props`))
      : undefined;
  const codeExamples =
    pageMeta?.type === 'components' ? await LoadCodeExamples(pageMeta) : {};

  return (
    <PageWrapper id={page.id} title={page.title} breadcrumbs={page.breadcrumbs}>
      {/* <p style={{fontSize: 9}}>
        Website route {JSON.stringify({page})} {JSON.stringify({childPages})}
      </p> */}

      {pageMeta?.type === 'components' && (
        <ComponentMeta
          excerpt={page.excerpt}
          pageMeta={pageMeta}
          codeExamples={codeExamples}
        />
      )}

      <div className={styles.PageLayout}>
        <main>
          {pageMeta?.type === 'components' && props ? (
            <>
              <h2 id="props" className={styles.PropsTableHeading}>
                Props
              </h2>
              <PropsTable props={props.props} references={props.references} />
            </>
          ) : (
            <div className={styles.ExcerptWrapper}>
              <Markdown>{page.excerpt}</Markdown>
            </div>
          )}

          {page.layout === 'listing' ? (
            <ChildpageListing pages={childPages} />
          ) : (
            <EditorRenderer page={page} />
          )}
        </main>

        {page.layout === 'blocks' && (
          <aside>
            <TOC pageId={page.id} />
          </aside>
        )}
      </div>
    </PageWrapper>
  );
}

function PageWrapper({
  id,
  title,
  breadcrumbs,
  children,
}: {
  id: string;
  title: string;
  breadcrumbs: ResolvedPage['breadcrumbs'];
  children: React.ReactNode;
}) {
  let breadcrumbSlugs: string[] = [];
  return (
    <div className={styles.Page}>
      <nav aria-label="Breadcrumb">
        {breadcrumbs.length > 0 && (
          <ol className={styles.Breadcrumbs}>
            {id !== HOME_PAGE_ID && <Link href="/">Home</Link>}
            {breadcrumbs.map(({id, slug, title}, index) => {
              breadcrumbSlugs.push(slug);
              const isLast = index === breadcrumbs.length - 1;
              return (
                <Link
                  key={id}
                  href={breadcrumbSlugs.join('/')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {title}
                </Link>
              );
            })}
          </ol>
        )}
      </nav>

      <h1>{title}</h1>

      {children}
    </div>
  );
}

export async function generateStaticParams() {
  const pages = content.pages.map((page) => getResolvedPage(content, page));

  return pages.map((page) => ({
    slug: page.breadcrumbs.map((breadcrumb) => breadcrumb.slug),
  }));
}
