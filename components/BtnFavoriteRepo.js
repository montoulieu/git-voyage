import { useState } from 'react';
import { HeartFillIcon } from '@primer/octicons-react';

function BtnFavoriteRepo(props) {
  const { repoId } = props;
  const [localFavoriteRepos, setLocalFavoriteRepos] = useState(JSON.parse(window.localStorage.getItem('favoriteRepos')) || []);

  const storeFavorite = () => {
    const favoriteRepos = JSON.parse(window.localStorage.getItem('favoriteRepos')) || [];
    let filteredRepoIds;

    if (favoriteRepos) {
      if (!favoriteRepos.includes(repoId)) {
        favoriteRepos.push(repoId);
      } else {
        filteredRepoIds = favoriteRepos.filter((e) => e !== repoId);
      }

      if (filteredRepoIds) {
        window.localStorage.setItem('favoriteRepos', JSON.stringify(filteredRepoIds));
        setLocalFavoriteRepos(filteredRepoIds);
      } else {
        window.localStorage.setItem('favoriteRepos', JSON.stringify(favoriteRepos));
        setLocalFavoriteRepos(favoriteRepos);
      }
    }
  };

  return (
    <button
      className={`btn-love ${localFavoriteRepos.includes(repoId) ? 'bg-red-400 text-white' : 'text-red-400'}`}
      type="button"
      onClick={() => storeFavorite()}
    >
      <HeartFillIcon size="small" />
    </button>
  );
}

export default BtnFavoriteRepo;
