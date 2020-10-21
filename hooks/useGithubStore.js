import create from 'zustand';

const useGithubStore = create((set) => ({
  repos: [],
  profile: {},
  setRepoData: (repos) => set(() => ({ repos })),
  setProfileData: (profile) => set(() => ({ profile })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useGithubStore;
