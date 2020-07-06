import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Geography Quizzes</title>
      </Head>

      <main>
        <h1>Geography Quizzes</h1>

        <nav>
          <ul>
            <li>
              <Link href="/united-states">
                <a>United States</a>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
