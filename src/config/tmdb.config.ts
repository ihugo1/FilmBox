export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const IMAGE_SIZES = {
  poster: "w342",
  backdrop: "w1280",
  profile: "w342",
} as const;

export const getImageUrl = (path: string, type: keyof typeof IMAGE_SIZES) => {
  return `https://image.tmdb.org/t/p/${IMAGE_SIZES[type]}${path}`;
};
