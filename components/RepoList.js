import { useEffect } from 'react';
import axios from 'axios';
import useGithubStore from '../hooks/useGithubStore';

function RepoList() {
  const repos = useGithubStore((state) => state.repos);
  const profile = useGithubStore((state) => state.profile);
  const setRepoData = useGithubStore((state) => state.setRepoData);
  const setTotalStars = useGithubStore((state) => state.setTotalStars);

  const filteredRepos = repos
    .sort((a, b) => a.stargazers_count < b.stargazers_count);
    // .splice(0, 25);

  const getTotalStarCount = (repos) => {
    let starCount = 0;

    repos.forEach((repo) => {
      starCount += repo.stargazers_count;
    });

    setTotalStars(starCount);
  };

  const getRepos = () => {
    axios.get(`${profile.repos_url}?per_page=500`)
      .then((response) => {
        setRepoData(response.data);
        getTotalStarCount(response.data);
      }).catch((error) => {
        console.log('Error fetching user', error);
      });
  };

  useEffect(() => {
    if (profile?.repos_url) {
      getRepos();
    }
  }, [profile]);

  if (!repos) { return <></>; }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {filteredRepos.map((repo) => (
        <li
          key={repo.node_id}
          className="flex border bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-xl shadow-lg p-5 relative"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <span className="text-xl font-bold mb-2 inline-block">{repo.name}</span>
            <div className="text-gray-100 font-light">
              {repo.description}
            </div>
          </a>
          <button className="btn-love">♥</button>
          <span className="absolute bottom-0 right-0 border border-yellow-200 rounded-lg rounded-tr-none rounded-bl-none px-3 text-yellow-300 text-center mt-auto ml-auto font-bold">{repo.stargazers_count}</span>
        </li>
      ))}
    </ul>
  );
}

export default RepoList;
