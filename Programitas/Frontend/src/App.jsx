import { useState } from "react";
import UsersList from "./UsersList";

export default function App() {
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/users/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        alert("✅ Usuario creado correctamente");
        setNewUser({ name: "", email: "", phone: "" });
        // 🔄 Mejor que recargar toda la página:
        // Usamos un evento personalizado para avisar a UsersList de actualizarse
        window.dispatchEvent(new Event("userCreated"));
      } else {
        const errorText = await res.text();
        alert("❌ Error al crear usuario: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error de conexión con el backend");
    } finally {
      setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>

      {/* Lista de usuarios */}
      <UsersList />
    </div>
  );
}
