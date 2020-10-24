import {
  RepoForkedIcon, StarFillIcon, GlobeIcon, GearIcon,
} from '@primer/octicons-react';
import BtnFavoriteRepo from './BtnFavoriteRepo';

function RepoCard(props) {
  const { repo } = props;

  if (!repo) { return <></>; }

  return (
    <li
      className="flex border bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-3xl shadow-lg p-5 relative"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="block mb-7"
      >
        <span className="text-2xl font-bold mb-2 inline-block text-white">{repo.name}</span>
        {repo.description
        && (
        <div className="text-gray-100 font-light mr-20">
          {repo.description}
        </div>
        )}
      </a>

      <BtnFavoriteRepo repoId={repo.node_id} />

      <div className="absolute bottom-0 left-0 text-center mt-auto ml-auto font-bold flex">
        <a
          href={repo.homepage ? repo.homepage : repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="border border-blue-400 rounded-bl-3xl p-1 pl-5 pr-4 text-blue-300 hover:bg-blue-300 hover:text-gray-800 transition-colors duration-200flex items-center"
        >
          <GlobeIcon />
        </a>
        <a
          href={`${repo.html_url}/settings`}
          target="_blank"
          rel="noreferrer"
          className="border border-gray-400 rounded-tr-3xl border-l-0 p-1 pr-5 pl-4 text-gray-300 hover:bg-gray-300 hover:text-gray-800 transition-colors duration-200 flex items-center"
        >
          <GearIcon />
        </a>
      </div>

      <div className="absolute bottom-0 right-0 text-center mt-auto ml-auto font-bold flex flex-col">
        <span className="text-yellow-300 border border-yellow-200 px-3 rounded-tl-3xl flex items-center">
          <StarFillIcon className="mr-1" />
          {' '}
          {repo.stargazers_count}
        </span>
        <span className="text-green-300 border border-green-200 px-3 rounded-br-3xl flex items-center">
          <RepoForkedIcon className="mr-1" />
          {repo.forks}
        </span>
      </div>
    </li>
  );
}

export default RepoCard;
