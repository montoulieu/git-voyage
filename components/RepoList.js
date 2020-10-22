import { useEffect } from 'react';
import axios from 'axios';

import useGithubStore from '../hooks/useGithubStore';
import RepoCard from './RepoCard';

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
        console.log(response.data);
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
  }, []);

  if (!repos) { return <></>; }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredRepos.map((repo) => (
        <RepoCard
          repo={repo}
          key={repo.node_id}
        />
      ))}
    </ul>
  );
}

export default RepoList;
