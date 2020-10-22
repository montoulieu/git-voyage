import { RepoForkedIcon, StarFillIcon, GlobeIcon } from '@primer/octicons-react';
import BtnFavoriteRepo from './BtnFavoriteRepo';

function RepoCard(props) {
  const { repo } = props;

  if (!repo) { return <></>; }

  return (
    <li
      className="flex border bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-xl shadow-lg p-5 relative"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <span className="text-2xl font-bold mb-2 inline-block text-white">{repo.name}</span>
        <div className="text-gray-100 font-light mb-5">
          {repo.description}
        </div>
      </a>

      <BtnFavoriteRepo repoId={repo.node_id} />

      <div className="absolute bottom-0 right-0 text-center mt-auto ml-auto font-bold h-7 flex">
        <span className="text-yellow-300 border border-yellow-200 px-3 rounded-tl-lg flex items-center">
          <StarFillIcon className="mr-1" />
          {' '}
          {repo.stargazers_count}
        </span>
        <span className="text-green-300 border border-green-200 px-3 rounded-br-lg border-l-0 flex items-center">
          <RepoForkedIcon className="mr-1" />
          {repo.forks}
        </span>
      </div>
      <a
        href={repo.homepage ? repo.homepage : repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-0 left-0 border border-blue-400 rounded-lg rounded-tl-none rounded-br-none px-3 text-blue-300 text-center mt-auto ml-auto font-bold"
      >

        <GlobeIcon />

      </a>
    </li>
  );
}

export default RepoCard;
