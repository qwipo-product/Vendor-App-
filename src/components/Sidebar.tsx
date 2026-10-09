import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>('product');

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 flex-shrink-0 bg-slate-800 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-8 text-center border-b border-slate-700">
        <h1 className="text-2xl font-bold tracking-wide">BMS</h1>
      </div>

      <nav className="flex-1 p-6 space-y-1">
        {/* Orders */}
        <div>
          <button
            onClick={() => navigate('/orders')}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded transition text-base ${
              isActive('/orders')
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <LayersIcon size={22} />
            <span>Orders</span>
          </button>
        </div>

        {/* Products Dropdown */}
        <div>
          <button
            onClick={() => toggleMenu('product')}
            className={`w-full flex items-center justify-between px-4 py-4 rounded transition text-base ${
              location.pathname.includes('/products') || expandedMenu === 'product'
                ? 'text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <span className="flex items-center space-x-4">
              <MenuIcon size={22} />
              <span>Product</span>
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform ${
                expandedMenu === 'product' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Product Submenu */}
          {expandedMenu === 'product' && (
            <div className="ml-6 mt-2 space-y-2 border-l-2 border-slate-700 pl-4">
              <button
                onClick={() => navigate('/products/my-skus')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded transition text-sm ${
                  isActive('/products/my-skus')
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <LayersIcon size={20} />
                <span>Add SKU</span>
              </button>
              <button
                className="w-full flex items-center space-x-3 px-3 py-3 rounded text-gray-400 hover:text-gray-300 transition text-sm"
              >
                <LayersIcon size={20} />
                <span>My Requests</span>
              </button>
              <button
                onClick={() => navigate('/products/my-skus')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded transition text-sm ${
                  isActive('/products/my-skus')
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <StarIcon size={20} />
                <span>My SKUs</span>
              </button>
            </div>
          )}
        </div>

        {/* Bulk Import */}
        <div>
          <button className="w-full flex items-center space-x-4 px-4 py-4 rounded text-gray-300 hover:text-white transition text-base">
            <LayersIcon size={22} />
            <span>Bulk Import</span>
          </button>
        </div>

        {/* Setting */}
        <div>
          <button
            onClick={() => toggleMenu('setting')}
            className="w-full flex items-center justify-between px-4 py-4 rounded text-gray-300 hover:text-white transition text-base"
          >
            <span className="flex items-center space-x-4">
              <SettingsIcon size={22} />
              <span>Setting</span>
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform ${
                expandedMenu === 'setting' ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-slate-700">
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center space-x-4 px-4 py-3 rounded text-gray-300 hover:bg-red-600 hover:text-white transition text-base"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

// Icon Components
function LayersIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" />
      <polyline points="2 7 12 12 22 7" />
      <polyline points="2 17 12 12 22 17" />
    </svg>
  );
}

function MenuIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function SettingsIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-3.78 7.78l-4.24-4.24m-2.12-2.12l-4.24-4.24" />
    </svg>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 10.26 24 10.27 17.18 16.70 20.09 24.97 12 18.54 3.91 24.97 6.82 16.70 0 10.27 8.91 10.26 12 2" />
    </svg>
  );
}
