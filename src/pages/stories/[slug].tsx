import { ApolloError } from "@apollo/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { GET_STORY_BY_SLUG_QUERY } from "../../graphql/queries";
import apollo from "../../services/apollo";

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
  return (
    <>
      <Head>
        <title>{story.headline} | Herald</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8">
        <article className="max-w-2xl mt-20 mx-auto">
          <h1 className="text-5xl font-extrabold">{story.headline}</h1>
          <time className="block text-base text-gray-400 mt-6">{date}</time>
          <div
            className="postContent"
            dangerouslySetInnerHTML={{ __html: story.content.html }}
          />
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
