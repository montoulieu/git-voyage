import { HeartFillIcon } from '@primer/octicons-react';
import useGithubStore from '../../hooks/useGithubStore';

function BtnFavoriteRepo(props) {
  const favorites = useGithubStore((state) => state.favorites);
  const addToFavorites = useGithubStore((state) => state.addToFavorites);
  const setFavorites = useGithubStore((state) => state.setFavorites);

  const { repoId } = props;

  const clickFavorite = () => {
    // eslint-disable-next-line prefer-const
    console.log(repoId);
    console.log('=======================');
    console.log(favorites);
    console.log('=======================');
    if (favorites.includes(repoId)) {
      const filteredFavorites = favorites.filter((e) => e !== repoId);
      console.log('Removing from favorites');
      setFavorites(filteredFavorites);
      console.log(filteredFavorites);
    } else {
      const modifiedFavorites = favorites;
      modifiedFavorites.push(repoId);
      console.log('Adding to favorites');
      setFavorites(modifiedFavorites);
    }
    console.log(favorites);
    window.localStorage.setItem('favoriteRepos', JSON.stringify(favorites));
  };

  return (
    <button
      className={`btn-love ${favorites.includes(repoId) ? 'bg-red-500 text-white' : 'text-red-400 hover:bg-red-500 hover:text-white'}`}
      type="button"
      onClick={() => clickFavorite()}
    >
      <HeartFillIcon size="small" />
    </button>
  );
}

export default BtnFavoriteRepo;
