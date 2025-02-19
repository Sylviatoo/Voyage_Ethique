import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/FavoritesService";
import { getPlaces } from "../services/place";
import AccessDenied from "./AccessDenied";

type Place = {
  id: number;
  id_category: number;
  name: string;
  description: string;
  location: string;
  image_url: string;
};

export default function Favorites() {
  const authContext = useContext(AuthContext);
  if (!AuthContext) {
    return <div> Chargement ...</div>;
  }
  const { user } = authContext;
  const { favorites, setFavorites } = useFavorites();
  const isAuthentificated = user !== null;

  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [__, setSortOrder] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (isAuthentificated && user) {
      const fetchFavorites = async () => {
        const userFavorites = await getFavorites(user.id);
        setFavorites(userFavorites);
      };
      fetchFavorites();
    }
  }, [isAuthentificated, user, setFavorites]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const fetchedPlaces = await getPlaces();
      const favoritePlaces = fetchedPlaces.filter((place: Place) =>
        favorites.includes(place.id),
      );
      setPlaces(favoritePlaces);
      setFilteredPlaces(favoritePlaces);
    };
    if (isAuthentificated && user) {
      fetchPlaces();
    }
  }, [favorites, isAuthentificated, user]);

  const toggleFavorite = async (placeId: number) => {
    if (!user) return;

    if (favorites.includes(placeId)) {
      await removeFavorite(user.id, placeId);
      setFavorites(favorites.filter((id) => id !== placeId));
    } else {
      await addFavorite(user.id, placeId);
      setFavorites([...favorites, placeId]);
    }
  };

  const applyFilter = () => {
    setFilteredPlaces(isFiltered ? places : places);
    setIsFiltered(!isFiltered);
  };

  const applySort = (order: string) => {
    setSortOrder(order);

    const sorted = [...filteredPlaces].sort((a, b) => {
      switch (order) {
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setFilteredPlaces(sorted);
  };

  return (
    <>
      {isAuthentificated ? (
        <>
          <div className="title">
            <div className="left">
              <Link to="/favorites" className="link">
                <h2>Mes Favoris </h2>
              </Link>
              <Link to="/accueil" className="link">
                <h2>Nos Sélections</h2>
              </Link>
            </div>
            <div className="right">
              <div className="filters">
                <h2>Filtre</h2>
                <button
                  onClick={applyFilter}
                  type="button"
                  className="filter button"
                >
                  Appliquer Filtre
                </button>
              </div>
              <div className="sorting">
                <h2>Tri</h2>
                <select onChange={(e) => applySort(e.target.value)}>
                  <option value="choisir un tri">Choisir un tri</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>
          </div>
          <hr className="line" />

          <div className="places-container">
            {filteredPlaces.length === 0 ? (
              <p>Aucun favori pour le moment.</p>
            ) : (
              filteredPlaces.map((place) => (
                <div className="place-card" key={place.id}>
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="img-places"
                  />
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <p>{place.location}</p>
                  {isAuthentificated && (
                    <button
                      type="button"
                      onClick={() => toggleFavorite(place.id)}
                    >
                      {favorites.includes(place.id)
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
