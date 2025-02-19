import { Link } from "react-router-dom";
import "../styles/Button.css";

export default function Button() {
  return (
    <>
      <p className="connexion">
        En naviguant sans connexion, tu auras un aperçu de notre site, mais
        certaines fonctionnalités seront limitées. Crée un compte et débloque
        toutes les possibilités comme la possibilité d'ajouter tes lieux
        préférés dans tes favoris ! C'est rapide, facile, et cela t'offre une
        expérience sur-mesure. Pourquoi attendre ? Inscris-toi et explore
        pleinement tout ce que nous avons à offrir !
      </p>
      <div className="two-buttons">
        <Link className="visitor-button" to="/accueil">
          <p className="button-text">J'accède au site sans compte</p>
        </Link>
        <Link to="/connection" className="connection-button" type="button">
          <p className="button-text">
            Je me connecte /<br /> Je crée un compte
          </p>
        </Link>
      </div>
    </>
  );
}
