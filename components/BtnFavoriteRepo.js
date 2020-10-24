import { HeartFillIcon } from '@primer/octicons-react';
import useGithubStore from '../hooks/useGithubStore';

function BtnFavoriteRepo(props) {
  const favorites = useGithubStore((state) => state.favorites);
  const setFavorites = useGithubStore((state) => state.setFavorites);

  const { repoId } = props;

  const clickFavorite = () => {
    // eslint-disable-next-line prefer-const
    let favoriteRepos = [];

    if (favorites.includes(repoId)) {
      favoriteRepos = favorites.filter((e) => e !== repoId);
      console.log(`Removing -${favoriteRepos}`);
    } else {
      favoriteRepos = favorites;
      favoriteRepos.push(repoId);
      console.log(`Adding -${favoriteRepos}`);
    }
    setFavorites(favoriteRepos);
    console.log(favorites);
    window.localStorage.setItem('favoriteRepos', JSON.stringify(favoriteRepos));
  };

  return (
    <button
      className={`btn-love ${favorites.includes(repoId) ? 'bg-red-500 text-white' : 'text-red-400'}`}
      type="button"
      onClick={() => clickFavorite()}
    >
      <HeartFillIcon size="small" />
    </button>
  );
}

export default BtnFavoriteRepo;
