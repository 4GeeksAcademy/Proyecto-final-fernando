import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = Array.isArray(store.cart) ? store.cart.length : 0;
  const isLogged = !!store.token;

  const handleLogout = () => {
    dispatch({ type: "set_token", payload: null });
    dispatch({ type: "set_user", payload: null });
    dispatch({ type: "clear_cart" });
    navigate("/");
  };

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Testimonios", path: "/testimonios" },
    { name: "Blog", path: "/blog" },
    { name: "Cursos", path: "/demo" },
    { name: "Nosotros", path: "/nosotros" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4 text-dark">
          🥗 Revoluciona Tu Dieta
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {menuItems.map((item) => (
              <li className="nav-item mx-2" key={item.name}>
                <Link
                  to={item.path}
                  className="nav-link text-dark fw-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
          
            {isLogged && (
              <li className="nav-item mx-2">
                <Link
                  to="/my-courses"
                  className="nav-link text-dark fw-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis cursos
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/cart" className="position-relative text-decoration-none">
              <span className="fs-5">🛒</span>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isLogged ? (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline-dark btn-sm px-3"
                >
                  Iniciar sesión
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-sm px-4"
                  style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
                >
                  Pide tu 1ª Consulta gratis
                </Link>
              </>
            ) : (
              <>
                <span className="text-muted small">{store.user?.email}</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};