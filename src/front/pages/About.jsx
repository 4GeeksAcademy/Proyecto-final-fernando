import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Sobre Nosotros</h1>
        <p className="text-muted">
          Conoce más sobre Revoluciona Tu Dieta
        </p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
              alt="Equipo de nutrición"
              className="img-fluid rounded"
            />
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="p-4">
            <h3 className="fw-bold mb-4">Nuestra Misión</h3>
            <p className="mb-4">
              Hacer que la nutrición saludable sea accesible, práctica y sostenible 
              para todos, sin dietas extremas ni soluciones mágicas.
            </p>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <span className="fs-4 me-3">🎯</span>
                  <div>
                    <h6 className="fw-bold mb-1">Enfoque Real</h6>
                    <p className="text-muted small">Soluciones prácticas</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <span className="fs-4 me-3">📊</span>
                  <div>
                    <h6 className="fw-bold mb-1">Basado en Ciencia</h6>
                    <p className="text-muted small">Evidencia científica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};