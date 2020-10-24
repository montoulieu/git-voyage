import create from 'zustand';

const useGithubStore = create((set) => ({
  repos: [],
  profile: {},
  favorites: [],
  totalStars: 0,
  totalCommits: 0,
  totalIssues: 0,
  totalWatchers: 0,
  totalForkers: 0,
  setRepoData: (repos) => set(() => ({ repos })),
  setFavorites: (favorites) => set(() => ({ favorites })),
  setTotalStars: (totalStars) => set(() => ({ totalStars })),
  setTotalIssues: (totalIssues) => set(() => ({ totalIssues })),
  setTotalWatchers: (totalWatchers) => set(() => ({ totalWatchers })),
  setTotalForkers: (totalForkers) => set(() => ({ totalForkers })),
  addToTotalCommits: (commitCount) => set((state) => ({ totalCommits: state.totalCommits += commitCount })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useGithubStore;
