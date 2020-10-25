import { useSession } from 'next-auth/client';
import {
  PeopleIcon, SmileyIcon, EyeIcon, RepoForkedIcon, RepoIcon, CommitIcon, StarIcon, IssueOpenedIcon,
} from '@primer/octicons-react';
import useGithubStore from '../hooks/useGithubStore';
import BadgeArea from './badge/BadgeArea';

function DevStats() {
  const [session, loading] = useSession();

  const totalStars = useGithubStore((state) => state.totalStars);
  const totalIssues = useGithubStore((state) => state.totalIssues);
  const totalWatchers = useGithubStore((state) => state.totalWatchers);
  const totalForkers = useGithubStore((state) => state.totalForkers);
  const totalCommits = useGithubStore((state) => state.totalCommits);

  const peopleStats = [
    {
      label: 'Followers',
      value: session.token.profile.followers,
      icon: <PeopleIcon />,
    },
    {
      label: 'Collaborators',
      value: session.token.profile.collaborators,
      icon: <SmileyIcon />,
    },
    {
      label: 'Watchers',
      value: totalWatchers,
      icon: <EyeIcon />,
    },
    {
      label: 'Forkers',
      value: totalForkers,
      icon: <RepoForkedIcon />,
    },
  ];

  const totalStats = [
    {
      label: 'Public Repos',
      value: session.token.profile.public_repos,
      icon: <RepoIcon />,
    },
    {
      label: 'Public Commits',
      value: totalCommits,
      icon: <CommitIcon />,
    },
    {
      label: 'Stars',
      value: totalStars,
      icon: <StarIcon />,
    },
    {
      label: 'Issues',
      value: totalIssues,
      icon: <IssueOpenedIcon />,
    },
  ];

  return (
    <div className="flex flex-wrap items-stretch py-6 mx-auto">
      <div
        className="mx-auto w-full sm:w-1/2 xl:w-1/4 font-bold sm:pr-8"
      >
        <h5 className="text-3xl font-bolder text-yellow-400 mb-4">
          People
        </h5>

        <ul className="text-yellow-100 py-5 pr-5 border-t-4 border-r-4 rounded-tr-3xl border-yellow-400">
          {peopleStats.map((stat, index) => (
            <li
              key={stat.label}
              className={index !== totalStats.length - 1 ? 'pb-3' : ''}
            >
              <h5 className="text-2xl font-semibold flex">
                <span className="flex items-center transform scale-125 mr-4">{stat.icon}</span>
                {stat.label}
                {' '}
                <span className="ml-auto">{stat.value}</span>
              </h5>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mx-auto w-full sm:w-1/2 xl:w-1/4 xl:pr-8 font-bold h-full"
      >
        <h5 className="text-3xl font-bolder text-green-400 mb-4">
          Total
        </h5>

        <ul className="text-green-100 py-5 pr-5 border-t-4 border-r-4 rounded-tr-3xl border-green-400 h-full">
          {totalStats.map((stat, index) => (
            <li
              key={stat.label}
              className={index !== totalStats.length - 1 ? 'pb-3' : ''}
            >
              <h5 className="text-2xl font-semibold flex">
                <span className="flex items-center transform scale-125 mr-3">{stat.icon}</span>
                {stat.label}
                {' '}
                <span className="ml-auto">{stat.value}</span>
              </h5>
            </li>
          ))}
        </ul>
      </div>

      <BadgeArea />
    </div>
  );
}

export default DevStats;
