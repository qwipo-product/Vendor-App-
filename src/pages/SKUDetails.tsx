import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, Search, User, ArrowLeft, Plus } from 'lucide-react';
import { mockSKUs } from '../data/mockData';

export default function SKUDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sku = mockSKUs.find(s => s.id === id);

  if (!sku) return <div>SKU not found</div>;

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
          <div className="mb-8">
            <button onClick={() => navigate('/products/my-skus')} className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 text-lg font-semibold">
              <ArrowLeft size={20} />
              <span>Update SKU</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-8 space-y-8">
            {/* SKU Name and Info */}
            <div>
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Enter SKU Name</label>
                  <input type="text" defaultValue={sku.productName} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-3">
                  <div><label className="text-sm text-gray-600 font-medium">Brand Name</label><p className="text-gray-800 font-semibold">{sku.brand}</p></div>
                  <div><label className="text-sm text-gray-600 font-medium">Company Name</label><p className="text-gray-800 font-semibold">Kedia Agro</p></div>
                  <div><label className="text-sm text-gray-600 font-medium">Category Browse Path</label><p className="text-gray-800 font-semibold text-xs">Grocery Edible Oils</p></div>
                  <div><label className="text-sm text-gray-600 font-medium">SKU Status</label><select className="w-full px-4 py-2 border border-gray-300 rounded"><option>{sku.status}</option></select></div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* UOM Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">UOM</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Select Unit of Measurement</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>{sku.details.uom}</option></select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Enter Value</label>
                  <input type="number" defaultValue={sku.details.sellingUnit} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Package Type Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">Package Type</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Select Package Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>{sku.details.packageType}</option></select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Enter Value</label>
                  <input type="number" defaultValue={sku.details.sellingUnit} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2">
                <Plus size={18} /><span>Add</span>
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Selling Unit Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">Selling Unit</h3>
              <label className="block text-sm text-gray-600 mb-2 font-medium">Enter Selling Unit</label>
              <div className="flex items-center space-x-2">
                <input type="number" defaultValue={1} className="w-32 px-4 py-3 border border-gray-300 rounded" />
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* SKU Details Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">SKU Details</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Enter Short Name</label>
                  <input type="text" defaultValue={sku.details.shortName} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Long Description</label>
                  <textarea defaultValue={sku.details.longDescription} rows={1} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2 font-medium">Enter Bar Code</label>
                <input type="text" defaultValue={sku.details.barCode} className="w-full px-4 py-3 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">Short Description</label>
                <textarea defaultValue={sku.details.shortDescription} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded" />
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Tax Details Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">Tax Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Select Country</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>{sku.tax.country}</option></select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Select Tax Rate</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>{sku.tax.taxRate}%</option></select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Select Tax Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>{sku.tax.taxCategory}</option></select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Select Class Rate</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>{sku.tax.caseRate}%</option></select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Enter HSN Code</label>
                  <input type="text" defaultValue={sku.tax.hsnCode} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Packaging and Inventory Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">Packaging and Inventory</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Enter UPC</label>
                  <input type="text" defaultValue={sku.packaging.upc} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Inner Pack Qty</label>
                  <input type="number" defaultValue={sku.packaging.innerPackQty} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Minimum Order Qty</label>
                  <input type="number" defaultValue={sku.packaging.minOrderQty} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Maximum Order Qty</label>
                  <input type="number" defaultValue={sku.packaging.maxOrderQty} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="text-sm text-gray-600 font-medium">UOM</label><p className="text-gray-800 py-3">{sku.details.uom}</p></div>
                <div><label className="text-sm text-gray-600 font-medium">Product Package Type</label><p className="text-gray-800 py-3">{sku.packaging.packageType}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Display Order</label>
                  <input type="number" defaultValue={sku.packaging.displayOrder} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Pickup Order</label>
                  <input type="number" defaultValue={sku.packaging.pickupOrder} className="w-full px-4 py-3 border border-gray-300 rounded" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Attributes Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">Attributes</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2 mb-4">
                <Plus size={18} /><span>Add</span>
              </button>
              <div className="text-sm text-gray-600 mb-4">Need to select at least one attribute</div>
              <select className="w-full px-4 py-3 border border-gray-300 rounded"><option>Select Attributes</option></select>
            </div>

            <hr className="border-gray-200" />

            {/* Images Section */}
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4">Images</h3>
              <p className="text-sm text-gray-600 mb-4"><strong>Note:</strong> Permanent Image is required. Size 1280x720.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Image</label>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
                  <p className="text-sm text-gray-600">No file chosen</p>
                </div>
              </div>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Optional Image {num}</label>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Choose File</button>
                  <p className="text-sm text-gray-600 mt-2">No file chosen</p>
                </div>
              ))}
            </div>

            <hr className="border-gray-200" />

            {/* Publish Button */}
            <div className="flex justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
