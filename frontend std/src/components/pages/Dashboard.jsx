import React from "react";

const Dashboard = () => {
  return (
    <div data-theme="forest" className="min-h-screen bg-gray-100 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Good Evening, Rishabh 👋</h1>
        <p className="text-gray-600 mt-2">You have 24 notes. 3 are pinned.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Notes</h2>
          <p className="text-2xl font-bold mt-2">24</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Pinned</h2>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Trash</h2>
          <p className="text-2xl font-bold mt-2">2</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Recently Updated</h2>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
      </div>

      {/* Recent Notes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">DSA Revision</h3>
            <p className="text-gray-600 text-sm mt-2">
              Arrays and Hashing practice notes...
            </p>
            <p className="text-xs text-gray-400 mt-3">Updated 2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
