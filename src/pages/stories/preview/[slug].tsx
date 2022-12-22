import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GET_STORY_BY_SLUG_QUERY } from "../../../graphql/queries";
import apollo from "../../../services/apollo";

interface Story {
  id: string;
  headline: string;
  summary: string;
  createdAt: string;
  slug: string;
  content: {
    html: string;
  };
}

interface StoryProps {
  story: Story;
  date: string;
}

export default function Story({ story, date }: StoryProps) {
  const { data: session } = useSession() as any;
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/stories/`);
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>{story.headline} | Herald</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8">
        <article className="max-w-2xl mt-20 mx-auto">
          <h1 className="text-5xl font-extrabold">{story.headline}</h1>
          <time className="block text-base text-gray-400 mt-6">{date}</time>
          <div className="postContent">{story.summary}</div>
          <div className="p-8 text-center bg-gray-50 shadow rounded text-xl font-bold mt-16 mb-8">
            Would like to read more?
            <Link href="/" className="text-teal-500 ml-2 hover:underline">
              Subscribe now!
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const { data } = await apollo.query({
    query: GET_STORY_BY_SLUG_QUERY,
    variables: {
      slug,
    },
  });

  let story = data.stories[0] as Story;

  const date = new Date(story.createdAt);
  const dateStr = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    props: {
      story,
      date: dateStr,
    },
  };
};
