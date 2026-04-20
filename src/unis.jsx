import { useState, useEffect } from 'react';
import './unis.css';

function Unis() {

  const [formData, setFormData] = useState({
    nombre: '',
    carrera: '',
    telefono: '',
    correo: '',
    escuela: ''
  });

  const [escuelas, setEscuelas] = useState([]);
  const [otraEscuela, setOtraEscuela] = useState('');

  useEffect(() => {
    fetch('/api/escuelas')
      .then(res => res.json())
      .then(data => setEscuelas(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const escuelaFinal =
    formData.escuela === "Otra" ? otraEscuela : formData.escuela;

  try {
    const res = await fetch('/api/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, escuela: escuelaFinal })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al guardar ❌");
      return;
    }

    alert("Registro guardado 🚀");

    setFormData({
      nombre: '',
      carrera: '',
      telefono: '',
      correo: '',
      escuela: ''
    });

    setOtraEscuela('');

  } catch (error) {
    alert("Error de conexión ❌");
  }
};


  return (
    <div>

      <div className="header">
        <h1>UTZAC</h1>
        <p>Universidad Tecnológica de Zacatecas</p>
      </div>

      <div className="main">

        {/* INFO */}
        <div className="info">
          <h2>¿Por qué elegir UTZAC?</h2>
          <ul>
            <li>✔ Educación tecnológica de calidad</li>
            <li>✔ Vinculación directa con empresas</li>
            <li>✔ Carreras con alta demanda laboral</li>
            <li>✔ Instalaciones modernas</li>
          </ul>
        </div>

        {/* FORM */}
        <div className="form">
          <div className="form-card">

            <h2>Registro de Aspirantes</h2>

            <form onSubmit={handleSubmit}>

              <input name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />

              <select name="carrera" value={formData.carrera} onChange={handleChange} required>
                <option value="">Carrera</option>
              <option value="TI">Tecnologías de la Información</option>
              <option value="Mecatronica">Mecatrónica</option>
              <option value="Mantenimiento">Mantenimiento Industrial</option>
              <option value="Renovables">Energías Renovables</option>
              <option value="Logistica">Logística</option>
              <option value="Procesos">Procesos Industriales</option>
              <option value="Negocios">Desarrollo de Negocios</option>
              </select>

              <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
              <input name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required />

              <select name="escuela" value={formData.escuela} onChange={handleChange} required>
                <option value="">Escuela de procedencia</option>

                {escuelas.map(e => (
                  <option key={e.id} value={e.nombre}>{e.nombre}</option>
                ))}

                <option value="Otra">Otra</option>
              </select>

              {formData.escuela === "Otra" && (
                <input
                  placeholder="Escribe tu escuela"
                  value={otraEscuela}
                  onChange={(e) => setOtraEscuela(e.target.value)}
                  required
                />
              )}

              <button>Enviar registro</button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Unis;