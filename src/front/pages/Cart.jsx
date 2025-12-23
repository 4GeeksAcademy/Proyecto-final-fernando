import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Cart = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(false);

  const cart = Array.isArray(store.cart) ? store.cart : [];
  
  const removeItem = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este curso del carrito?")) {
      dispatch({ type: "remove_from_cart", payload: id });
    }
  };

  const clearCart = () => {
    if (cart.length > 0 && window.confirm("¿Vaciar todo el carrito?")) {
      dispatch({ type: "clear_cart" });
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price;
  }, 0);

  const handleCheckout = async () => {
    if (!store.token) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    setProcessing(true);

    const course_ids = cart.map((c) => c.id);

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
    } finally {
      setProcessing(false);
    }
  };

  
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold mb-4">🛒 Carrito Vacío</h1>
        <p className="text-muted mb-4">No hay cursos en tu carrito.</p>
        <Link to="/demo" className="btn btn-primary">
          Ver cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-2">Carrito de Compras</h1>
          <p className="text-muted">
            {cart.length} curso{cart.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={clearCart}
        >
          🗑️ Vaciar
        </button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Curso</th>
                      <th className="text-end">Precio</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((course, index) => (
                      <tr key={`${course.id}-${index}`}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div 
                              className="bg-secondary me-3 rounded"
                              style={{ 
                                width: "50px", 
                                height: "50px",
                                backgroundImage: `url(${course.image_url || ''})`,
                                backgroundSize: 'cover'
                              }}
                            />
                            <div>
                              <h6 className="mb-1">{course.title}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="text-end align-middle">
                          <strong>{course.price} €</strong>
                        </td>
                        <td className="text-end align-middle">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeItem(course.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link to="/demo" className="btn btn-outline-primary">
              ← Seguir comprando
            </Link>
            <Link to="/" className="btn btn-outline-secondary">
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Resumen</h4>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total</span>
                  <span className="text-success fw-bold">{total.toFixed(2)} €</span>
                </div>
              </div>

              <button 
                className="btn btn-success w-100 py-3 mb-3"
                onClick={handleCheckout}
                disabled={processing}
              >
                {processing ? 'Procesando...' : '💳 Proceder al pago'}
              </button>

              <div className="small text-muted text-center">
                Pago seguro con Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};