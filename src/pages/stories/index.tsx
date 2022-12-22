import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { GET_STORIES_QUERY } from "../../graphql/queries";
import apollo from "../../services/apollo";

interface Story {
  id: string;
  headline: string;
  summary: string;
  createdAt: string;
  slug: string;
}

interface StoriesProps {
  stories: Story[];
}

export default function Stories({ stories }: StoriesProps) {
  return (
    <>
      <Head>
        <title>Stories | Herald</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8">
        <div className="max-w-2xl mt-20 mx-auto">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="block article-link hover:text-teal-500"
            >
              <time className="text-base flex items-center text-gray-400">
                {story.createdAt}
              </time>
              <strong className="block text-2xl mt-4 transition">
                {story.headline}
              </strong>
              <p className="text-gray-400 mt-2 leading-relaxed">
                {story.summary}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await apollo.query({
    query: GET_STORIES_QUERY,
  });

  const stories = (data.stories as Story[]).map((story) => {
    const date = new Date(story.createdAt);
    const dateStr = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return { ...story, createdAt: dateStr };
  });

  return {
    props: {
      stories,
    },
  };
};
