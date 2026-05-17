'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/Badge';
import Editor from '@monaco-editor/react';

export default function ProblemDetails({ params }: { params: { id: string } }) {
  const [query, setQuery] = useState('-- Write your PostgreSQL query statement below\n\nSELECT ');
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunQuery = async () => {
    // In a real app, this will hit our new backend execution endpoint
    setLoading(true);
    setError(null);
    setOutput([{ name: 'Alice' }, { name: 'John' }]); // Mock output for now until backend is connected
    setTimeout(() => setLoading(false), 500);
  };

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
                <button 
                  onClick={handleRunQuery}
                  disabled={loading}
                  className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 text-sm py-1.5 px-4 rounded transition">
                  {loading ? 'Running...' : 'Run Query'}
                </button>
                <button className="bg-green-600 hover:bg-green-500 text-white text-sm py-1.5 px-4 rounded transition">Submit</button>
             </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="sql"
              theme="vs-dark"
              value={query}
              onChange={(value) => setQuery(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Console / Test Cases */}
        <div className="h-64 bg-gray-900 border border-gray-800 rounded-lg flex flex-col">
          <div className="flex gap-4 p-2 border-b border-gray-800 bg-gray-800/20 px-4 text-sm font-semibold text-gray-400">
             <button className="hover:text-white pb-2 border-b-2 border-transparent hover:border-gray-500 transition">Test Cases</button>
             <button className="text-white pb-2 border-b-2 border-white transition">Test Results</button>
          </div>
          <div className="p-4 flex-1 text-sm text-gray-400 overflow-y-auto">
             {error && <div className="text-red-400 bg-red-950/30 p-4 rounded border border-red-900">{error}</div>}
             {output && !error && (
               <div>
                  <h4 className="text-white mb-2 font-semibold">Output:</h4>
                  <table className="min-w-full divide-y divide-gray-800 border border-gray-800">
                    <thead className="bg-gray-800/50">
                      <tr>
                        {Object.keys(output[0] || {}).map((key) => (
                          <th key={key} className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {output.map((row: any, i: number) => (
                        <tr key={i}>
                          {Object.values(row).map((val: any, j: number) => (
                            <td key={j} className="px-3 py-2 whitespace-nowrap text-sm text-gray-400">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
             )}
             {!output && !error && "Run your code to see results here."}
          </div>
        </div>
      </div>
    </div>
  );
}
