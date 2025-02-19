import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  email: string;
  password: string;
  token: string;
};

export function useAuthService() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [__, setResponseMessage] = useState("");

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      setResponseMessage("Veuillez remplir tous les champs.");
      return false;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Identifiants incorrects");
      }
      const data = await response.json();
      setUser(data.user);

      navigate("/accueil");
      setResponseMessage(`Compte créé avec succès! pseudo:${data.user.pseudo}`);
      return true;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const accountCreation = async (
    pseudo: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo, email, password }),
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la création de compte");
      }
      const data = await response.json();
      setUser(data);
      navigate("/accueil");
      setResponseMessage("Compte créé avec succès!");
      return true;
    } catch (error) {
      console.error("Erreur de création de compte :", error);
      setResponseMessage("Erreur de création du compte. Réessayer");
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (response.ok) {
        setUser(null);
        navigate("/accueil");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verify-auth`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Vérification de l'authentification échouée :", error);
      setUser(null);
    }
  };

  return { user, login, logout, checkAuth, accountCreation };
}
