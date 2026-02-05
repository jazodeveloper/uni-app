import { useState } from 'react';
import './unis.css';

function Unis() {
  const [formData, setFormData] = useState({
    nombre: '',
    carrera: '',
    telefono: '',
    correo: '',
    escuela: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registro enviado correctamente');
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>Registro UTZAC</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          onChange={handleChange}
          required
        />

        <select
          name="carrera"
          onChange={handleChange}
          required
        >
          <option value="">Carrera de interés</option>
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
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="escuela"
          placeholder="Escuela de procedencia"
          onChange={handleChange}
          required
        />

        <button type="submit">Enviar registro</button>
      </form>
    </div>
  );
}

export default Unis;
