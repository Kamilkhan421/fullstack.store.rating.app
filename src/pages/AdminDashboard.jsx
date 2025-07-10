import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { auth, logout } = useAuth();
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = auth?.token;
      const headers = { Authorization: `Bearer ${token}` };

      const [s1, s2, s3] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/stores`, { headers }),
      ]);

      setStats(s1.data);
      setUsers(s2.data);
      setStores(s3.data);
    };

    fetchData();
  }, [auth]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Total Stores" value={stats.stores} />
        <StatCard title="Total Ratings" value={stats.ratings} />
      </div>

      <h3 className="mt-6 text-xl font-semibold">Users</h3>
      <Table data={users} columns={["name", "email", "address", "role"]} />

      <h3 className="mt-6 text-xl font-semibold">Stores</h3>
      <Table data={stores} columns={["name", "email", "address", "owner", "rating"]} />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h4 className="text-sm">{title}</h4>
    <p className="text-2xl font-bold">{value ?? 0}</p>
  </div>
);

const Table = ({ data, columns }) => (
  <div className="overflow-x-auto bg-white shadow rounded mt-2">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-2 text-left capitalize">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-t">
            {columns.map((col) => (
              <td key={col} className="px-4 py-2">{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
