import { useState } from "react";
import UsersList from "./UsersList";

export default function App() {
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/users/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        alert("Usuario creado ✅");
        setNewUser({ name: "", email: "", phone: "" });
        window.location.reload(); // recarga la lista de usuarios
      } else {
        alert("Error al crear usuario ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión ❌");
    }
  };

  return (
    <div className="container">
      <h1>Bienvenido a la página de usuarios</h1>

      {/* Formulario para crear usuario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={newUser.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Lista de usuarios */}
      <UsersList />
    </div>
  );
}
