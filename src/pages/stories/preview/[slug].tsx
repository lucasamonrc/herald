import Head from "next/head";
import Link from "next/link";

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
          <div className="postContent previewContent">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              beatae minus aliquid dignissimos explicabo impedit debitis
              consequuntur dolores porro enim, pariatur corrupti rerum quidem
              quaerat eius ullam dolorum, voluptatibus reprehenderit!
            </p>
          </div>
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
