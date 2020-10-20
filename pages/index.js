import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full py-20 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl text-center font-semibold mb-3">
          Welcome to <a href="https://nextjs.org" className="text-blue-600 hover:underline">Next.js</a> with <a href="https://tailwindcss.com" className="text-blue-600 hover:underline">Tailwind!</a>
        </h1>

        <p className="text-center text-2xl leading-normal">
          Get started by editing{' '}
          <code className="code">pages/index.js</code>
        </p>

        <div className="sm:grid grid-rows-2 grid-cols-2 max-w-screen-md mt-12">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="w-full h-24 border-t border-gray-200 flex flex-col justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center mb-2"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
        <a
          href="https://github.com/montoulieu/next-tailwind-minimal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center text-sm hover:underline"
        >
          <strong className="mr-1">Next Tailwind Minimal</strong> created by <strong className="ml-1">Pieter Montoulieu</strong>
        </a>
      </footer>
    </div>
  )
}
