import { Link } from "react-router-dom";

export const FAQ = () => {
  const faqs = [
    {
      pregunta: "¿Cómo accedo a mis cursos después de comprar?",
      respuesta: "Puedes acceder desde 'Mis cursos' en tu cuenta."
    },
    {
      pregunta: "¿Los cursos tienen certificado?",
      respuesta: "Sí, todos incluyen certificado de finalización."
    },
    {
      pregunta: "¿Puedo descargar el contenido?",
      respuesta: "Sí, el material complementario es descargable."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos tarjetas de crédito/débito a través de Stripe."
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Preguntas Frecuentes</h1>
        <p className="text-muted">Encuentra respuestas a tus dudas</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 pb-3 border-bottom">
                  <h5 className="fw-bold">• {faq.pregunta}</h5>
                  <p className="text-muted mb-0">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-primary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};