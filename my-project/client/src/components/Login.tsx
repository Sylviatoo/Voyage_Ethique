import { useContext, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuthService } from "../services/AuthService";

export default function LoginIn() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { accountCreation } = useAuthService();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <div>Chargement...</div>;
  }

  const { login } = authContext;

  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

  const handleChangeConnexion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/accueil");
      } else {
        console.error("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const handleCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await accountCreation(pseudo, email, password);
    if (success) {
      navigate("/accueil");
    } else {
      console.error("Erreur lors de la création du compte");
    }
  };

  const handleChangeCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "pseudo") {
      setPseudo(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="form-access">
        <form className="user-login" onSubmit={handleConnexion}>
          <h2 className="connexion-title">Connexion</h2>
          <input
            type="text"
            name="email"
            placeholder="email"
            className="input email"
            value={formData.email}
            onChange={handleChangeConnexion}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="input password"
            value={formData.password}
            onChange={handleChangeConnexion}
            required
          />
          <button type="submit">Valider</button>
        </form>
        <form className="user-creation" onSubmit={handleCreation}>
          <h2 className="creation-title">Création de compte</h2>
          <input
            type="text"
            name="pseudo"
            placeholder="pseudo"
            className="input pseudo"
            value={pseudo}
            onChange={handleChangeCreation}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="input email"
            value={email}
            onChange={handleChangeCreation}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="input password"
            value={password}
            onChange={handleChangeCreation}
            required
          />
          <button type="submit">Valider</button>
        </form>
      </div>
    </>
  );
}
