import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllOrders, updateOrder, cancelOrderApi } from "../../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [lastCount, setLastCount] = useState(0);

  const load = async () => {
    const res = await getAllOrders();
    const sorted = (res.data || []).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    
    if(sorted.length > lastCount){
      toast.success("🔔 New order received!");
      setLastCount(sorted.length);
    }

    setOrders(sorted);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return ()=>clearInterval(interval);
  }, []);

  const setStatus = async (id, status) => {
    await updateOrder(id, status);
    toast.success(`Order marked as ${status}`);
    load();
  };

  const cancelOrder = async (id) => {
    await cancelOrderApi(id);
    toast.error("Order Cancelled");
    load();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Admin Orders Panel</h1>

      {orders.length===0 ? <p>No orders yet</p> :
        orders.map(order=>(
          <div key={order._id} className="bg-white shadow rounded p-6 mb-6">
            <h2 className="font-bold text-lg">Order #{order._id.slice(-6)}</h2>
            <p>Customer: {order.user?.username}</p>
            <p>Status: <b className="text-orange-600">{order.status}</b></p>

            <div className="mt-4 space-x-3">
              <button className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={()=>setStatus(order._id,"Ready")}>Mark Ready</button>

              <button className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={()=>setStatus(order._id,"Completed")}>Mark Completed</button>

              <button className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={()=>cancelOrder(order._id)}>Cancel</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}
