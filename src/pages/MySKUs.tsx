import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, Search, User, Download, X, Edit3, Clock } from 'lucide-react';
import { mockSKUs, SKU, getStockStatus, StockStatus, getStockPriority } from '../data/mockData';

const ITEMS_PER_PAGE = 25;

export default function MySKUs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus] = useState('Active');

  const filteredSKUs = mockSKUs.filter(sku => {
    const matchesSearch = sku.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = sku.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort by stock status priority
  const sortedSKUs = [...filteredSKUs].sort((a, b) => {
    const statusA = getStockStatus(a.stock.availableCases, a.stock.availablePieces);
    const statusB = getStockStatus(b.stock.availableCases, b.stock.availablePieces);
    const priorityA = getStockPriority(statusA);
    const priorityB = getStockPriority(statusB);
    return priorityA - priorityB;
  });

  const totalPages = Math.ceil(sortedSKUs.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedSKUs = sortedSKUs.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleDownload = () => {
    const csv = [
      ['Product Name', 'Stock', 'Sale In Progress', 'Available To Customer', 'Status', 'Stock Status'],
      ...sortedSKUs.map(sku => [
        sku.productName,
        sku.stock.totalAvailablePieces,
        sku.orderedQty,
        sku.availableQty,
        sku.status,
        getStockStatus(sku.stock.availableCases, sku.stock.availablePieces)
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'price_list.csv';
    a.click();
  };

  function getStockStatusBadge(stockStatus: StockStatus) {
    const styles = {
      OUT_OF_STOCK: 'bg-red-100 text-red-800 border border-red-300',
      LOW_STOCK: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      NORMAL_STOCK: 'bg-green-100 text-green-800 border border-green-300'
    };

    const labels = {
      OUT_OF_STOCK: 'Out of Stock',
      LOW_STOCK: 'Low Stock',
      NORMAL_STOCK: 'Normal Stock'
    };

    return (
      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${styles[stockStatus]}`}>
        {labels[stockStatus]}
      </span>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <MenuIcon size={24} className="text-gray-600" />
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Price List</h1>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                <span className="text-sm font-medium text-gray-700">Status : Active</span>
                <X size={16} className="text-gray-600 cursor-pointer" />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search product by name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                🔍
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">SKU Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Brand</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">MRP</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Selling Price</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Pricing Rules</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Stock</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Stock Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Sale In Progress</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Available To Customer</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">History</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Edit</th>
                </tr>
              </thead>
              <tbody>
                {displayedSKUs.map((sku) => {
                  const stockStatus = getStockStatus(sku.stock.availableCases, sku.stock.availablePieces);
                  return (
                    <tr
                      key={sku.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-800 font-medium">{sku.productName}</td>
                      <td className="px-4 py-3 text-gray-600">{sku.brand}</td>
                      <td className="px-4 py-3 text-gray-600">₹ {sku.mrp.toFixed(2)}</td>
                      <td className="px-4 py-3 text-gray-600">₹ {sku.sellingPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{sku.pricing.pricingRules}</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-800">{sku.stock.totalAvailablePieces}</td>
                      <td className="px-4 py-3 text-center">
                        {getStockStatusBadge(stockStatus)}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{sku.orderedQty}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{sku.availableQty}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                          {sku.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="inline-flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-100 rounded transition">
                          <Clock size={18} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/sku/edit/${sku.id}`)}
                            className="inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-semibold"
                          >
                            <Edit3 size={16} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => navigate(`/sku/${sku.id}`)}
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-semibold whitespace-nowrap"
                          >
                            SKU Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>

            <div className="text-sm text-gray-600">
              Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filteredSKUs.length)} of {filteredSKUs.length}
            </div>
          </div>
        </div>
      </div>
    </div>
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
