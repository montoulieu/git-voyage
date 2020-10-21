import create from 'zustand';

const useGithubStore = create((set) => ({
  repos: [],
  setRepoData: (repos) => set(() => ({ repos })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useGithubStore;
