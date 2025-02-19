import type React from "react";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../contexts/AuthContext"; // Importer le AuthContext
import { getFavorites } from "../services/FavoritesService";

interface FavoritesContextType {
  favorites: number[];
  setFavorites: (favorites: number[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);
  if (!AuthContext) {
    return <div> Chargement ...</div>;
  }
  const { user } = authContext;

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.id) {
        const userId = user.id;
        const userFavorites = await getFavorites(userId);
        setFavorites(userFavorites);
      }
    };
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
