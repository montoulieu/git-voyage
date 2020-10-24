import { useSession } from 'next-auth/client';
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
    { label: 'Followers', value: session.token.profile.followers },
    { label: 'Collaborators', value: session.token.profile.collaborators },
    { label: 'Watchers', value: totalWatchers },
    { label: 'Forkers', value: totalForkers },
  ];

  const totalStats = [
    { label: 'Repos', value: session.token.profile.public_repos + session.token.profile.owned_private_repos },
    { label: 'Commits', value: totalCommits },
    { label: 'Stars', value: totalStars },
    { label: 'Issues', value: totalIssues },
  ];

  return (
    <div className="flex flex-wrap py-6 md:pb-12 mx-auto">
      <div
        className="mx-auto w-full sm:w-1/2 lg:w-1/4 font-bold mb-5 sm:mb-0 sm:pr-8"
      >
        <h5 className="text-3xl font-bolder text-yellow-400 border-b-2 border-yellow-400 pb-3 mb-3">
          People
        </h5>

        <ul className="text-yellow-100">
          {peopleStats.map((stat) => (
            <li
              key={stat.label}
              className="pb-1"
            >
              <h5 className="text-2xl font-semibold flex">
                {stat.label}
                {' '}
                <span className="ml-auto">{stat.value}</span>
              </h5>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mx-auto w-full sm:w-1/2 lg:w-1/4 sm:pr-8 font-bold mb-5"
      >
        <h5 className="text-3xl font-bolder text-green-400 mb-3 border-b-2 border-green-400 pb-3">
          Total
        </h5>

        <ul className="text-green-100">
          {totalStats.map((stat) => (
            <li
              key={stat.label}
              className="pb-1"
            >
              <h5 className="text-2xl font-semibold flex">
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
