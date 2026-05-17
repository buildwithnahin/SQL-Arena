import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/Badge';

export default function ProblemDetails({ params }: { params: { id: string } }) {
  // In a real app we would fetch the problem details via params.id from the database
  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8 gap-1 p-1">
      {/* Description Panel */}
      <div className="w-1/3 bg-gray-900 border border-gray-800 rounded-lg flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/20">
           <h2 className="font-bold text-lg">1. Find High Earners</h2>
           <Badge variant="easy">Easy</Badge>
        </div>
        <div className="p-6 overflow-y-auto prose prose-invert prose-sm">
          <p>Write an SQL query to report the <strong>names</strong> of employees who earn more than <code>$50,000</code>.</p>
          <p>Return the result table in <strong>any order</strong>.</p>
          
          <h3>Table: Employees</h3>
          <pre className="bg-gray-950 p-4 rounded text-xs text-gray-300">
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
          </pre>
          <h3>Example 1:</h3>
          <pre className="bg-gray-950 p-4 rounded text-xs text-green-300">
Input: 
Employees table:
+----+-------+--------+
| id | name  | salary |
+----+-------+--------+
| 1  | Alice | 60000  |
| 2  | Bob   | 40000  |
| 3  | John  | 55000  |
+----+-------+--------+

Output: 
+-------+
| name  |
+-------+
| Alice |
| John  |
+-------+
          </pre>
        </div>
      </div>

      {/* Editor & Console Panel */}
      <div className="flex-1 flex flex-col gap-1">
        {/* Editor */}
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-gray-800 bg-gray-800/20">
             <div className="text-sm font-semibold text-gray-400 pl-2">PostgreSQL</div>
             <div className="flex gap-2">
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm py-1.5 px-4 rounded transition">Run Code</button>
                <button className="bg-green-600 hover:bg-green-500 text-white text-sm py-1.5 px-4 rounded transition">Submit</button>
             </div>
          </div>
          <div className="flex-1 p-4 font-mono text-sm text-blue-300 leading-relaxed bg-[#1e1e1e]">
             {`-- Write your PostgreSQL query statement below`}
             <br/><br/>
             {`SELECT `}<br/>
             <span className="animate-pulse block w-2 h-4 bg-white mt-1"></span>
          </div>
        </div>

        {/* Console / Test Cases */}
        <div className="h-64 bg-gray-900 border border-gray-800 rounded-lg flex flex-col">
          <div className="flex gap-4 p-2 border-b border-gray-800 bg-gray-800/20 px-4 text-sm font-semibold text-gray-400">
             <button className="hover:text-white pb-2 border-b-2 border-transparent hover:border-gray-500 transition">Test Cases</button>
             <button className="text-white pb-2 border-b-2 border-white transition">Test Results</button>
          </div>
          <div className="p-4 flex-1 text-sm text-gray-400 text-center flex flex-col justify-center">
            Run your code to see results here.
          </div>
        </div>
      </div>
    </div>
  );
}
