import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const OwnerDashboard = () => {
  const { auth, logout } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/owner/ratings`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setRatings(res.data.ratings);
      setStoreInfo(res.data.store);
      setAvg(res.data.averageRating);
    };
    fetchRatings();
  }, [auth]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Store Owner Dashboard</h2>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>

      {storeInfo ? (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{storeInfo.name}</h3>
          <p>{storeInfo.address}</p>
          <p>Average Rating: {avg}</p>

          <h4 className="mt-4 font-semibold">Ratings Received</h4>
          <ul className="mt-2 space-y-2">
            {ratings.map((r) => (
              <li key={r.id} className="border p-2 rounded">
                <p><strong>{r.user.name}</strong> ({r.user.email})</p>
                <p>Rating: {r.rating}</p>
                <p className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No store assigned.</p>
      )}
    </div>
  );
};

export default OwnerDashboard;
