import { useSession } from 'next-auth/client';
import useGithubStore from '../hooks/useGithubStore';

function DevStats() {
  const [session, loading] = useSession();

  const totalStars = useGithubStore((state) => state.totalStars);
  const totalIssues = useGithubStore((state) => state.totalIssues);
  const totalWatchers = useGithubStore((state) => state.totalWatchers);
  const totalForkers = useGithubStore((state) => state.totalForkers);
  const totalCommits = useGithubStore((state) => state.totalCommits);

  return (
    <div className="grid md:grid-cols-2 py-6 md:pb-12">
      <div
        className="mx-auto w-full sm:w-72 font-bold mb-5 sm:mb-0"
      >
        <h5 className="text-4xl font-bolder text-blue-500 mb-3">
          People
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Followers
          {' '}
          <span className="ml-auto">{session.token.profile.followers}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Collaborators
          {' '}
          <span className="ml-auto">{session.token.profile.collaborators}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Watchers
          {' '}
          <span className="ml-auto">{totalWatchers}</span>
        </h5>

        <h5 className="text-2xl font-semibold flex">
          Forkers
          {' '}
          <span className="ml-auto">{totalForkers}</span>
        </h5>
      </div>
      <div
        className="mx-auto w-full sm:w-72 font-bold"
      >
        <h5 className="text-4xl font-bolder text-green-400 mb-3">
          Total
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Repos
          {' '}
          <span className="ml-auto">{session.token.profile.public_repos + session.token.profile.owned_private_repos}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Commits
          {' '}
          <span className="ml-auto">{totalCommits}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Stars
          {' '}
          <span className="ml-auto">{totalStars}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Issues
          {' '}
          <span className="ml-auto">{totalIssues}</span>
        </h5>

      </div>
      {/* <div
        className="p-3 mx-auto w-72 font-bold"
      >
        <h5 className="text-3xl font-bolder text-yellow-400">
          Discussion
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Followers:
          {' '}
          <span className="ml-auto">{session.token.profile.followers}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Collaborators:
          {' '}
          <span className="ml-auto">{session.token.profile.collaborators}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Public Repos:
          {' '}
          <span className="ml-auto">{session.token.profile.public_repos}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Total Stars:
          {' '}
          <span className="ml-auto">{totalStars}</span>
        </h5>
      </div> */}
    </div>
  );
}

export default DevStats;
