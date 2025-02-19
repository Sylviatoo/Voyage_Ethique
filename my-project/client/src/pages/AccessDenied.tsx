import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <>
      <div>
        <div className="container-access-denied">
          <section className="section-access-denied">
            <p className="paragraph-access-denied">
              Il semblerait que tu essaies d'accéder à une page sans droit
              d'accès ! Pour retourner à la page d'accueil de Voyage Ethique
              clique sur <Link to="/accueil">Accueil Voyage Ethique</Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
