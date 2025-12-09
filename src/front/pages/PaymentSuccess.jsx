import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PaymentSuccess = () => {
  const { store } = useGlobalReducer();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [courseIds, setCourseIds] = useState([]);
  const [status, setStatus] = useState("idle"); 
  const [message, setMessage] = useState(
    "Pago realizado correctamente. Ahora puedes activar tus cursos."
  );

  
  useEffect(() => {
    const idsParam = searchParams.get("course_ids");
    if (!idsParam) {
      setStatus("error");
      setMessage("No se recibieron cursos para activar.");
      return;
    }

    const ids = idsParam
      .split(",")
      .map((x) => parseInt(x))
      .filter((n) => !isNaN(n));

    if (!ids.length) {
      setStatus("error");
      setMessage("La lista de cursos recibida es inválida.");
      return;
    }

    setCourseIds(ids);

    if (!store.token) {
      setStatus("error");
      setMessage("Debes iniciar sesión para activar tus cursos.");
      return;
    }

    setStatus("idle");
  }, [searchParams, store.token]);

  const handleActivate = async () => {
    if (!store.token) {
      setStatus("error");
      setMessage("Debes iniciar sesión para activar tus cursos.");
      return;
    }

    if (!courseIds.length) {
      setStatus("error");
      setMessage("No hay cursos válidos para activar.");
      return;
    }

    setStatus("loading");
    setMessage("Activando tus cursos, por favor espera...");

    try {
      const resp = await fetch(backendUrl + "/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + store.token,
        },
        body: JSON.stringify({ course_ids: courseIds }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setStatus("error");
        setMessage(data.msg || "Ocurrió un error al activar tus cursos.");
        return;
      }

      setStatus("ok");
      setMessage("¡Pago completado y cursos activados correctamente!");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Error de conexión al activar tus cursos.");
    }
  };

  const alertClass =
    status === "ok"
      ? "alert-success"
      : status === "error"
      ? "alert-danger"
      : status === "loading"
      ? "alert-info"
      : "alert-primary";

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-center">Resultado del pago</h2>

      <div className={`alert text-center ${alertClass}`} role="alert">
        {message}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        {status !== "ok" && (
          <button
            className="btn btn-success"
            onClick={handleActivate}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Activando..." : "Activar mis cursos"}
          </button>
        )}

        <button
          className="btn btn-primary"
          onClick={() => navigate("/my-courses")}
        >
          Ir a mis cursos
        </button>

        <Link to="/demo" className="btn btn-outline-secondary">
          Ver más cursos
        </Link>
      </div>
    </div>
  );
};
