import Image from 'next/image';

async function loadData(slug: string) {
  return {
    data: {
      slug: slug,
    },
  };
}

export default async function Home({params}: {params: {slug: string}}) {
  const {slug} = params;
  const data = await loadData(slug);
  return <main>Website route {JSON.stringify({data})}</main>;
}

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json());

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }
