import useGithubStore from '../hooks/useGithubStore';

function DevStats() {
  const profile = useGithubStore((state) => state.profile);
  const totalStars = useGithubStore((state) => state.totalStars);

  return (
    <div className="grid lg:grid-cols-3 pt-6 pb-12">
      <div
        className="p-3 mx-auto w-72 font-bold"
      >
        <h5 className="text-2xl flex">
          Followers
          {' '}
          <span className="ml-auto">{profile?.followers}</span>
        </h5>
        <h5 className="text-2xl flex">
          Collaborators
          {' '}
          <span className="ml-auto">{profile?.collaborators}</span>
        </h5>
        <h5 className="text-2xl flex">
          Public Repos
          {' '}
          <span className="ml-auto">{profile?.public_repos}</span>
        </h5>
        <h5 className="text-2xl flex">
          Private Repos
          {' '}
          <span className="ml-auto">{profile?.owned_private_repos}</span>
        </h5>
      </div>
      <div
        className="p-3 mx-auto w-72 font-bold"
      >
        <h5 className="text-2xl flex">
          Total Stars
          {' '}
          <span className="ml-auto">{totalStars}</span>
        </h5>
        <h5 className="text-2xl flex">
          Total Commits:
          {' '}
          <span className="ml-auto">{profile?.followers}</span>
        </h5>
        <h5 className="text-2xl flex">
          Collaborators:
          {' '}
          <span className="ml-auto">{profile?.collaborators}</span>
        </h5>
        <h5 className="text-2xl flex">
          Public Repos:
          {' '}
          <span className="ml-auto">{profile?.public_repos}</span>
        </h5>

      </div>
      <div
        className="p-3 mx-auto w-72 font-bold"
      >
        <h5 className="text-2xl flex">
          Followers:
          {' '}
          <span className="ml-auto">{profile?.followers}</span>
        </h5>
        <h5 className="text-2xl flex">
          Collaborators:
          {' '}
          <span className="ml-auto">{profile?.collaborators}</span>
        </h5>
        <h5 className="text-2xl flex">
          Public Repos:
          {' '}
          <span className="ml-auto">{profile?.public_repos}</span>
        </h5>
        <h5 className="text-2xl flex">
          Total Stars:
          {' '}
          <span className="ml-auto">{totalStars}</span>
        </h5>
      </div>
    </div>
  );
}

export default DevStats;
