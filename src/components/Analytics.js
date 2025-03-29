import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import ComplaintCards from "./Complaintcards";

const pieData = [
  { name: "Electrical", complaints: 10 },
  { name: "Plumbing", complaints: 5 },
  { name: "Carpentry", complaints: 7 },
  { name: "Internet", complaints: 3 },
  { name: "Security", complaints: 8 },
  { name: "Food", complaints: 8 },
];

const barData = [
  { department: "Electrical", complaints: 12 },
  { department: "Plumbing", complaints: 8 },
  { department: "Carpentry", complaints: 15 },
  { department: "Internet", complaints: 10 },
  { department: "Security", complaints: 5 },
  { department: "Food", complaints: 6 },
];

const updatedData = [
  { department: "Electrical", updated: 5 },
  { department: "Plumbing", updated: 4 },
  { department: "Carpentry", updated: 10 },
  { department: "Internet", updated: 7 },
  { department: "Security", updated: 3 },
  { department: "Food", updated: 4 },
];

const completedData = [
  { department: "Electrical", completed: 7 },
  { department: "Plumbing", completed: 4 },
  { department: "Carpentry", completed: 5 },
  { department: "Internet", completed: 3 },
  { department: "Security", completed: 2 },
  { department: "Food", completed: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FFBB78"];

const Analytics = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      {/* Header */}
      <h2 className="text-4xl font-bold text-blue-500 mb-4">Analytics Dashboard</h2>
      <p className="text-lg text-gray-600 mb-10">Visual representation of complaint data.</p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Pie Chart: Complaints Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-500">Complaints Overview</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={120}
              dataKey="complaints"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart: Complaints by Department */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-500">Complaints by Department</h3>
          <BarChart width={450} height={400} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="complaints" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Bar Chart: Updated Complaints */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-500">Updated Complaints</h3>
          <BarChart width={450} height={400} data={updatedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="updated" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Bar Chart: Completed Complaints */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-500">Completed Complaints</h3>
          <BarChart width={450} height={400} data={completedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#ff7300" />
          </BarChart>
        </div>

      </div>
      <ComplaintCards />
    </div>
  );
};

export default Analytics;
