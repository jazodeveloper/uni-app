import { useState, useEffect } from 'react';
import './unis.css';
import { supabase } from './supabase';

function Unis() {

  const [formData, setFormData] = useState({
    nombre: '',
    carrera: '',
    telefono: '',
    correo: '',
    escuela: ''
  });

  const [otraEscuela, setOtraEscuela] = useState('');
  const [escuelas, setEscuelas] = useState([]);

  useEffect(() => {
    fetch("http://localhost/unis-app/obtener_escuelas.php")
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
      formData.escuela === "otra" ? otraEscuela : formData.escuela;

    try {
      await fetch("http://localhost/unis-app/guardar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          escuela: escuelaFinal
        })
      });

      alert("Registro enviado correctamente");

      setFormData({
        nombre: '',
        carrera: '',
        telefono: '',
        correo: '',
        escuela: ''
      });

      setOtraEscuela('');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">

      {/* 🔝 HEADER */}
      <header className="header">
        <h1>UTZAC</h1>
        <p>Universidad Tecnológica de Zacatecas</p>
      </header>

      {/* 🧱 CONTENIDO */}
      <div className="main-container">

        {/* 📚 PANEL IZQUIERDO */}
        <div className="info-panel">
          <h2>¿Por qué elegir UTZAC?</h2>

          <ul>
            <li>✔ Programas académicos actualizados</li>
            <li>✔ Enfoque práctico y tecnológico</li>
            <li>✔ Vinculación con empresas</li>
            <li>✔ Instalaciones modernas</li>
          </ul>

          <p className="extra">
            Forma parte de una universidad enfocada en el desarrollo profesional
            y tecnológico de sus estudiantes.
          </p>
        </div>

        {/* 📝 FORMULARIO */}
        <div className="form-card">
          <h2>Registro de Aspirantes</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <select
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una carrera</option>
              <option value="TI">Tecnologías de la Información</option>
              <option value="Mecatronica">Mecatrónica</option>
              <option value="Mantenimiento">Mantenimiento Industrial</option>
              <option value="Renovables">Energías Renovables</option>
              <option value="Logistica">Logística</option>
              <option value="Procesos">Procesos Industriales</option>
              <option value="Negocios">Desarrollo de Negocios</option>
              <option value="Gastronomia">Gastronomía</option>
            </select>

            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <select
              name="escuela"
              value={formData.escuela}
              onChange={handleChange}
              required
            >
              <option value="">Escuela de procedencia</option>

              {escuelas.map((escuela) => (
                <option key={escuela.id} value={escuela.nombre}>
                  {escuela.nombre}
                </option>
              ))}

              <option value="otra">Otra</option>
            </select>

            {formData.escuela === "otra" && (
              <input
                type="text"
                placeholder="Escribe tu escuela"
                value={otraEscuela}
                onChange={(e) => setOtraEscuela(e.target.value)}
                required
              />
            )}

            <button type="submit">Enviar registro</button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Unis;