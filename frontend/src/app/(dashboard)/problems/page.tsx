import Link from 'next/link';
import { Badge } from '@/components/Badge';

export default function ProblemsPage() {
  // Mock data representing the problems response from backend
  const problems = [
    { id: '1', title: 'Find High Earners', difficulty: 'easy', tags: ['SELECT', 'WHERE'], status: 'Solved' },
    { id: '2', title: 'Department Highest Salary', difficulty: 'medium', tags: ['JOIN', 'GROUP BY'], status: 'Attempted' },
    { id: '3', title: 'Trips and Users', difficulty: 'hard', tags: ['JOIN', 'CASE'], status: 'Todo' },
    { id: '4', title: 'Nth Highest Salary', difficulty: 'medium', tags: ['LIMIT', 'OFFSET'], status: 'Todo' },
    { id: '5', title: 'Duplicate Emails', difficulty: 'easy', tags: ['GROUP BY', 'HAVING'], status: 'Solved' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Problem Set</h1>
        <div className="flex space-x-3">
          <input 
            type="text" 
            placeholder="Search problems..." 
            className="bg-gray-900 border border-gray-800 text-sm rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="bg-gray-900 border border-gray-800 text-sm rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-900 overflow-hidden shadow ring-1 ring-gray-800 rounded-lg">
        <table className="min-w-full divide-y divide-gray-800 text-left">
          <thead className="bg-gray-800/50">
            <tr>
              <th scope="col" className="py-3.5 pl-6 pr-3 text-sm font-semibold text-gray-300">Status</th>
              <th scope="col" className="py-3.5 px-3 text-sm font-semibold text-gray-300">Title</th>
              <th scope="col" className="py-3.5 px-3 text-sm font-semibold text-gray-300">Difficulty</th>
              <th scope="col" className="py-3.5 px-3 text-sm font-semibold text-gray-300">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-800/50 transition-colors group cursor-pointer">
                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-400">
                  {problem.status === 'Solved' && <span className="text-green-500">✓</span>}
                  {problem.status === 'Attempted' && <span className="text-yellow-500">~</span>}
                  {problem.status === 'Todo' && <span>-</span>}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-white group-hover:text-blue-400">
                  <Link href={`/problems/${problem.id}`}>{problem.title}</Link>
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  <Badge variant={problem.difficulty as any}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </Badge>
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  <div className="flex gap-2">
                    {problem.tags.map(tag => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
         <div className="text-sm text-gray-400">Showing 1 to 5 of 5 entries</div>
         <div className="flex space-x-2">
           <button className="px-3 py-1 border border-gray-800 rounded text-sm text-gray-400 hover:bg-gray-800 disabled:opacity-50">Previous</button>
           <button className="px-3 py-1 border border-gray-800 rounded text-sm text-gray-400 hover:bg-gray-800 disabled:opacity-50">Next</button>
         </div>
      </div>
    </div>
  );
}
