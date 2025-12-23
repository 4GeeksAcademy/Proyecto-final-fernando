import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/courses");
      const data = await resp.json();
      dispatch({ type: "set_courses", payload: data });
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (course) => {
    dispatch({
      type: "add_to_cart",
      payload: {
        id: course.id,
        title: course.title,
        price: Number(course.price),
        image_url: course.image_url,
        description: course.description
      }
    });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const courses = store.courses || [];

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando cursos...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-6">Cursos de Nutrición</h1>
        <p className="text-muted fs-5">
          Aprende con expertos y transforma tu alimentación
        </p>
      </div>

      <div className="row">
        {courses.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="display-1 mb-3">📚</div>
            <h4>No hay cursos disponibles</h4>
            <p className="text-muted">Próximamente añadiremos nuevos cursos</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0 overflow-hidden">
                <div className="position-relative">
                  <img
                    src={course.image_url || "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80"}
                    alt={course.title}
                    className="card-img-top"
                    style={{ 
                      height: "220px", 
                      objectFit: "cover",
                      transition: "transform 0.3s"
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-success bg-opacity-90 text-white">
                      {course.price} €
                    </span>
                  </div>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold mb-3">
                    {course.title}
                  </h5>

                  <p className="card-text text-muted flex-grow-1 mb-4">
                    {course.description?.slice(0, 100) || 'Curso práctico de nutrición y alimentación saludable'}...
                  </p>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-lg py-2"
                      onClick={() => addToCart(course)}
                    >
                      <span className="me-2">🛒</span>
                      Añadir al carrito
                    </button>

                    <Link
                      to={`/single/${course.id}`}
                      className="btn btn-outline-primary py-2"
                    >
                      Ver detalles del curso
                    </Link>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent border-top-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <span className="me-2">⏱️</span>
                      Curso completo
                    </small>
                    <small className="text-success">
                      <span className="me-1">✅</span>
                      Certificado incluido
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-5 pt-4 border-top">
        <Link to="/" className="btn btn-outline-primary px-5 py-2">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};