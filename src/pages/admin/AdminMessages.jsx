// pages/admin/AdminMessages.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllMessages } from "../../services/api"; // <— You will add API next

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await getAllMessages();
      const sorted = (res.data || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMessages(sorted);
    } catch {
      toast.error("No messages found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  if (loading) return <h1 className="text-center text-3xl py-32">Loading Messages...</h1>;

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-8">
      <h1 className="text-center text-5xl font-bold text-orange-600 mb-8">Student Messages</h1>

      {messages.length === 0 ? (
        <p className="text-center text-3xl text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {messages.map(m => (
            <div key={m._id} className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-green-500">
              <h2 className="text-3xl font-semibold">{m.name}</h2>
              <p className="text-xl mt-1">{m.email}</p>

              <p className="mt-4 text-xl leading-relaxed">{m.message}</p>

              <small className="block text-gray-500 mt-3 text-lg">
                {new Date(m.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
