import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-950 min-h-screen text-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-64 relative min-h-screen">
        <header className="h-16 border-b border-gray-800 bg-gray-900/50 flex items-center px-6 sticky top-0 z-10 backdrop-blur-sm">
          <div className="ml-auto flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">N</div>
          </div>
        </header>
        <main className="p-8 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
