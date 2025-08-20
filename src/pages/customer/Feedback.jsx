import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

function Feedback() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  // Save feedbacks to localStorage
  const saveFeedbacks = (updated) => {
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
  };

  // Submit new or edited feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please write a comment!");
      return;
    }

    let updated;
    if (editId) {
      // Editing
      updated = feedbacks.map((f) =>
        f.id === editId ? { ...f, rating, comment } : f
      );
      setEditId(null);
    } else {
      // New feedback
      const newFeedback = {
        id: Date.now().toString(),
        user: user.username,
        rating,
        comment,
        date: new Date().toLocaleString(),
      };
      updated = [...feedbacks, newFeedback];
    }

    saveFeedbacks(updated);
    setRating(5);
    setComment("");
  };

  const handleEdit = (id) => {
    const fb = feedbacks.find((f) => f.id === id);
    if (fb) {
      setRating(fb.rating);
      setComment(fb.comment);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const updated = feedbacks.filter((f) => f.id !== id);
    saveFeedbacks(updated);
  };

  // Only show current user's feedbacks
  const userFeedbacks = feedbacks.filter((f) => f.user === user.username);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          {editId ? "Update Feedback" : "Submit Feedback"}
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6 mb-3">Your Feedback</h3>
      {userFeedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="space-y-3">
          {userFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className="border rounded p-3 bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">Rating: ⭐ {fb.rating}</p>
              <p>{fb.comment}</p>
              <p className="text-xs text-gray-500">Date: {fb.date}</p>
              <div className="flex space-x-3 mt-2">
                <button
                  onClick={() => handleEdit(fb.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feedback;
