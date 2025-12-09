import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = props => {
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams();
  const [course, setCourse] = useState(null);

  const id = parseInt(theId);

  const loadCourse = async () => {
    const fromStore = store.courses.find(c => c.id === id);
    if (fromStore) {
      setCourse(fromStore);
      return;
    }
    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/courses/" + id
      );
      const data = await resp.json();
      setCourse(data);
    } catch (err) {
      console.error("Error loading course detail:", err);
    }
  };

  const addToCart = () => {
    if (course) {
      dispatch({ type: "add_to_cart", payload: course });
    }
  };

  useEffect(() => {
    loadCourse();
  }, [theId, store.courses]);

  if (!course) {
    return (
      <div className="container text-center mt-5">
        <h2>Cargando curso...</h2>
        <Link to="/demo" className="btn btn-secondary mt-3">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={course.image_url}
            alt={course.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{course.title}</h1>
          <p className="mt-3">{course.description}</p>
          <h3 className="mt-3">{course.price} €</h3>

          <button className="btn btn-primary me-2 mt-3" onClick={addToCart}>
            Añadir al carrito
          </button>

          <Link to="/demo" className="btn btn-secondary mt-3 me-2">
            Volver al catálogo
          </Link>

          <Link to="/" className="btn btn-outline-dark mt-3">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};
