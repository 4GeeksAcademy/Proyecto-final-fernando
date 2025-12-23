import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-auto bg-light border-top">
    <div className="container py-4">
      <div className="row text-center text-md-start align-items-center">

        <div className="col-md-4 mb-3 mb-md-0">
          <h5 className="fw-bold mb-1">
            🥗 <span className="text-dark">Revoluciona Tu Dieta</span>
          </h5>
          <p className="text-muted small mb-0">
            Tu dieta online personalizada a ti.
          </p>
        </div>

        <div className="col-md-4 mb-3 mb-md-0 text-center">
          <p className="text-muted small mb-1">© {new Date().getFullYear()} Revoluciona Tu Dieta</p>
          <p className="text-muted small mb-0">Todos los derechos reservados</p>
        </div>

        <div className="col-md-4 text-center text-md-end">
          <p className="small mb-1">
            <Link to="/faq" className="text-decoration-none text-muted me-3">
              FAQ
            </Link>
            <Link to="/contacto" className="text-decoration-none text-muted me-3">
              Contacto
            </Link>
            <Link to="/privacidad" className="text-decoration-none text-muted">
              Privacidad
            </Link>
          </p>
          <p className="text-muted small mb-0">
            Transforma tu alimentación, transforma tu vida
          </p>
        </div>

      </div>
    </div>
  </footer>
);