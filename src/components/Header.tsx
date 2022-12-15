import Link from "next/link";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

function SignOutButton() {
  return (
    <button className="ml-auto h-12 rounded-3xl bg-gray-800 px-6 flex items-center justify-center gap-2 text-white font-bold transition hover:brightness-75">
      <FaGithub color="#fff" className="w-5 h-5" />
      lucasamonrc
      <FiX color="#737380" className="w-5 h-5" />
    </button>
  );
}

function SignInButton() {
  return (
    <button className="ml-auto h-12 rounded-3xl bg-gray-800 px-6 flex items-center justify-center gap-2 text-white font-bold transition hover:brightness-75">
      <FaGithub color="#2dd4bf" className="w-5 h-5" />
      Sign in with GitHub
    </button>
  );
}

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className="h-20 border-b border-b-gray-200">
      <div className="max-w-6xl h-20 px-8 mx-auto flex items-center">
        <Link href="/">
          <Image src="/images/logo.svg" alt="Herald" width={100} height={50} />
        </Link>
        <nav className="ml-20 h-20">
          <Link
            className={`inline-block relative px-2 h-20 leading-[5rem] text-gray-600 transition hover:text-black ${
              asPath === "/" ? "active" : ""
            }`}
            href="/"
          >
            Home
          </Link>

          <Link
            className={`inline-block relative px-2 h-20 leading-[5rem] text-gray-600 transition hover:text-black ${
              asPath === "/stories" ? "active" : ""
            }`}
            href="/stories"
          >
            Stories
          </Link>
        </nav>

        <SignInButton />
        {/* <SignOutButton /> */}
      </div>
    </header>
  );
}
