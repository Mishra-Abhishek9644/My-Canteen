import { useEffect, useState } from "react";
import { submitFeedback, getMyFeedbacks } from "../../services/api";
import { useAuth } from "../../Context/AuthContext";

export default function Feedback() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => { load(); }, []);
  const load = async () => {
    const res = await getMyFeedbacks();
    setFeedbacks(res.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback(rating, comment);
    setComment("");
    load();    // refresh
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={rating} onChange={(e)=>setRating(e.target.value)} className="w-full border p-2 rounded">
          {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
        </select>

        <textarea className="w-full border p-3 rounded"
          value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write your feedback..." required />

        <button className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <h3 className="mt-6 text-xl font-bold">Your Feedback</h3>
      {feedbacks.length===0 ? <p>No feedback yet</p> :
        feedbacks.map(f=>(
          <div key={f._id} className="p-3 border rounded mt-2">
            ⭐ {f.rating} — {f.comment}
            <p className="text-sm text-gray-500">{new Date(f.createdAt).toLocaleString()}</p>
          </div>
        ))
      }
    </div>
  );
}
