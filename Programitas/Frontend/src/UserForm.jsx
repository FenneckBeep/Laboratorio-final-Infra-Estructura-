import { useState } from "react";

function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // --- 1️⃣ Crear usuario en el backend Django ---
      const response = await fetch("http://127.0.0.1:8000/users/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al crear usuario");

      // --- 2️⃣ Enviar notificación por correo ---
      await fetch("http://127.0.0.1:5000/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: formData.email,
          subject: "¡Bienvenido a la plataforma!",
          message: `Hola ${formData.name}, tu registro fue exitoso. ¡Gracias por unirte!`,
        }),
      });

      // --- 3️⃣ Limpiar formulario y avisar ---
      setFormData({ name: "", email: "", phone: "" });
      onUserCreated();
      alert("✅ Usuario creado y correo enviado!");
    } catch (error) {
      console.error(error);
      alert("⚠️ Ocurrió un error al crear el usuario o enviar el correo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Registrar nuevo usuario</h3>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">Crear usuario</button>
    </form>
  );
}

export default UserForm;
