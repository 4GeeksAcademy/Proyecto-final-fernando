import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const Cart = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const removeItem = (id) => {
    dispatch({ type: "remove_from_cart", payload: id });
  };

  const total = store.cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!store.token) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/register");
      return;
    }

    if (!store.cart.length) {
      alert("Tu carrito está vacío.");
      return;
    }

    const course_ids = store.cart.map((c) => c.id);

    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({ course_ids }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        alert(data.msg || "Error creando checkout");
        return;
      }
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("No se recibió URL de pago.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>

      {store.cart.length === 0 ? (
        <div className="mt-4">
          <h5>Tu carrito está vacío</h5>
          <Link to="/demo" className="btn btn-primary mt-3">
            Ver cursos
          </Link>
        </div>
      ) : (
        <>
          <ul className="list-group mt-3">
            {store.cart.map((course, index) => (
              <li
                key={course.id + "-" + index}  
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{course.title}</strong>
                  <p className="mb-0">{course.price} €</p>
                </div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeItem(course.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <h4 className="mt-4">Total: {total} €</h4>

          <Link to="/demo" className="btn btn-secondary mt-3 me-2">
            Seguir comprando
          </Link>

          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Comprar ahora
          </button>
        </>
      )}
    </div>
  );
};
