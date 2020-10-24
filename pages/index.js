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
        <title>Dev Accolades</title>
      </Head>

      <MainNav />

      {(session && !loading) && (
        <main className="container mx-auto p-3 pt-16 md:pt-24">
          <>
            <DevStats />
            <FavoriteList />
            <RepoList />
          </>
        </main>
      )}
      {(!session && !loading) && (
        <div className="flex flex-col justify-center min-h-screen">
          <h1 className="text-3xl text-center pb-3">Sign in to view your git accolades.</h1>
          <button
            onClick={signIn}
            className="bg-gray-700 p-3 mx-auto w-64"
            type="button"
          >
            Sign in
          </button>
        </div>
      )}
    </>
  );
}
