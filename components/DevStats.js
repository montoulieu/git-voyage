import { useSession } from 'next-auth/client';
import useGithubStore from '../hooks/useGithubStore';

function DevStats() {
  const [session, loading] = useSession();

  const totalStars = useGithubStore((state) => state.totalStars);
  const totalCommits = useGithubStore((state) => state.totalCommits);

  return (
    <div className="grid lg:grid-cols-3 pt-6 pb-12">
      <div
        className="p-3 mx-auto w-72 font-bold"
      >
        <h5 className="text-3xl font-bolder text-red-500">
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
          Public Repos
          {' '}
          <span className="ml-auto">{session.token.profile.public_repos}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Private Repos
          {' '}
          <span className="ml-auto">{session.token.profile.owned_private_repos}</span>
        </h5>
      </div>
      <div
        className="p-3 mx-auto w-72 font-bold"
      >
        <h5 className="text-3xl font-bolder text-green-400">
          Total
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Stars
          {' '}
          <span className="ml-auto">{totalStars}</span>
        </h5>
        <h5 className="text-2xl font-semibold flex">
          Commits
          {' '}
          <span className="ml-auto">{totalCommits}</span>
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
      </div>
      <div
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
      </div>
    </div>
  );
}

export default DevStats;
