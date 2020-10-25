import { providers, signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// import Link from 'next/link';
import Head from 'next/head';
import {
  LogoGithubIcon,
} from '@primer/octicons-react';
import RepoList from '../components/RepoList';
import DevStats from '../components/DevStats';
import FavoriteList from '../components/FavoriteList';
import MainNav from '../components/MainNav';
import useGithubStore from '../hooks/useGithubStore';

export default function Page({ providers }) {
  const [session, loading] = useSession();
  const router = useRouter();

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
    <div className={session ? 'logged-in' : 'logged-out'}>
      <Head>
        <title>Git Voyage</title>
        <meta
          name="application-name"
          content="Git Voyage"
        />
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="theme-color"
          content="#a855f7"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Git Voyage"
        />
      </Head>

      <MainNav />

      {(session && !loading) && (
        <main className="container mx-auto px-3 pt-12 sm:pt-20">
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
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: router.query.callbackUrl })}
                type="button"
                className="bg-purple-600 p-3 mx-auto w-64 flex items-center text-xl justify-center"
              >
                Sign in with
                {' '}
                <LogoGithubIcon
                  className="ml-4 transform scale-150 mr-2"
                />
                {/* {provider.name} */}
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="container mx-auto flex py-6 px-3 text-sm items-center">
        <div className="mr-auto">
          Created by
          {' '}
          <a
            href="https://linkent.montoulieu.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline text-purple-400"
          >
            Pieter Montoulieu
          </a>
          <br />
          {' '}
          with Next.js, Tailwind and Netlify.
        </div>
        <div className="font-black text-purple-400 tracking-wider">
          2020
        </div>
      </footer>
    </div>
  );
}

Page.getInitialProps = async (context) => ({
  providers: await providers(context),
});
