import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
// import Link from 'next/link';
import Head from 'next/head';
import useGithubStore from '../hooks/useGithubStore';
import RepoList from '../components/RepoList';
import DevStats from '../components/DevStats';

export default function Page() {
  const [session, loading] = useSession();
  const profile = useGithubStore((state) => state.profile);
  const repos = useGithubStore((state) => state.repos);

  const setProfileData = useGithubStore((state) => state.setProfileData);

  useEffect(() => {
    if (session?.profile) {
      window.localStorage.setItem('profile', JSON.stringify(session.profile));
    }
    setProfileData(JSON.parse(window.localStorage.getItem('profile')));
  }, [session]);

  const signOutOfApp = () => {
    window.localStorage.setItem('profile', null);
    signOut();
  };

  return (
    <>
      <Head>
        <title>Dev Accolades</title>
      </Head>
      <header className="fixed w-full bg-gray-900 border-b border-gray-800 text-white p-3 z-10">
        <div className="container flex items-center mx-auto">
          {session && (
          <>
            <div className="">
              <button
                onClick={() => console.log(profile)}
                className="btn-nav-item"
                type="button"
              >
                Log Profile
              </button>

              <button
                onClick={() => console.log(repos)}
                className="btn-nav-item"
                type="button"
              >
                Log Repos
              </button>
            </div>

            <div className="flex ml-auto text-right">
              <div>
                {'Hello '}
                {session.user.name.split(' ')[0]}
                {'!'}
                <br />
                <button
                  onClick={signOutOfApp}
                  type="button"
                >
                  Sign out

                </button>
              </div>
              <div className="ml-3">
                <img
                  src={profile?.avatar_url}
                  className="h-12 rounded-full"
                />
              </div>
            </div>
          </>
          )}
          {!session
          && (
          <div className="ml-auto text-right">
            Not signed in
            {' '}
            <br />
            <button
              onClick={signIn}
              type="button"
            >
              Sign in

            </button>
          </div>
          )}

        </div>
      </header>

      <main className="container mx-auto p-3 pt-24 flex flex-col justify-center min-h-screen">
        {session && (
          <>
            <DevStats />
            <RepoList />
          </>
        )}
        {!session && (
          <>
            <h1 className="text-3xl text-center pb-3">It appears you aren't logged in!</h1>
            <button
              onClick={signIn}
              className="bg-gray-700 p-3 mx-auto w-64"
              type="button"
            >
              Sign in
            </button>
          </>
        )}
      </main>
    </>
  );
}
