import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Herald</title>
      </Head>

      <main className="flex items-center justify-between max-w-6xl mx-auto px-8">
        <section className="max-w-2xl">
          <span className="text-2xl font-bold">
            Hark! We bring good tidings to you!
          </span>

          <h1 className="text-6xl leading-[4.5rem] font-extrabold mt-10">
            Good news <span className="text-teal-400">delivered</span> to you
            daily.
          </h1>
          <p className="text-2xl mt-6">
            Get access to latest wholesome stories now <br />
            <span className="text-teal-400 font-bold">for only $10/month</span>.
          </p>
          {/* <SubscribeButton priceId="1234" /> */}
          <button className="flex mt-10 h-16 w-[260px] rounded bg-teal-400 text-white text-2xl font-bold justify-center items-center transition hover:brightness-75">
            Subscribe Now
          </button>
        </section>
        <Image src="/images/illustration.svg" alt="" width={400} height={400} />
      </main>
    </>
  );
}
