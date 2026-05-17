import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-screen fixed top-0 left-0 hidden md:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">SQL <span className="text-blue-500">Arena</span></h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/problems" className="flex items-center px-6 py-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <span className="font-medium">Problem Set</span>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" className="flex items-center px-6 py-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <span className="font-medium">Leaderboard</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-6">
        <button className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 py-2 rounded-md transition-colors">
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
