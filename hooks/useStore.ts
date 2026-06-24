import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isCommandPaletteOpen: boolean;
  isSidebarCollapsed: boolean;
  recentTools: string[];
  favorites: string[];
  theme: "light" | "dark";
  
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addRecentTool: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useStore = create<UIState>()(
  persist(
    (set) => ({
      isCommandPaletteOpen: false,
      isSidebarCollapsed: false,
      recentTools: [],
      favorites: [],
      theme: "dark",

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

      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "dark" ? "light" : "dark";
          if (typeof window !== "undefined") {
            localStorage.setItem("toolbox-theme", next);
            if (next === "dark") {
              document.documentElement.classList.add("dark");
              document.documentElement.style.colorScheme = "dark";
            } else {
              document.documentElement.classList.remove("dark");
              document.documentElement.style.colorScheme = "light";
            }
          }
          return { theme: next };
        }),

      setTheme: (theme) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("toolbox-theme", theme);
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.style.colorScheme = "light";
          }
        }
        set({ theme });
      },
    }),
    {
      name: "toolbox-ui-state",
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        recentTools: state.recentTools,
        favorites: state.favorites,
        theme: state.theme,
      }),
    }
  )
);
