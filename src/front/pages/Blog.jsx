import { Link, useParams } from "react-router-dom";

export const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "5 Consejos para una Alimentación Saludable",
      excerpt: "Aprende hábitos simples para mejorar tu nutrición diaria.",
      content: `
        <h4>1. Come más frutas y verduras</h4>
        <p>Intenta llenar la mitad de tu plato con verduras en cada comida.</p>
        
        <h4>2. Hidrátate bien</h4>
        <p>Bebe al menos 2 litros de agua al día. Evita bebidas azucaradas.</p>
        
        <h4>3. Planifica tus comidas</h4>
        <p>Dedica 30 minutos el domingo a planificar tu semana de comidas.</p>
        
        <h4>4. Cocina en casa</h4>
        <p>Preparar tus propias comidas te permite controlar los ingredientes.</p>
        
        <h4>5. Escucha tu cuerpo</h4>
        <p>Come cuando tengas hambre real, no por aburrimiento o estrés.</p>
      `,
      date: "20 Nov 2025",
      readTime: "3 min",
      category: "Consejos"
    },
    {
      id: 2,
      title: "Recetas Fáciles para Bajar de Peso",
      excerpt: "Platos deliciosos y nutritivos para tu día a día.",
      content: `
        <h4>Ensalada de Quinoa y Aguacate</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>1 taza de quinoa cocida</li>
          <li>1 aguacate maduro</li>
          <li>Tomate cherry</li>
          <li>Jugo de limón</li>
          <li>Aceite de oliva</li>
          <li>Sal y pimienta</li>
        </ul>
        <p><strong>Preparación:</strong> Mezcla todos los ingredientes y aliña con limón y aceite.</p>
        
        <h4>Smoothie Verde Energético</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>1 plátano</li>
          <li>1 puñado de espinacas</li>
          <li>1/2 aguacate</li>
          <li>1 taza de leche de almendras</li>
          <li>1 cucharada de semillas de chía</li>
        </ul>
        <p><strong>Preparación:</strong> Licúa todo hasta obtener una textura homogénea.</p>
      `,
      date: "18 Nov 2025",
      readTime: "4 min",
      category: "Recetas"
    },
    {
      id: 3,
      title: "Importancia de la Hidratación",
      excerpt: "Descubre por qué el agua es esencial para tu salud.",
      content: `
        <h4>Beneficios del agua para el cuerpo</h4>
        <p>El agua es fundamental para:</p>
        <ul>
          <li>Regular la temperatura corporal</li>
          <li>Transportar nutrientes a las células</li>
          <li>Eliminar toxinas del cuerpo</li>
          <li>Mantener la piel hidratada</li>
          <li>Mejorar la digestión</li>
        </ul>
        
        <h4>¿Cuánta agua necesitas?</h4>
        <p>La recomendación general es de 2-3 litros diarios, pero depende de:</p>
        <ul>
          <li>Tu peso corporal</li>
          <li>Nivel de actividad física</li>
          <li>Clima donde vives</li>
          <li>Si estás embarazada o en lactancia</li>
        </ul>
        
        <h4>Señales de deshidratación</h4>
        <ul>
          <li>Boca seca</li>
          <li>Fatiga</li>
          <li>Dolor de cabeza</li>
          <li>Orina oscura</li>
          <li>Mareos</li>
        </ul>
      `,
      date: "15 Nov 2025",
      readTime: "2 min",
      category: "Salud"
    },
    {
      id: 4,
      title: "Cómo Planificar tu Semana de Comidas",
      excerpt: "Organiza tus comidas para ahorrar tiempo y comer mejor.",
      content: `
        <h4>Paso 1: Elige un día para planificar</h4>
        <p>Domingo por la tarde es ideal para planificar la semana.</p>
        
        <h4>Paso 2: Revisa lo que tienes</h4>
        <p>Revisa tu nevera y despensa antes de hacer la lista de compras.</p>
        
        <h4>Paso 3: Crea un menú semanal</h4>
        <p><strong>Ejemplo de menú:</strong></p>
        <ul>
          <li><strong>Lunes:</strong> Pescado al horno con verduras</li>
          <li><strong>Martes:</strong> Pollo a la plancha con quinoa</li>
          <li><strong>Miércoles:</strong> Lentejas con arroz integral</li>
          <li><strong>Jueves:</strong> Salmón con brócoli al vapor</li>
          <li><strong>Viernes:</strong> Pizza casera de vegetales</li>
          <li><strong>Sábado:</strong> Tacos de carne magra</li>
          <li><strong>Domingo:</strong> Ensalada completa con pollo</li>
        </ul>
        
        <h4>Paso 4: Prepara por adelantado</h4>
        <p>Corta verduras, cocina granos y prepara aderezos el domingo.</p>
        
        <h4>Paso 5: Haz una lista de compras</h4>
        <p>Compra solo lo que necesites según tu planificación.</p>
      `,
      date: "10 Nov 2025",
      readTime: "4 min",
      category: "Organización"
    },
    {
      id: 5,
      title: "Recetas de Cena Saludable",
      excerpt: "Cenas ligeras y nutritivas para dormir mejor.",
      content: `
        <h4>Sopa de Calabacín</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>2 calabacines</li>
          <li>1 cebolla</li>
          <li>2 dientes de ajo</li>
          <li>1 litro de caldo de verduras</li>
          <li>Hierbas provenzales</li>
          <li>Aceite de oliva</li>
        </ul>
        <p><strong>Preparación (20 min):</strong> Sofríe la cebolla y ajo. Añade calabacín cortado y cocina 5 min. Agrega caldo y hierbas. Cocina 15 min y tritura.</p>
        
        <h4>Tortilla de Clara de Huevo</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>4 claras de huevo</li>
          <li>Espinacas</li>
          <li>Champiñones</li>
          <li>Tomate</li>
          <li>Pizca de sal</li>
        </ul>
        <p><strong>Preparación (10 min):</strong> Bate las claras. Saltea las verduras. Vierte las claras sobre las verduras en sartén antiadherente. Cocina a fuego medio hasta cuajar.</p>
        
        <h4>Ensalada de Atún</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>1 lata de atún al natural</li>
          <li>Lechuga</li>
          <li>Tomate</li>
          <li>Pepino</li>
          <li>Maíz dulce</li>
          <li>Aliño: yogur natural, mostaza, limón</li>
        </ul>
        <p><strong>Preparación (5 min):</strong> Mezcla todos los ingredientes y aliña con la salsa de yogur.</p>
      `,
      date: "5 Nov 2025",
      readTime: "3 min",
      category: "Recetas"
    },
    {
      id: 6,
      title: "Desayunos Energéticos",
      excerpt: "Empieza el día con la energía necesaria.",
      content: `
        <h4>Avena con Frutas</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>1/2 taza de avena</li>
          <li>1 taza de leche vegetal</li>
          <li>1 plátano</li>
          <li>Frutos rojos</li>
          <li>1 cucharada de miel</li>
          <li>Canela al gusto</li>
        </ul>
        <p><strong>Preparación (5 min):</strong> Cocina la avena con leche 3 min. Sirve con frutas, miel y canela.</p>
        
        <h4>Tostadas de Aguacate</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>2 rebanadas de pan integral</li>
          <li>1/2 aguacate</li>
          <li>Tomate en rodajas</li>
          <li>Huevo pochado (opcional)</li>
          <li>Semillas de sésamo</li>
          <li>Jugo de limón</li>
        </ul>
        <p><strong>Preparación (10 min):</strong> Tuesta el pan. Aplasta aguacate con limón y sal. Unta en el pan. Añade tomate y huevo si lo deseas. Espolvorea semillas.</p>
        
        <h4>Batido Proteico</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>1 taza de leche</li>
          <li>1 scoop de proteína en polvo</li>
          <li>1/2 plátano</li>
          <li>1 cucharada de mantequilla de maní</li>
          <li>Hielo</li>
        </ul>
        <p><strong>Preparación (3 min):</strong> Licúa todos los ingredientes hasta que quede suave.</p>
      `,
      date: "1 Nov 2025",
      readTime: "3 min",
      category: "Recetas"
    }
  ];

  const { id } = useParams();
  
  if (id) {
    const article = articles.find(a => a.id === parseInt(id));
    if (!article) {
      return (
        <div className="container mt-5 text-center">
          <h2>Artículo no encontrado</h2>
          <Link to="/blog" className="btn btn-primary mt-3">
            Volver al blog
          </Link>
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Link to="/blog" className="btn btn-outline-secondary mb-4">
              ← Volver al blog
            </Link>
            
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-primary">{article.category}</span>
                  <small className="text-muted">{article.readTime} lectura</small>
                </div>
                
                <h1 className="fw-bold mb-3">{article.title}</h1>
                
                <div className="d-flex justify-content-between border-bottom pb-3 mb-4">
                  <small className="text-muted">Publicado: {article.date}</small>
                </div>
                
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                <div className="mt-5 pt-4 border-top">
                  <Link to="/blog" className="btn btn-outline-secondary me-2">
                    ← Volver al blog
                  </Link>
                  <Link to="/demo" className="btn btn-primary">
                    Ver cursos de nutrición
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Blog de Nutrición</h1>
        <p className="text-muted">
          Consejos prácticos, recetas y artículos para mejorar tu salud
        </p>
      </div>

      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-primary">{article.category}</span>
                  <small className="text-muted">{article.readTime}</small>
                </div>
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text text-muted">{article.excerpt}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-muted">{article.date}</small>
                  <Link 
                    to={`/blog/${article.id}`} 
                    className="btn btn-sm btn-outline-primary"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-secondary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};