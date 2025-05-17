import { useEffect, useState } from "react";
import axios from "axios";
import WhiskeyForm from "./WhiskeyForm";

export default function Dashboard({ token }) {
  const [whiskeys, setWhiskeys] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    distillery: "",
    type: "",
    age: "",
    proof: "",
  });

  const fetchWhiskeys = async () => {
    try {
      const res = await axios.get("http://localhost:5000/whiskeys", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWhiskeys(res.data);
    } catch (err) {
      console.error("Failed to fetch whiskeys", err);
    }
  };

  useEffect(() => {
    if (token) fetchWhiskeys();
  }, [token]);

  const handleAddWhiskey = (newWhiskey) => {
    setWhiskeys((prev) => [...prev, newWhiskey]);
  };

  const deleteWhiskey = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/whiskeys/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWhiskeys((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const startEdit = (whiskey) => {
    setEditingId(whiskey.id);
    setFormData({ ...whiskey });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      distillery: "",
      type: "",
      age: "",
      proof: "",
    });
  };

  const submitEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/whiskeys/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cancelEdit();
      fetchWhiskeys(); // Refresh list after edit
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="dashboard-content">
      <h2>Dashboard</h2>
      <WhiskeyForm token={token} onAdd={handleAddWhiskey} />

      <div className="whiskey-list">
        {whiskeys.length === 0 ? (
          <p>No whiskeys yet. Add one above!</p>
        ) : (
          <ul>
            {whiskeys.map((w) => (
              <li key={w.id} className="whiskey-item">
                {editingId === w.id ? (
                  <div className="edit-form">
                    <input
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      placeholder="Distillery"
                      value={formData.distillery}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          distillery: e.target.value,
                        })
                      }
                    />
                    <input
                      placeholder="Type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                    <input
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                    <input
                      placeholder="Proof"
                      value={formData.proof}
                      onChange={(e) =>
                        setFormData({ ...formData, proof: e.target.value })
                      }
                    />
                    <div className="action-buttons">
                      <button onClick={submitEdit}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="whiskey-card">
                    <strong>{w.name}</strong> — {w.distillery} — {w.type}
                    <br />
                    Age: {w.age || "N/A"} — Proof: {w.proof || "N/A"}
                    <div className="action-buttons">
                      <button onClick={() => startEdit(w)}>Edit</button>
                      <button onClick={() => deleteWhiskey(w.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
