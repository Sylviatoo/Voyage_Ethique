const API_URL = import.meta.env.VITE_API_URL;

export const getFavorites = async (userId: number) => {
  const response = await fetch(`${API_URL}/api/favorites/${userId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    console.error("Erreur lors de la récupération des favoris");
    return [];
  }
  const data = await response.json();
  return data.favorites.map((fav: { id_place: number }) => fav.id_place);
};

export const addFavorite = async (userId: number, placeId: number) => {
  await fetch(`${API_URL}/api/favorites/${userId}/${placeId}`, {
    method: "POST",
    credentials: "include",
  });
};

export const removeFavorite = async (userId: number, placeId: number) => {
  await fetch(`${API_URL}/api/favorites/${userId}/${placeId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
