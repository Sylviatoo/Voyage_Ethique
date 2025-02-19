import "../styles/Header.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_voyage_ethique.jpeg";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Chargement...</div>;
  }
  const { user, logout } = authContext;
  const navigate = useNavigate();
  const isAuthentificated = user !== null;

  const handleDisconnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (response.status === 204) {
        logout(navigate);
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <>
      <div className="header">
        <a href="/">
          <img className="logo_accueil" alt="logo_accueil" src={logo} />
        </a>
        <h1 className="website_title">
          🌿 Voyager Autrement : Éthique, Durable & Inoubliable ✈️
        </h1>
        {isAuthentificated ? (
          <button
            type="button"
            onClick={handleDisconnexion}
            className="disconnexion"
          >
            Se déconnecter
          </button>
        ) : (
          <Link to="/connection" className="connectivity">
            Se connecter
          </Link>
        )}
      </div>
    </>
  );
}
