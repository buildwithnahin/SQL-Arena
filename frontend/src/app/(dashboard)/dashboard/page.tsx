import React from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Welcome back, Nahin! 👋</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
           <h3 className="text-gray-400 font-medium mb-2">Total Solved</h3>
           <div className="text-4xl font-bold text-white">12 <span className="text-sm text-gray-500 font-normal">/ 150</span></div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
           <h3 className="text-gray-400 font-medium mb-2">Acceptance Rate</h3>
           <div className="text-4xl font-bold text-green-400">76%</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
           <h3 className="text-gray-400 font-medium mb-2">Current Streak</h3>
           <div className="text-4xl font-bold text-orange-500">4 <span className="text-lg font-medium text-orange-400/80">days</span></div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
         <h2 className="text-xl font-bold mb-4">Recommended Next Problem</h2>
         <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
            <div>
              <div className="font-bold text-lg">Department Highest Salary</div>
              <div className="text-sm text-gray-400">Medium • Join • Group By</div>
            </div>
            <Link href="/problems/2">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded transition">Solve Challenge</button>
            </Link>
         </div>
      </div>
    </div>
  );
}
