// pages/admin/AdminFeedbacks.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllFeedbacks } from "../../services/api"; // <— You will add API next

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await getAllFeedbacks();
      const sorted = (res.data || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFeedbacks(sorted);
    } catch {
      toast.error("No feedback yet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  if (loading) return <h1 className="text-center text-3xl py-32">Loading Feedback...</h1>;

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-8">
      <h1 className="text-center text-5xl font-bold text-orange-600 mb-8">Student Feedback</h1>

      {feedbacks.length === 0 ? (
        <p className="text-3xl text-center text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {feedbacks.map(f => (
            <div key={f._id} className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-orange-500">
              <h2 className="text-3xl font-semibold">{f.username}</h2>
              <p className="mt-2 text-xl text-gray-700 leading-relaxed">{f.feedback}</p>
              <small className="block text-gray-500 mt-3 text-lg">
                {new Date(f.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbacks;
