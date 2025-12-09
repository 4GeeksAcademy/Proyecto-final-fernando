import { Link } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadCourses = async () => {
    try {
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/courses");
      const data = await resp.json();
      dispatch({ type: "set_courses", payload: data });
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  const addToCart = (course) => {
    console.log("Añadiendo curso:", course);
    
    const courseToAdd = {
      id: course.id,
      title: course.title,
      price: course.price,
      image_url: course.image_url,
      description: course.description
    };
    
    dispatch({ type: "add_to_cart", payload: courseToAdd });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  console.log("Cursos en store:", store.courses.length);

  return (
    <div className="container mt-4">
      <h2>Catálogo de Cursos</h2>

      <div className="row">
        {store.courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={course.image_url}
                className="card-img-top"
                alt={course.title}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="fw-bold">{course.price} €</p>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => addToCart(course)}
                >
                  Añadir al carrito
                </button>

                <Link to={`/single/${course.id}`} className="btn btn-secondary">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/">
        <button className="btn btn-dark mt-4">Volver al inicio</button>
      </Link>
    </div>
  );
};