import create from 'zustand';

const useGithubStore = create((set) => ({
  repos: [],
  profile: {},
  totalStars: 0,
  setRepoData: (repos) => set(() => ({ repos })),
  setProfileData: (profile) => set(() => ({ profile })),
  setTotalStars: (totalStars) => set(() => ({ totalStars })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useGithubStore;
