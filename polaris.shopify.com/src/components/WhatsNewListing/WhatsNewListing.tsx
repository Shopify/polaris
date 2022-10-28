import Image from 'next/image';
import Link from 'next/link';
import styles from './WhatsNewListing.module.scss';

export interface WhatsNewListingProps {
  posts: {
    title: string;
    description: string;
    slug: string;
    imageUrl: string;
  }[];
}

function WhatsNewListing({posts}: WhatsNewListingProps) {
  return (
    <div className={styles.WhatsNewListing}>
      {posts.map(({title, description, slug, imageUrl}) => (
        <article key={slug} className={styles.Post}>
          <Link href={slug}>
            <Image
              width={1600}
              height={800}
              style={{width: '100%', height: 'auto'}}
              src={imageUrl}
              alt="s"
            />
            <h2>{title}</h2>
            <p>{description}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default WhatsNewListing;
