import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const MyCourses = () => {
  const { store } = useGlobalReducer();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadMyCourses = async () => {
    if (!store.token) {
      setLoading(false);
      setErr("Debes iniciar sesión para ver tus cursos.");
      return;
    }

    try {
      const resp = await fetch(backendUrl + "/my-courses", {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      });
      const data = await resp.json();
      if (!resp.ok) {
        setErr(data.msg || "Error cargando tus cursos.");
      } else {
        setCourses(data);
      }
    } catch (e) {
      console.error(e);
      setErr("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h2>Mis cursos</h2>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!store.token) {
    return (
      <div className="container mt-4">
        <h2>Mis cursos</h2>
        <div className="alert alert-warning mt-3">
          Debes iniciar sesión para ver tus cursos.
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Ir a login / registro
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Mis cursos</h2>

      {err && (
        <div className="alert alert-danger mt-3" role="alert">
          {err}
        </div>
      )}

      {courses.length === 0 && !err ? (
        <div className="mt-3">
          <p>Aún no has comprado ningún curso.</p>
          <Link to="/demo" className="btn btn-primary">
            Ver catálogo de cursos
          </Link>
        </div>
      ) : (
        <div className="row mt-3">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text flex-grow-1">
                    {course.description}
                  </p>
                  <p className="fw-bold">{course.price} €</p>
                  <Link
                    to={`/single/${course.id}`}
                    className="btn btn-outline-primary mt-2"
                  >
                    Ir al curso
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
