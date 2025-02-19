export const getPlaces = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/places`);
    if (response.ok) {
      const places = await response.json();
      return places;
    }
    throw new Error("Failed to fetch places");
  } catch (error) {
    console.error("Error:", error);
  }
};
