import Head from "next/head";
import Link from "next/link";

export default function Stories() {
  return (
    <>
      <Head>
        <title>Stories | Herald</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8">
        <div className="max-w-2xl mt-20 mx-auto">
          <Link href="/" className="block article-link hover:text-teal-500">
            <time className="text-base flex items-center text-gray-400">
              10 Jan 2023
            </time>
            <strong className="block text-2xl mt-4 transition">
              Some Pretty Cool Headline Here!
            </strong>
            <p className="text-gray-400 mt-2 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
              unde inventore est! Laborum quae nobis laudantium neque qui
              assumenda minus ad.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
