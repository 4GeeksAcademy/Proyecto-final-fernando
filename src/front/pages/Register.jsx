import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Register = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      const resp = await fetch(backendUrl + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.msg || "Error al registrarse");
        return;
      }
      setInfo("Usuario creado correctamente.");
      setMode("login");
    } catch (err) {
      setError("Error de conexión");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      const resp = await fetch(backendUrl + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.msg || "Credenciales inválidas");
        return;
      }
      dispatch({ type: "set_token", payload: data.token });
      dispatch({ type: "set_user", payload: data.user });
      navigate("/demo");
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {info && <div className="alert alert-success">{info}</div>}

      <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100 mb-3">
          {mode === "login" ? "Entrar" : "Registrarse"}
        </button>
      </form>

      <div className="text-center">
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
            setInfo(null);
          }}
        >
          {mode === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>

      <div className="text-center mt-3">
        <Link to="/">Volver al inicio</Link>
      </div>
    </div>
  );
};
