import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';
// import Link from 'next/link';
import Head from 'next/head';
import RepoList from '../components/RepoList';
import DevStats from '../components/DevStats';
import FavoriteList from '../components/FavoriteList';
import MainNav from '../components/MainNav';
import useGithubStore from '../hooks/useGithubStore';

export default function Page() {
  const [session, loading] = useSession();
  const setFavorites = useGithubStore((state) => state.setFavorites);

  const loadFavoriteRepos = () => {
    const favoriteRepos = JSON.parse(window.localStorage.getItem('favoriteRepos'));
    if (favoriteRepos) {
      setFavorites(favoriteRepos);
    }
  };

  useEffect(() => {
    loadFavoriteRepos();
  }, []);

  return (
    <>
      <Head>
        <title>Git Voyage</title>
      </Head>

      <MainNav />

      {(session && !loading) && (
        <main className="container mx-auto px-3 sm:px-0 pt-10 sm:pt-16">
          <DevStats />
          <FavoriteList />
          <RepoList />
        </main>
      )}

      {(!session && !loading) && (
        <div className="bg-galaxy flex flex-col justify-center min-h-screen">
          <h1 className="text-4xl sm:text-5xl text-center mb-10 font-black">
            Sign in to view
            <br />
            {' '}
            your Git Voyage.
          </h1>

          <button
            onClick={signIn}
            className="bg-purple-600 p-3 mx-auto w-64 text-xl font-bold"
            type="button"
          >
            <span className="mr-2">🚀</span>
            Sign in
          </button>
        </div>
      )}
    </>
  );
}
