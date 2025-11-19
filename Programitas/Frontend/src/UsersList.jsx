import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  // 🔥 localhost por port-forward
  const API_URL = "http://localhost:8000";

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${API_URL}/users/list/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();

    const handleUserCreated = () => {
      fetchUsers();
    };

    window.addEventListener("userCreated", handleUserCreated);

    return () => {
      window.removeEventListener("userCreated", handleUserCreated);
    };
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este usuario?")) return;

    const res = await fetch(`${API_URL}/users/delete/${id}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Usuario eliminado ✅");
      setUsers(users.filter((u) => u.id !== id));
    } else {
      alert("Error al eliminar usuario ❌");
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditData({ name: user.name, email: user.email, phone: user.phone });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "", email: "", phone: "" });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`${API_URL}/users/update/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (res.ok) {
      alert("Usuario actualizado ✅");
      setUsers(users.map((u) => (u.id === id ? { ...u, ...editData } : u)));
      cancelEdit();
    } else {
      alert("Error al actualizar usuario ❌");
    }
  };

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h2>🥝 Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados 😅</p>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <li key={user.id}>
              {editingId === user.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                  />
                  <button onClick={() => saveEdit(user.id)}>Guardar</button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  <div className="user-info">
                    <strong>{user.name}</strong> - {user.email} - {user.phone}
                  </div>
                  <button onClick={() => startEdit(user)}>Editar</button>
                  <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
