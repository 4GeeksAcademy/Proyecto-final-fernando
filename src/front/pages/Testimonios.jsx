import { Link } from "react-router-dom";

export const Testimonios = () => {
  const testimonios = [
    {
      id: 1,
      nombre: "María González",
      resultado: "Perdió 12 kg",
      texto: "Gracias a los planes personalizados logré bajar de peso sin pasar hambre. ¡Mi energía aumentó increíblemente!",
      foto: "👩",
      tiempo: "Hace 2 meses"
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      resultado: "Mejoró su digestión",
      texto: "Los problemas digestivos que tenía por años desaparecieron con la dieta adecuada. ¡Me siento nuevo!",
      foto: "👨",
      tiempo: "Hace 1 mes"
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      resultado: "Controló su diabetes",
      texto: "Mis niveles de azúcar se estabilizaron completamente. El seguimiento personalizado fue clave.",
      foto: "👩",
      tiempo: "Hace 3 meses"
    },
    {
      id: 4,
      nombre: "David López",
      resultado: "Ganó masa muscular",
      texto: "Combinando nutrición y ejercicio, logré el cuerpo que siempre quise de forma saludable.",
      foto: "👨",
      tiempo: "Hace 4 meses"
    },
    {
      id: 5,
      nombre: "Laura Sánchez",
      resultado: "Mejoró su piel",
      texto: "Los cambios en mi alimentación eliminaron mis problemas de acné. ¡Mi piel nunca había estado mejor!",
      foto: "👩",
      tiempo: "Hace 2 meses"
    },
    {
      id: 6,
      nombre: "Javier Ruiz",
      resultado: "Más energía",
      texto: "De sentirme cansado todo el día a tener energía de sobra. La nutrición cambió mi vida.",
      foto: "👨",
      tiempo: "Hace 5 meses"
    }
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Testimonios Reales</h1>
        <p className="text-muted">
          Historias de transformación de nuestros clientes
        </p>
      </div>

      <div className="row">
        {testimonios.map((testimonio) => (
          <div key={testimonio.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-3">{testimonio.foto}</div>
                <div className="badge bg-success bg-opacity-10 text-success mb-3 px-3 py-2">
                  {testimonio.resultado}
                </div>
                <p className="card-text fst-italic mb-4">"{testimonio.texto}"</p>
                <h5 className="card-title mb-1">{testimonio.nombre}</h5>
                <small className="text-muted">{testimonio.tiempo}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-secondary me-2">
          ← Volver al inicio
        </Link>
        <Link to="/register" className="btn btn-primary">
          ¡Quiero mi Transformación!
        </Link>
      </div>
    </div>
  );
};