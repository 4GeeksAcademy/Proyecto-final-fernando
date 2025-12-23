import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { theId } = useParams();
  const { store, dispatch } = useGlobalReducer();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("descripcion");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const id = parseInt(theId);
    if (isNaN(id)) {
      setError("ID de curso inválido");
      setLoading(false);
      return;
    }

    const fromStore = store.courses.find((c) => c.id === id);
    if (fromStore) {
      setCourse(fromStore);
      setLoading(false);
      return;
    }

    const loadCourse = async () => {
      try {
        const resp = await fetch(`${backendUrl}/courses/${id}`);
        const data = await resp.json();
        if (!resp.ok) setError(data.msg || "Error cargando el curso.");
        else setCourse(data);
      } catch {
        setError("Error de conexión al cargar el curso.");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [theId, store.courses, backendUrl]);

  const addToCart = () => {
    if (!course) return;
    const already = store.cart.some((c) => c.id === course.id);
    if (already) {
      alert("Este curso ya está en tu carrito.");
      return;
    }
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
    alert("✅ Curso añadido al carrito.");
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h4 className="mt-4">Cargando curso...</h4>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="display-1 text-muted mb-3">😕</div>
            <h2>Curso no encontrado</h2>
            <p className="text-muted mb-4">{error || "El curso que buscas no existe."}</p>
            <Link to="/demo" className="btn btn-primary px-4 py-2">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inCart = store.cart.some((c) => c.id === course.id);
  const related = store.courses.filter((c) => c.id !== course.id).slice(0, 3);

  const courseDetails = [
    { icon: "⏱️", label: "Duración", value: "8 horas" },
    { icon: "📊", label: "Nivel", value: "Principiante a Intermedio" },
    { icon: "🎬", label: "Lecciones", value: "12 videos HD" },
    { icon: "📚", label: "Material", value: "PDF + Ejercicios" },
    { icon: "🔄", label: "Acceso", value: "De por vida" },
    { icon: "🏆", label: "Certificado", value: "Incluido" }
  ];

  const testimonials = [
    { name: "María G.", text: "Excelente curso, muy completo y bien explicado.", rating: 5 },
    { name: "Carlos R.", text: "Me ayudó muchísimo con mi nutrición deportiva.", rating: 4 },
    { name: "Ana M.", text: "Las recetas prácticas son increíbles, ¡las uso cada día!", rating: 5 }
  ];

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/demo" className="text-decoration-none">Cursos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{course.title}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="card border-0 shadow-lg overflow-hidden rounded-3">
            <img
              src={course.image_url || "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80"}
              alt={course.title}
              className="img-fluid w-100"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-img-overlay d-flex justify-content-end align-items-start">
              <span className="badge bg-success bg-opacity-90 text-white fs-6 px-3 py-2">
                {course.price} €
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-lg-5">
              <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2">
                Curso de Nutrición
              </span>
              
              <h1 className="fw-bold mb-3">{course.title}</h1>
              
              <p className="lead text-muted mb-4">{course.description}</p>

              <div className="row g-3 mb-4">
                {courseDetails.map((detail, index) => (
                  <div key={index} className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <span className="fs-4 me-3">{detail.icon}</span>
                      <div>
                        <small className="text-muted d-block">{detail.label}</small>
                        <strong>{detail.value}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top pt-4 mt-4">
                <h3 className="fw-bold mb-3">Este curso incluye:</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ Acceso completo a todas las lecciones</li>
                  <li className="mb-2">✅ Material descargable en PDF</li>
                  <li className="mb-2">✅ Ejercicios prácticos para aplicar</li>
                  <li className="mb-2">✅ Certificado de finalización</li>
                  <li className="mb-2">✅ Soporte por email</li>
                </ul>
              </div>

              <div className="d-grid gap-3 mt-5">
                {!inCart ? (
                  <button 
                    className="btn btn-primary btn-lg py-3 fw-bold"
                    onClick={addToCart}
                  >
                    <span className="me-2">🛒</span>
                    Añadir al carrito - {course.price} €
                  </button>
                ) : (
                  <Link 
                    to="/cart" 
                    className="btn btn-success btn-lg py-3 fw-bold"
                  >
                    <span className="me-2">✅</span>
                    Ya está en tu carrito - Ver ahora
                  </Link>
                )}
                
                <Link 
                  to="/demo" 
                  className="btn btn-outline-primary btn-lg py-3"
                >
                  ← Volver a todos los cursos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === "descripcion" ? "active text-primary fw-bold" : "text-muted"}`}
                    onClick={() => setActiveTab("descripcion")}
                  >
                    📝 Descripción completa
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === "testimonios" ? "active text-primary fw-bold" : "text-muted"}`}
                    onClick={() => setActiveTab("testimonios")}
                  >
                    ⭐ Opiniones ({testimonials.length})
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="card-body p-4 p-lg-5">
              {activeTab === "descripcion" ? (
                <div>
                  <h4 className="fw-bold mb-4">¿Qué aprenderás en este curso?</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-3">✅ Fundamentos de nutrición saludable</li>
                        <li className="mb-3">✅ Cómo planificar tus comidas semanales</li>
                        <li className="mb-3">✅ Lectura de etiquetas nutricionales</li>
                        <li className="mb-3">✅ Recetas prácticas para cada día</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-3">✅ Manejo de porciones y cantidades</li>
                        <li className="mb-3">✅ Nutrición para objetivos específicos</li>
                        <li className="mb-3">✅ Alimentación consciente</li>
                        <li className="mb-3">✅ Mantener resultados a largo plazo</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-light rounded">
                    <h5 className="fw-bold">🎯 Para quién es este curso:</h5>
                    <p className="mb-0">
                      Personas que quieren mejorar su alimentación, deportistas que buscan optimizar su nutrición, 
                      o cualquier interesado en aprender sobre alimentación saludable de forma práctica.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                              <div className="text-warning fs-5">
                                {"⭐".repeat(testimonial.rating)}
                              </div>
                            </div>
                            <p className="card-text fst-italic mb-4">"{testimonial.text}"</p>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                <span className="text-primary">👤</span>
                              </div>
                              <div>
                                <strong>{testimonial.name}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-5">
          <h2 className="fw-bold mb-4">También te puede interesar</h2>
          <div className="row">
            {related.map((r) => (
              <div key={r.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={r.image_url}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={r.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{r.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {r.description?.slice(0, 80) || 'Curso de nutrición'}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold text-success">{r.price} €</span>
                      <Link 
                        to={`/single/${r.id}`} 
                        className="btn btn-outline-primary btn-sm"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};