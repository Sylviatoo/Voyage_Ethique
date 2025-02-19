import { Link } from "react-router-dom";
import "../styles/Selection.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/FavoritesService";
import { getPlaces } from "../services/place";

type Place = {
  id: number;
  id_category: number;
  name: string;
  description: string;
  location: string;
  image_url: string;
};

interface SelectionProps {
  selectedPlaces: number[];
}

export default function Selection({ selectedPlaces }: SelectionProps) {
  const [originalPlaces, setOriginalPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [__, setSortOrder] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const { user } = useContext(AuthContext);
  const isAuthentificated = user !== null;

  useEffect(() => {
    if (isAuthentificated && user) {
      const fetchFavorites = async () => {
        const userFavorites = await getFavorites(user.id);
        setFavorites(userFavorites);
      };
      fetchFavorites();
    }
  }, [isAuthentificated, user]);

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

  useEffect(() => {
    const fetchPlaces = async () => {
      const fetchedPlaces = await getPlaces();
      setOriginalPlaces(fetchedPlaces);
      setFilteredPlaces(fetchedPlaces);
    };
    fetchPlaces();
  }, []);

  const applyFilter = () => {
    if (!isFiltered) {
      setFilteredPlaces(
        originalPlaces.filter((place) => selectedPlaces.includes(place.id)),
      );
    } else {
      setFilteredPlaces(originalPlaces);
    }
    setIsFiltered(!isFiltered);
  };

  const applySort = (order: string) => {
    if (order === "") {
      setFilteredPlaces(originalPlaces);
      setSortOrder("");
      return;
    }
    setSortOrder(order);

    const resetPlaces = isFiltered
      ? originalPlaces.filter((place) => selectedPlaces.includes(place.id))
      : [...originalPlaces];

    const sorted = resetPlaces.sort((a, b) => {
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
      <div className="title">
        <div className="left">
          <Link to="/accueil" className="link">
            <h2>Nos Sélections</h2>
          </Link>
          {isAuthentificated ? (
            <Link to="/favorites" className="link">
              <h2>Mes Favoris </h2>
            </Link>
          ) : null}
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
        {filteredPlaces.map((place) => (
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
              <button type="button" onClick={() => toggleFavorite(place.id)}>
                {favorites.includes(place.id)
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"}
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
