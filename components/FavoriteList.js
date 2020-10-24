import RepoCard from './RepoCard';
import useGithubStore from '../hooks/useGithubStore';

function FavoriteList() {
  const repos = useGithubStore((state) => state.repos);
  const favorites = useGithubStore((state) => state.favorites);

  const filteredRepos = repos
    .sort((a, b) => a.stargazers_count < b.stargazers_count)
    .filter((repo) => favorites.includes(repo.node_id));

  if (!filteredRepos) { return <></>; }

  return (
    <>
      <h2 className="text-red-500 text-4xl font-bold mb-4">Favorites</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
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
