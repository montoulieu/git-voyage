import { signIn, signOut, useSession } from 'next-auth/client';
// import Link from 'next/link';
import Head from 'next/head';
import RepoList from '../components/RepoList';
import DevStats from '../components/DevStats';
import MainNav from '../components/MainNav';

export default function Page() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Dev Accolades</title>
      </Head>

      <MainNav />

      <main className="container mx-auto p-3 pt-24">
        {(session && !loading) && (
          <>
            <DevStats />
            <RepoList />
          </>
        )}
        {(!session && !loading) && (
          <div className="flex flex-col justify-center min-h-screen">
            <h1 className="text-3xl text-center pb-3">It appears you aren't logged in!</h1>
            <button
              onClick={signIn}
              className="bg-gray-700 p-3 mx-auto w-64"
              type="button"
            >
              Sign in
            </button>
          </div>
        )}
      </main>
    </>
  );
}
