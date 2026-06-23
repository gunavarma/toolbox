import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isCommandPaletteOpen: boolean;
  isSidebarCollapsed: boolean;
  recentTools: string[];
  favorites: string[];
  
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addRecentTool: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
}

export const useStore = create<UIState>()(
  persist(
    (set) => ({
      isCommandPaletteOpen: false,
      isSidebarCollapsed: false,
      recentTools: [],
      favorites: [],

      openCommandPalette: () => set({ isCommandPaletteOpen: true }),
      closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
      toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      
      addRecentTool: (slug) =>
        set((state) => {
          const filtered = state.recentTools.filter((s) => s !== slug);
          return {
            recentTools: [slug, ...filtered].slice(0, 8), // Keep last 8 tools
          };
        }),
        
      toggleFavorite: (slug) =>
        set((state) => {
          const isFav = state.favorites.includes(slug);
          return {
            favorites: isFav
              ? state.favorites.filter((s) => s !== slug)
              : [...state.favorites, slug],
          };
        }),
    }),
    {
      name: "toolbox-ui-state",
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        recentTools: state.recentTools,
        favorites: state.favorites,
      }),
    }
  )
);
