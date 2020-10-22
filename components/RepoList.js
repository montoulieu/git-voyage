import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';

import useGithubStore from '../hooks/useGithubStore';
import RepoCard from './RepoCard';

function RepoList() {
  const [session, loading] = useSession();
  const repos = useGithubStore((state) => state.repos);
  const profile = useGithubStore((state) => state.profile);
  const totalCommits = useGithubStore((state) => state.totalCommits);
  const setRepoData = useGithubStore((state) => state.setRepoData);
  const setTotalStars = useGithubStore((state) => state.setTotalStars);
  const addToTotalCommits = useGithubStore((state) => state.addToTotalCommits);

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

  const getTotalCommitCount = async (repos) => {
    let commitCount = 0;

    await repos.forEach((repo) => {
      axios.get(repo.commits_url.slice(0, -6), {
        headers: {
          Authorization: `token ${session.token.account.accessToken}`,
        },
      })
        .then((response) => {
          console.log(response.data.length)
          commitCount += response.data.length;
          console.log(response.data);
          addToTotalCommits(response.data.length);
        });
    });
  };

  const getRepos = () => {
    axios.get(`${profile.repos_url}?per_page=500`, {
      headers: {
        Authorization: `token ${session.token.account.accessToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setRepoData(response.data);
        getTotalStarCount(response.data);
        if (totalCommits === 0) {
          getTotalCommitCount(response.data);
        }
      }).catch((error) => {
        console.log('Error fetching user', error);
      });
  };

  useEffect(() => {
    console.log(session);
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
