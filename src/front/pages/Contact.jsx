import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contacto</h1>
        <p className="text-muted">¿Tienes alguna pregunta?</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-5">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h5 className="fw-bold mb-3">Información de contacto</h5>
              <p className="mb-2">
                <strong>Email:</strong> hola@revolucionatudieta.com
              </p>
              <p className="mb-0">
                <strong>Horario:</strong> Lunes a Viernes 9:00-18:00
              </p>
            </div>
            
            <div className="col-md-6 mb-4">
              <h5 className="fw-bold mb-3">Envíanos un mensaje</h5>
              <p className="text-muted small">
                Escríbenos y te responderemos en menos de 24 horas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-primary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};