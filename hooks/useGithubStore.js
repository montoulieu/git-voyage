import create from 'zustand';

const useGithubStore = create((set) => ({
  repos: [],
  profile: {},
  totalStars: 0,
  totalCommits: 0,
  setRepoData: (repos) => set(() => ({ repos })),
  setProfileData: (profile) => set(() => ({ profile })),
  setTotalStars: (totalStars) => set(() => ({ totalStars })),
  setTotalCommits: (totalCommits) => set(() => ({ totalCommits })),
  addToTotalCommits: (commitCount) => set((state) => ({ totalCommits: state.totalCommits += commitCount })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useGithubStore;
