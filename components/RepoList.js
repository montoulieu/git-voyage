import { useEffect } from 'react';
import axios from 'axios';
import useGithubStore from '../hooks/useGithubStore';

function RepoList() {
  const repos = useGithubStore((state) => state.repos);
  const profile = useGithubStore((state) => state.profile);
  const setRepoData = useGithubStore((state) => state.setRepoData);

  const filtegrayRepos = repos
    .sort((a, b) => a.stargazers_count < b.stargazers_count);
    // .splice(0, 25);

  const getRepos = () => {
    console.log(profile);
    axios.get(`${profile.repos_url}?per_page=200`)
      .then((response) => {
        console.log(response.data);
        setRepoData(response.data);
      }).catch((error) => {
        console.log('Error fetching user', error);
      });
  };

  useEffect(() => {
    if (profile.repos_url) {
      getRepos();
    }
  }, [profile]);

  if (!repos) { return <></>; }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {filtegrayRepos.map((repo) => (
        <li
          key={repo.node_id}
          className="flex border bg-gray-800 border-gray-700 rounded shadow-lg p-3"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="font-bold pb-10">{repo.name}</span>
            <div className="text-gray-100">
              {repo.description}
            </div>
          </a>
          <span className="mt-auto ml-auto font-black text-green-400">{repo.stargazers_count}</span>
        </li>
      ))}
    </ul>
  );
}

export default RepoList;
