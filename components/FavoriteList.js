import { useEffect } from 'react';
import RepoCard from './repo-card/RepoCard';
import useGithubStore from '../hooks/useGithubStore';

function FavoriteList() {
  const repos = useGithubStore((state) => state.repos);
  const favorites = useGithubStore((state) => state.favorites);

  const filteredRepos = repos
    .sort((a, b) => a.stargazers_count < b.stargazers_count)
    .filter((repo) => favorites.includes(repo.node_id));

  if (filteredRepos.length === 0) { return <></>; }

  return (
    <>
      <h2 className="text-red-500 text-3xl font-bold mb-4">Favorite Repos</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 py-5 pr-5 border-t-4 border-r-4 rounded-tr-3xl border-red-500">
        {filteredRepos.map((repo) => (
          <RepoCard
            repo={repo}
            key={repo.node_id}
          />
        ))}
      </ul>
    </>
  );
}

export default FavoriteList;
