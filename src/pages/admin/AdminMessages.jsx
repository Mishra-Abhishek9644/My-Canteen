// pages/admin/AdminMessages.jsx
import { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages")) || [];
    const sorted = [...stored].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setMessages(sorted);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📬 Contact Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border p-4 rounded bg-white shadow-sm">
              <p className="text-sm text-gray-500">📅 {msg.date}</p>
              <p className="font-semibold">👤 {msg.name} ({msg.email})</p>
              <p className="mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
