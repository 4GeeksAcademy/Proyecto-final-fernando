import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navbar - Carrito actualizado:", store.cart.length);
  }, [store.cart]);

  const handleLogout = () => {
    dispatch({ type: "set_token", payload: null });
    dispatch({ type: "set_user", payload: null });
    dispatch({ type: "clear_cart" });
    navigate("/");
  };

  const cartCount = Array.isArray(store.cart) ? store.cart.length : 0;
  const isLogged = !!store.token;

  const navbarKey = `nav-${cartCount}`;

  return (
    <nav key={navbarKey} className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">E-Nutrition Courses</span>
        </Link>

        <div className="d-flex gap-2 ms-auto">
          <Link to="/demo" className="btn btn-outline-primary btn-sm">
            Catálogo
          </Link>

          {!isLogged && (
            <Link to="/register" className="btn btn-outline-secondary btn-sm">
              Login / Registro
            </Link>
          )}

          {isLogged && (
            <>
              <span className="navbar-text small me-2">
                {store.user?.email}
              </span>

              <Link
                to="/my-courses"
                className="btn btn-outline-success btn-sm"
              >
                Mis cursos
              </Link>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Salir
              </button>
            </>
          )}

          <Link to="/cart" className="btn btn-primary btn-sm">
            Carrito ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};