import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios';
import { useEffect } from 'react';
import useGithubStore from '../hooks/useGithubStore';

export default function Page() {
  const [session, loading] = useSession();
  let profile;
  const repos = useGithubStore((state) => state.repos);
  const setRepoData = useGithubStore((state) => state.setRepoData);

  const getRepos = () => {
    axios.get(`${profile.repos_url}?per_page=200`)
      .then((response) => {
        console.log(response.data);
        setRepoData(response.data);
      }).catch((error) => {
        console.log('Error fetching user', error);
      });
  };

  useEffect(() => {
    console.log(session);
    if (session?.profile) {
      window.localStorage.setItem('profile', JSON.stringify(session.profile));
    }
    profile = JSON.parse(window.localStorage.getItem('profile'));
    if (profile) {
      getRepos();
    }
  }, []);

  return (
    <>
      <header className="flex items-center">
        {session && (
        <>
          <div className="">
            <button
              onClick={() => console.log(profile)}
              className="p-3 bg-blue-300"
            >
              Log
            </button>
            <button
              onClick={() => getRepos()}
              className="p-3 bg-blue-300"
            >
              Get Repos
            </button>
          </div>
          <div className="ml-auto text-right">
            Signed in as
            {' '}
            {session.user.email}
            {' '}
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
      <div>
        {repos
          && (
          <ul className="grid grid-cols-3 gap-3">
            {repos.map((repo) => (
              <li
                key={repo.node_id}
                className="flex"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repo.name}
                </a>
                <span className="ml-3 font-bold">{repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
          )}
      </div>
    </>
  );
}
