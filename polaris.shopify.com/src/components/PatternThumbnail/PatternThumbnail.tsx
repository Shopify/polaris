import Image from 'next/image';

interface Props {
  title: string;
  img?: string;
}

function ComponentThumbnail({title, img}: Props) {
  return (
    <div
      style={{
        filter: 'brightness(97%)',
        borderRadius: 'var(--border-radius-600)',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        overflow: 'hidden',
      }}
    >
      {img ? (
        <Image
          src={img}
          style={{width: '100%', height: 'auto'}}
          width={266}
          height={140}
          quality={70}
          sizes="300px"
          alt={`Screenshot of the ${title} pattern`}
        />
      ) : null}
    </div>
  );
}

export default ComponentThumbnail;
