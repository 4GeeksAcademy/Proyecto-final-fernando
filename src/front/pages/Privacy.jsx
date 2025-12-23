import { Link } from "react-router-dom";

export const Privacy = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Política de Privacidad</h1>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <p className="mb-3">
            En Revoluciona Tu Dieta respetamos tu privacidad. Tus datos personales 
            se utilizan únicamente para procesar tus compras y mejorar tu experiencia.
          </p>
          
          <p className="mb-3">
            No compartimos tu información con terceros sin tu consentimiento.
          </p>
          
          <p className="mb-0">
            Para cualquier consulta sobre privacidad, contáctanos en 
            hola@revolucionatudieta.com
          </p>
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