import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  return (
    <>
      <AuthProvider>
        <FavoritesProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </FavoritesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
