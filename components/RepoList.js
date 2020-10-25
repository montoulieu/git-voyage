
import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';

import useGithubStore from '../hooks/useGithubStore';
import RepoCard from './repo-card/RepoCard';

function RepoList() {
  const [session, loading] = useSession();
  const repos = useGithubStore((state) => state.repos);
  const favorites = useGithubStore((state) => state.favorites);
  const totalCommits = useGithubStore((state) => state.totalCommits);
  const setRepoData = useGithubStore((state) => state.setRepoData);
  const setTotalStars = useGithubStore((state) => state.setTotalStars);
  const setTotalIssues = useGithubStore((state) => state.setTotalIssues);
  const setTotalWatchers = useGithubStore((state) => state.setTotalWatchers);
  const setTotalForkers = useGithubStore((state) => state.setTotalForkers);
  const addToTotalCommits = useGithubStore((state) => state.addToTotalCommits);

  const filteredRepos = repos
    .sort((a, b) => a.stargazers_count < b.stargazers_count)
    .filter(repo => !favorites.includes(repo.node_id) );
    // .splice(0, 25);

  const getTotalStarCount = (repos) => {
    let starCount = 0;
    let issueCount = 0;
    let watchersCount = 0;
    let forkersCount = 0;

    repos.forEach((repo) => {
      starCount += repo.stargazers_count;
      issueCount += repo.open_issues;
      watchersCount += repo.watchers;
      forkersCount += repo.forks
    });

    setTotalStars(starCount);
    setTotalIssues(issueCount);
    setTotalWatchers(watchersCount);
    setTotalForkers(forkersCount);
  };

  const getTotalCommitCount = async (repos) => {
    let commitCount = 0;

    repos.forEach((repo) => {
      axios.get(`${repo.commits_url.slice(0, -6)}?per_page=500`, {
        headers: {
          Authorization: `token ${session.token.account.accessToken}`,
        },
      })
        .then((response) => {
          commitCount += response.data.length;
          addToTotalCommits(response.data.length);
        });
    });
  };

  const getRepos = () => {
    axios.get(`${session.token.profile.repos_url}?per_page=500`, {
      headers: {
        Authorization: `token ${session.token.account.accessToken}`,
      },
    })
      .then((response) => {
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
    if (session.token.profile.repos_url) {
      getRepos();
    }
  }, []);

  if (!repos) { return <></>; }

  return (
    <>
      <h2 className="text-purple-400 text-3xl font-bold mb-4">Public Repos</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5 pr-5 border-t-4 border-r-4 rounded-tr-3xl border-purple-400">
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

export default RepoList;
