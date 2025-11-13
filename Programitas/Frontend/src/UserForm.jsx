import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- 1️⃣ Crear usuario en el backend Django ---
      const response = await fetch("http://127.0.0.1:8000/users/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al crear usuario en Django");

      // --- 2️⃣ Enviar notificación por correo (Flask) ---
      const notifyResponse = await fetch("http://127.0.0.1:5000/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: formData.email,
          subject: "¡Bienvenido a la plataforma!",
          message: `Hola ${formData.name}, tu registro fue exitoso. ¡Gracias por unirte!`,
        }),
      });

      if (!notifyResponse.ok) {
        console.warn("⚠️ Usuario creado pero no se pudo enviar el correo.");
      }

      // --- 3️⃣ Limpiar formulario y actualizar lista de usuarios ---
      setFormData({ name: "", email: "", phone: "" });
      window.dispatchEvent(new Event("userCreated")); // actualiza lista
      alert("✅ Usuario creado y notificado!");

    } catch (error) {
      console.error(error);
      alert("❌ Error al crear usuario o enviar notificación.");
    } finally {
      setLoading(false);
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
      <button type="submit" disabled={loading}>
        {loading ? "Procesando..." : "Crear usuario"}
      </button>
    </form>
  );
}

export default UserForm;
