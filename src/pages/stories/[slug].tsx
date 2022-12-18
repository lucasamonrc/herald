import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Story() {
  return (
    <>
      <Head>
        <title>Some Pretty Cool Headline Here! | Herald</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8">
        <article className="max-w-2xl mt-20 mx-auto">
          <h1 className="text-5xl font-extrabold">
            Some Pretty Cool Headline Here!
          </h1>
          <time className="block text-base text-gray-400 mt-6">
            25 Jan 2000
          </time>
          <div className="postContent"></div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = (await getSession({ req })) as any;
  const { slug } = params as { slug: string };

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/stories/preview/${slug}`,
        permanent: false,
      },
    };
  }

  // get content
  const content = "";

  return {
    props: {
      content,
    },
  };
};
