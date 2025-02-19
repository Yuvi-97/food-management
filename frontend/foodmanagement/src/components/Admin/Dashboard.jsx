// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
// import "./Dashboard.css";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

// const pieData = [
//   { name: "Perishable Goods", value: 3500 },
//   { name: "Packaged Food", value: 2000 },
//   { name: "Beverages", value: 1200 },
//   { name: "Dairy Products", value: 1800 },
// ];

// const lineData = [
//   { month: "Jan", wasteReduced: 500 },
//   { month: "Feb", wasteReduced: 1200 },
//   { month: "Mar", wasteReduced: 2300 },
//   { month: "Apr", wasteReduced: 3400 },
//   { month: "May", wasteReduced: 4200 },
//   { month: "Jun", wasteReduced: 5100 },
// ];

// const COLORS = ["#71BBB2", "#EFE9D5", "#497D74", "#27445D"];

// const AdminDashboard = () => {
//   return (
//     <>
//       <Header />
//       <div className="dashboard">
//         <h2>Waste Management Insights</h2>

//         <div className="stats">
//           <div className="card">
//             <h3>🌍 Total Food Waste Reduced</h3>
//             <p>10,250 kg</p>
//           </div>
//           <div className="card">
//             <h3>🏢 NGOs Supported</h3>
//             <p>25 Organizations</p>
//           </div>
//           <div className="card">
//             <h3>🍽️ Donors Contributing</h3>
//             <p>120 Businesses</p>
//           </div>
//         </div>

//         <div className="charts">
//           <div className="chart-container">
//             <h3>📊 Food Waste Distribution</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="chart-container">
//             <h3>📈 Waste Reduction Over Time</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={lineData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#EFE9D5" />
//                 <XAxis dataKey="month" stroke="#EFE9D5" />
//                 <YAxis stroke="#EFE9D5" />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="wasteReduced" stroke="#71BBB2" strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="education">
//           <h3>📚 User Education</h3>
//           <ul>
//             <li>🍏 Plan Meals to Reduce Overbuying</li>
//             <li>🥶 Store Food Properly</li>
//             <li>💖 Donate Excess Food to NGOs</li>
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import "./Dashboard.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const pieData = [
  { name: "Perishable Goods", value: 3500 },
  { name: "Packaged Food", value: 2000 },
  { name: "Beverages", value: 1200 },
  { name: "Dairy Products", value: 1800 },
];

const lineData = [
  { month: "Jan", wasteReduced: 500 },
  { month: "Feb", wasteReduced: 1200 },
  { month: "Mar", wasteReduced: 2300 },
  { month: "Apr", wasteReduced: 3400 },
  { month: "May", wasteReduced: 4200 },
  { month: "Jun", wasteReduced: 5100 },
];

const COLORS = ["#71BBB2", "#EFE9D5", "#497D74", "#27445D"];

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchUsersByRole("donor", setDonors);
    fetchUsersByRole("ngo", setNgos);
    fetchUsersByRole("admin", setAdmins);
  }, []);

  const fetchUsersByRole = async (role, setUsers) => {
    try {
      const response = await fetch(`http://localhost:8080/users/role/${role}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(`Error fetching ${role} users:, error`);
    }
  };

  const renderTable = (title, users) => (
    <div className="table-container">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Header />
      <div className="dashboard">
        <h2>Admin Dashboard</h2>

        {/* Statistics Cards */}
        <div className="stats">
          <div className="card">
            <h3>🌍 Total Food Waste Reduced</h3>
            <p>10,250 kg</p>
          </div>
          <div className="card">
            <h3>🏢 NGOs Supported</h3>
            <p>{ngos.length} Organizations</p>
          </div>
          <div className="card">
            <h3>🍽️ Donors Contributing</h3>
            <p>{donors.length} Businesses</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="charts">
          <div className="chart-container">
            <h3>📊 Food Waste Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>📈 Waste Reduction Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFE9D5" />
                <XAxis dataKey="month" stroke="#EFE9D5" />
                <YAxis stroke="#EFE9D5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="wasteReduced" stroke="#71BBB2" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Tables */}
        <div className="user-tables">
          {renderTable("Donors", donors)}
          {renderTable("NGOs", ngos)}
          {renderTable("Admins", admins)}
        </div>

        {/* User Education Section */}
        <div className="education">
          <h3>📚 User Education</h3>
          <ul>
            <li>🍏 Plan Meals to Reduce Overbuying</li>
            <li>🥶 Store Food Properly</li>
            <li>💖 Donate Excess Food to NGOs</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;