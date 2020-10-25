import create from 'zustand';

const useGithubStore = create((set) => ({
  repos: [],
  favorites: [],
  totalStars: 0,
  totalCommits: 0,
  totalIssues: 0,
  totalWatchers: 0,
  totalForkers: 0,
  loaded: false,
  setRepoData: (repos) => set(() => ({ repos })),
  setFavorites: (favorites) => set(() => ({ favorites })),
  addToFavorites: (favorite) => set((state) => ({ favorites: [...state.favorites, favorite] })),
  removeFromFavorites: (favorite) => set((state) => ({ favorites: state.favorites.filter((e) => e !== favorite) })),
  setTotalStars: (totalStars) => set(() => ({ totalStars })),
  setTotalIssues: (totalIssues) => set(() => ({ totalIssues })),
  setTotalWatchers: (totalWatchers) => set(() => ({ totalWatchers })),
  setTotalForkers: (totalForkers) => set(() => ({ totalForkers })),
  addToTotalCommits: (commitCount) => set((state) => ({ totalCommits: state.totalCommits += commitCount })),
  setGithubDataLoaded: (status) => set((state) => ({ loaded: status })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useGithubStore;
