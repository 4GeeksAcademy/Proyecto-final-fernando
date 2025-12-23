import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const resp = await fetch(backendUrl + "/courses");
        const data = await resp.json();
        dispatch({ type: "set_courses", payload: data });
      } catch (err) {
        console.error(err);
      }
    };

    if (store.courses.length === 0) loadCourses();
  }, []);

  return (
    <div>
      <div className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">
                Tu Dieta Online<br />
                <span className="text-primary">personalizada a ti</span>
              </h1>
              
              <p className="fs-5 text-muted mb-4">
                <strong>Revoluciono tu Dieta</strong> con planes adaptados a tus necesidades, 
                objetivos y estilo de vida. Transforma tu alimentación de manera sostenible.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/register" className="btn btn-primary btn-lg px-5">
                  VER PLAN
                </Link>
                <Link to="/demo" className="btn btn-outline-primary btn-lg">
                  Ver cursos
                </Link>
              </div>

              <div className="mt-4 d-flex gap-4">
                <div>
                  <h4 className="fw-bold text-success">180€</h4>
                  <small className="text-muted">/3 MESES</small>
                </div>
                <div>
                  <p className="mb-0 small">Un café al día...</p>
                  <p className="mb-0 small text-muted">Resto de meses 60€/mes</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=900&q=80"
                className="img-fluid rounded shadow-lg"
                alt="Comida saludable"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4 rounded bg-white shadow-sm h-100">
              <div className="display-6 mb-3">✅</div>
              <h4 className="fw-bold">Planes Personalizados</h4>
              <p className="text-muted">
                Dietas adaptadas a tus gustos, intolerancias y objetivos específicos.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 rounded bg-white shadow-sm h-100">
              <div className="display-6 mb-3">📱</div>
              <h4 className="fw-bold">Seguimiento 24/7</h4>
              <p className="text-muted">
                Acceso a tu nutricionista online y ajustes continuos del plan.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 rounded bg-white shadow-sm h-100">
              <div className="display-6 mb-3">🍽️</div>
              <h4 className="fw-bold">Recetas Exclusivas</h4>
              <p className="text-muted">
                Más de 200 recetas saludables, fáciles y deliciosas cada mes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Cursos de Nutrición</h2>
            <Link to="/demo" className="btn btn-outline-primary">
              Ver todos los cursos →
            </Link>
          </div>

          <div className="row">
            {store.courses.slice(0, 3).map((course) => (
              <div key={course.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={course.image_url}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                    alt={course.title}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-semibold">{course.title}</h5>
                    <p className="text-muted small">
                      {course.description?.slice(0, 80) || 'Curso de nutrición'}...
                    </p>
                    <p className="fw-bold text-success mt-auto">{course.price} €</p>
                    <Link
                      to={`/single/${course.id}`}
                      className="btn btn-primary w-100 mt-2"
                    >
                      Ver curso
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="text-center">
          <h2 className="fw-bold mb-3">¿Listo para revolucionar tu dieta?</h2>
          <p className="text-muted mb-4">
            Miles de personas ya han transformado su relación con la comida.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg px-5">
            Comenzar Mi Plan
          </Link>
        </div>
      </div>
    </div>
  );
};