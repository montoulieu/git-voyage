import create from 'zustand';

const useBadgeStore = create((set) => ({
  badges: [],
  setBadges: (badges) => set(() => ({ badges })),
  addToBadges: (badge) => set((state) => ({ badges: [...state.badges, badge] })),
  // clearProfileData: () => set({ profile: [] })
}));

export default useBadgeStore;
