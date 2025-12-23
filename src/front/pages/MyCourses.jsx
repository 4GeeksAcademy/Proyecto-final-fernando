import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import jsPDF from "jspdf";

export const MyCourses = () => {
  const { store } = useGlobalReducer();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const downloadCertificate = (course) => {
    const doc = new jsPDF();
    const userName = store.user?.email || "Alumno";
    const date = new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    doc.setFontSize(24);
    doc.setTextColor(76, 175, 80);
    doc.text("🎓 CERTIFICADO", 105, 30, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Se hace constar que", 105, 50, { align: "center" });

    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text(userName, 105, 70, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(108, 117, 125);
    doc.text("ha completado satisfactoriamente el curso", 105, 90, {
      align: "center",
    });

    doc.setFontSize(18);
    doc.setTextColor(33, 37, 41);
    doc.text(`"${course.title}"`, 105, 110, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125);
    doc.text(`Fecha de emisión: ${date}`, 105, 135, { align: "center" });

    doc.setFontSize(10);
    doc.text("Revoluciona Tu Dieta • Certificado digital", 105, 160, {
      align: "center"
    });

    doc.text("ID del certificado: RTD-" + Date.now(), 105, 170, {
      align: "center"
    });

    doc.save(`certificado-${course.title.replace(/\s+/g, '-')}.pdf`);
  };

  const loadMyCourses = async () => {
    if (!store.token) {
      setLoading(false);
      setError("Debes iniciar sesión para ver tus cursos.");
      return;
    }

    try {
      const resp = await fetch(backendUrl + "/my-courses", {
        headers: { Authorization: "Bearer " + store.token },
      });
      const data = await resp.json();

      if (!resp.ok) {
        setError(data.msg || "Error cargando tus cursos.");
      } else {
        const withProgress = data.map((c, i) => ({
          ...c,
          progress: [25, 50, 75, 100][i % 4],
        }));
        setCourses(withProgress);
      }
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h4 className="mt-4">Cargando tus cursos...</h4>
        </div>
      </div>
    );
  }

  if (!store.token) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="display-1 text-muted mb-4">🔒</div>
            <h2 className="fw-bold mb-3">Acceso restringido</h2>
            <p className="text-muted mb-4">
              Debes iniciar sesión para acceder a tus cursos comprados.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button 
                className="btn btn-primary px-4 py-2"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
              <button 
                className="btn btn-outline-primary px-4 py-2"
                onClick={() => navigate("/register")}
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-5">
        <h1 className="fw-bold display-6 mb-3">Mis Cursos</h1>
        <p className="text-muted fs-5">
          Continúa tu aprendizaje desde donde lo dejaste
        </p>
        
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex gap-3">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
              {courses.length} curso{courses.length !== 1 ? 's' : ''}
            </span>
            {courses.some(c => c.progress === 100) && (
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                {courses.filter(c => c.progress === 100).length} completado{courses.filter(c => c.progress === 100).length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <Link to="/demo" className="btn btn-outline-primary">
            + Explorar más cursos
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {courses.length === 0 && !error ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="display-1 text-muted mb-4">📚</div>
            <h3 className="fw-bold mb-3">Aún no tienes cursos</h3>
            <p className="text-muted mb-4">
              Empieza tu viaje de aprendizaje explorando nuestro catálogo de cursos.
            </p>
            <Link to="/demo" className="btn btn-primary btn-lg px-5">
              Explorar cursos
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative">
                  <img
                    src={course.image_url || "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80"}
                    alt={course.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className={`badge ${course.progress === 100 ? 'bg-success' : 'bg-primary'} bg-opacity-90 text-white px-3 py-2`}>
                      {course.progress === 100 ? '✅ Completado' : `${course.progress}%`}
                    </span>
                  </div>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold mb-3">{course.title}</h5>
                  
                  <div className="mt-2 mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <small className="text-muted">Progreso</small>
                      <small className="text-muted">{course.progress}%</small>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div 
                        className={`progress-bar ${course.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto d-grid gap-2">
                    <Link
                      to={`/single/${course.id}`}
                      className={`btn ${course.progress === 100 ? 'btn-outline-success' : 'btn-primary'} py-2`}
                    >
                      {course.progress === 100 ? '📖 Repasar curso' : '▶️ Continuar aprendiendo'}
                    </Link>
                    
                    <button
                      className="btn btn-outline-primary py-2"
                      onClick={() => downloadCertificate(course)}
                    >
                      🎓 Descargar certificado
                    </button>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent border-top d-flex justify-content-between">
                  <small className="text-muted">
                    <span className="me-1">📅</span>
                    Acceso de por vida
                  </small>
                  {course.progress === 100 && (
                    <small className="text-success">
                      <span className="me-1">🏆</span>
                      Certificado listo
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-primary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};