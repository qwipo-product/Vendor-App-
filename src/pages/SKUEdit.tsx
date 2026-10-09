import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Search, User, ArrowLeft } from 'lucide-react';
import { mockSKUs, getStockStatus, StockStatus } from '../data/mockData';
import { notificationStore } from '../components/NotificationCenter';

export default function SKUEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sku = mockSKUs.find(s => s.id === id);

  const [stock, setStock] = useState({
    availableCases: sku?.stock.availableCases || 0,
    availablePieces: sku?.stock.availablePieces || 0
  });

  const [pricing, setPricing] = useState({
    mrp: sku?.pricing.mrp || 0,
    sellingPrice: sku?.pricing.sellingPrice || 0
  });

  if (!sku) {
    return <div>SKU not found</div>;
  }

  const currentStock = sku.stock.totalAvailablePieces;
  const currentStockStatus = getStockStatus(sku.stock.availableCases, sku.stock.availablePieces);
  const newStock = stock.availableCases * (sku.stock.piecesPerCase || 20) + stock.availablePieces;
  const newStockStatus = getStockStatus(stock.availableCases, stock.availablePieces);

  const handleStockUpdate = () => {
    const wasOutOfStock = currentStockStatus === 'OUT_OF_STOCK';
    const wasLowStock = currentStockStatus === 'LOW_STOCK';
    const isNowOutOfStock = newStockStatus === 'OUT_OF_STOCK';
    const isNowLowStock = newStockStatus === 'LOW_STOCK';

    // Update the mock data
    sku.stock.availableCases = stock.availableCases;
    sku.stock.availablePieces = stock.availablePieces;
    sku.stock.totalAvailablePieces = newStock;

    // Trigger notifications based on status transitions
    if (!isNowOutOfStock && !isNowLowStock) {
      // Stock recovered to normal
      notificationStore.notify({
        type: 'success',
        title: 'Stock Updated',
        message: `${sku.productName} stock updated to ${newStock} pieces. Stock is now at normal level.`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    } else if (wasOutOfStock && isNowLowStock) {
      // Recovered from out of stock to low stock
      notificationStore.notify({
        type: 'warning',
        title: 'Stock Alert',
        message: `${sku.productName} has low stock. Current stock: ${newStock}`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`,
        action: {
          label: 'Update Stock',
          onClick: () => navigate(`/sku/edit/${sku.id}`)
        }
      });
    } else if (wasOutOfStock && newStockStatus === 'NORMAL_STOCK') {
      // Recovered from out of stock to normal
      notificationStore.notify({
        type: 'success',
        title: 'Stock Updated',
        message: `${sku.productName} stock recovered to ${newStock} pieces.`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    } else if (!wasLowStock && isNowLowStock) {
      // Entered low stock
      notificationStore.notify({
        type: 'warning',
        title: 'Stock Alert',
        message: `${sku.productName} has reached low stock. Current stock: ${newStock}`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`,
        action: {
          label: 'Update Stock',
          onClick: () => navigate(`/sku/edit/${sku.id}`)
        }
      });
    } else if (!wasOutOfStock && isNowOutOfStock) {
      // Entered out of stock
      notificationStore.notify({
        type: 'error',
        title: 'Stock Alert',
        message: `${sku.productName} is now Out of Stock. Please update the stock and price.`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`,
        action: {
          label: 'Update Stock',
          onClick: () => navigate(`/sku/edit/${sku.id}`)
        }
      });
    }

    setTimeout(() => {
      navigate('/products/my-skus');
    }, 1500);
  };

  const handlePriceUpdate = () => {
    sku.pricing.mrp = pricing.mrp;
    sku.pricing.sellingPrice = pricing.sellingPrice;

    notificationStore.notify({
      type: 'success',
      title: 'Price Updated',
      message: `${sku.productName} price updated successfully.`,
      skuId: sku.id
    });

    setTimeout(() => {
      navigate('/products/my-skus');
    }, 1500);
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
      <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${styles[stockStatus]}`}>
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
          {/* Back button and Title */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/products/my-skus')}
              className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 text-lg font-semibold"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold">
              Mark Inactive
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            SKU Name : <span className="text-green-600">{sku.productName}</span>
          </h1>

          <div className="bg-white rounded-lg shadow p-8 space-y-8">
            {/* Stock Status Display */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current Stock Status</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-semibold text-gray-800">{currentStock} pieces</span>
                    {getStockStatusBadge(currentStockStatus)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2">After Update</p>
                  <div className="flex items-center justify-end space-x-3">
                    <span className="text-lg font-semibold text-gray-800">{newStock} pieces</span>
                    {getStockStatusBadge(newStockStatus)}
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Section */}
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-6">Stock</h2>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <label className="text-sm text-gray-600">Default Pieces per case : {sku.stock.piecesPerCase}</label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Available Css</label>
                  <input
                    type="number"
                    value={stock.availableCases}
                    onChange={(e) => setStock({ ...stock, availableCases: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Available Pcs</label>
                  <input
                    type="number"
                    value={stock.availablePieces}
                    onChange={(e) => setStock({ ...stock, availablePieces: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Total Available Pcs</label>
                  <input
                    type="number"
                    disabled
                    value={newStock}
                    className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 font-semibold"
                  />
                </div>
              </div>

              <button
                onClick={handleStockUpdate}
                className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              >
                Update Stock
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Pricing Section */}
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-6">Add Pricing</h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">MRP</label>
                  <input
                    type="number"
                    value={pricing.mrp}
                    onChange={(e) => setPricing({ ...pricing, mrp: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">Selling Price</label>
                  <input
                    type="number"
                    value={pricing.sellingPrice}
                    onChange={(e) => setPricing({ ...pricing, sellingPrice: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePriceUpdate}
                className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              >
                Update Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
