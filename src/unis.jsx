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
      .then(data => setEscuelas(data));
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

    await fetch('/api/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, escuela: escuelaFinal })
    });

    alert('Registro enviado 🚀');

    setFormData({
      nombre: '',
      carrera: '',
      telefono: '',
      correo: '',
      escuela: ''
    });

    setOtraEscuela('');
  };

  return (
    <div className="container">

      <h1>UTZAC</h1>
      <p>Registro de aspirantes</p>

      <form onSubmit={handleSubmit}>

        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />

        <select name="carrera" value={formData.carrera} onChange={handleChange} required>
          <option value="">Carrera</option>
          <option value="TI">TI</option>
          <option value="Mecatronica">Mecatrónica</option>
          <option value="Logistica">Logística</option>
        </select>

        <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
        <input name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} required />

        <select name="escuela" value={formData.escuela} onChange={handleChange} required>
          <option value="">Escuela</option>

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

        <button>Enviar</button>

      </form>
    </div>
  );
}

export default Unis;