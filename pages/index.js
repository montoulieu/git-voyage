import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import Link from 'next/link';
import useGithubStore from '../hooks/useGithubStore';
import RepoList from '../components/RepoList';

export default function Page() {
  const [session, loading] = useSession();
  const profile = useGithubStore((state) => state.profile);
  const setProfileData = useGithubStore((state) => state.setProfileData);

  useEffect(() => {
    if (session?.profile) {
      window.localStorage.setItem('profile', JSON.stringify(session.profile));
    }
    setProfileData(JSON.parse(window.localStorage.getItem('profile')));
  }, []);

  return (
    <>
      <header className="fixed w-full flex items-center bg-gray-900 text-white p-3">
        {session && (
        <>
          <div className="">
            <button
              onClick={() => console.log(profile)}
              className="nav-button"
            >
              Log
            </button>

            <button
              onClick={() => getRepos()}
              className="nav-button"
            >
              Get Repos
            </button>
          </div>
          <div className="ml-auto text-right">
            {'Hello '}
            {session.user.name.split(' ')[0]}
            {'!'}
            <br />
            <button onClick={signOut}>Sign out</button>
          </div>
        </>
        )}
        {!session
        && (
        <div className="ml-auto text-right">
          Not signed in
          {' '}
          <br />
          <button onClick={signIn}>Sign in</button>
        </div>
        )}
      </header>
      <main className="p-3 pt-24 flex flex-col justify-center min-h-screen">
        {session && (
          <RepoList />
        )}
        {!session && (
          <>
            <h1 className="text-3xl text-center pb-3">It appears you aren't logged in!</h1>
            <button
              onClick={signIn}
              className="bg-gray-700 p-3 mx-auto w-64"
            >
              Sign in
            </button>
          </>
        )}
      </main>
    </>
  );
}
