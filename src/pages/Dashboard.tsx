import Sidebar from '../components/Sidebar';
import { Bell, Search, User } from 'lucide-react';

export default function Dashboard() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Menu size={24} className="text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Vendor</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Search size={20} className="text-gray-600 cursor-pointer" />
            <Bell size={20} className="text-gray-600 cursor-pointer" />
            <User size={20} className="text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          <p className="text-gray-600 mb-6">{dateStr}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm mb-2">Total Orders</h3>
              <p className="text-4xl font-bold text-gray-800">125</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm mb-2">Active SKUs</h3>
              <p className="text-4xl font-bold text-gray-800">25</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm mb-2">Total Revenue</h3>
              <p className="text-4xl font-bold text-gray-800">₹ 5,10,318.40</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders Overview</h3>
            <div className="text-gray-600">
              <p>No orders to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon component
function Menu({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
