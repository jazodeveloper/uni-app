import { useState } from "react"

function App() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    carrera: "",
    escuela: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch("/api/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    alert(data.message || data.error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre completo" onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
      <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
      <input name="carrera" placeholder="Carrera de interés" onChange={handleChange} required />
      <input name="escuela" placeholder="Escuela de procedencia" onChange={handleChange} required />

      <button type="submit">Enviar</button>
    </form>
  )
}

export default App