import { useEffect, useState } from "react";

function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(stored);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="font-semibold text-orange-600">
                {fb.user} ⭐ {fb.rating}
              </p>
              <p className="mt-1">{fb.comment}</p>
              <p className="text-xs text-gray-500 mt-2">Date: {fb.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminFeedbacks;
