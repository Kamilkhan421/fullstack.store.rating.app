import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { auth, logout } = useAuth();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/store/all`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setStores(res.data);
    };
    fetchStores();
  }, [auth]);

  const rateStore = async (storeId, rating) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/store/rate`,
      { storeId, rating },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );
    alert("Rating submitted!");
    window.location.reload();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>

      <div className="grid gap-4 mt-4">
        {stores.map((store) => (
          <div key={store.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <p>{store.address}</p>
            <p>Avg Rating: {store.averageRating}</p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => rateStore(store.id, num)}
                  className={`px-2 py-1 rounded ${
                    num === store.userRating ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
