import { X, AlertTriangle, Edit2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { mockSKUs, getStockStatus, StockStatus } from '../data/mockData';
import { notificationStore } from './NotificationCenter';

interface StockAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditState {
  [skuId: string]: {
    stock: {
      availableCases: number;
      availablePieces: number;
    };
    pricing: {
      mrp: number;
      sellingPrice: number;
    };
  };
}

export default function StockAlertModal({ isOpen, onClose }: StockAlertModalProps) {
  const [editingState, setEditingState] = useState<EditState>({});
  const [editingSKUId, setEditingSKUId] = useState<string | null>(null);

  const alertSKUs = mockSKUs.filter(
    sku => sku.status === 'Active' &&
    (getStockStatus(sku.stock.availableCases, sku.stock.availablePieces) === 'OUT_OF_STOCK' ||
     getStockStatus(sku.stock.availableCases, sku.stock.availablePieces) === 'LOW_STOCK')
  );

  const outOfStockCount = alertSKUs.filter(
    sku => getStockStatus(sku.stock.availableCases, sku.stock.availablePieces) === 'OUT_OF_STOCK'
  ).length;

  const lowStockCount = alertSKUs.filter(
    sku => getStockStatus(sku.stock.availableCases, sku.stock.availablePieces) === 'LOW_STOCK'
  ).length;

  const totalAlerts = outOfStockCount + lowStockCount;

  const handleEditClick = (skuId: string, sku: typeof mockSKUs[0]) => {
    setEditingState({
      ...editingState,
      [skuId]: editingState[skuId] || {
        stock: {
          availableCases: sku.stock.availableCases,
          availablePieces: sku.stock.availablePieces,
        },
        pricing: {
          mrp: sku.pricing.mrp,
          sellingPrice: sku.pricing.sellingPrice,
        }
      }
    });
    setEditingSKUId(skuId);
  };

  const handleSave = (skuId: string) => {
    const sku = mockSKUs.find(s => s.id === skuId);
    if (!sku) return;

    const editState = editingState[skuId];
    if (!editState) return;

    const oldStock = sku.stock.totalAvailablePieces;
    const oldStockStatus = getStockStatus(sku.stock.availableCases, sku.stock.availablePieces);
    const newStock = editState.stock.availableCases * (sku.stock.piecesPerCase || 20) + editState.stock.availablePieces;
    const newStockStatus = getStockStatus(editState.stock.availableCases, editState.stock.availablePieces);

    // Update stock and pricing
    sku.stock.availableCases = editState.stock.availableCases;
    sku.stock.availablePieces = editState.stock.availablePieces;
    sku.stock.totalAvailablePieces = newStock;
    sku.pricing.mrp = editState.pricing.mrp;
    sku.pricing.sellingPrice = editState.pricing.sellingPrice;
    sku.mrp = editState.pricing.mrp;
    sku.sellingPrice = editState.pricing.sellingPrice;

    // Trigger notifications based on status transitions
    if (newStockStatus === 'NORMAL_STOCK' && oldStockStatus !== 'NORMAL_STOCK') {
      // Stock recovered to normal
      notificationStore.notify({
        type: 'success',
        title: 'Stock Updated',
        message: `${sku.productName} stock updated to ${newStock} pieces. Stock is now at normal level.`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    } else if (oldStockStatus === 'OUT_OF_STOCK' && newStockStatus === 'LOW_STOCK') {
      notificationStore.notify({
        type: 'warning',
        title: 'Stock Alert',
        message: `${sku.productName} has low stock. Current stock: ${newStock}`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    } else if (oldStockStatus === 'OUT_OF_STOCK' && newStockStatus === 'NORMAL_STOCK') {
      notificationStore.notify({
        type: 'success',
        title: 'Stock Updated',
        message: `${sku.productName} stock recovered to ${newStock} pieces.`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    } else if (oldStockStatus === 'NORMAL_STOCK' && newStockStatus === 'LOW_STOCK') {
      notificationStore.notify({
        type: 'warning',
        title: 'Stock Alert',
        message: `${sku.productName} has reached low stock. Current stock: ${newStock}`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    } else if (oldStockStatus !== 'OUT_OF_STOCK' && newStockStatus === 'OUT_OF_STOCK') {
      notificationStore.notify({
        type: 'error',
        title: 'Stock Alert',
        message: `${sku.productName} is now Out of Stock. Please update the stock and price.`,
        skuId: sku.id,
        navigationPath: `/sku/edit/${sku.id}`
      });
    }

    // Clear edit state
    const newEditingState = { ...editingState };
    delete newEditingState[skuId];
    setEditingState(newEditingState);
    setEditingSKUId(null);
  };

  const getStockStatusBadge = (stockStatus: StockStatus) => {
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
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${styles[stockStatus]}`}>
        {labels[stockStatus]}
      </span>
    );
  };

  if (!isOpen) return null;

  const currentEditingSKU = editingSKUId ? mockSKUs.find(s => s.id === editingSKUId) : null;
  const currentEditState = editingSKUId ? editingState[editingSKUId] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <AlertTriangle size={28} className="text-orange-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Stock Alert</h2>
              <p className="text-sm text-gray-600 mt-1">
                {totalAlerts} SKU(s) need attention
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-8">
        {!editingSKUId ? (
          <>
            {/* Alert Summary */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-2">
                {outOfStockCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 font-semibold">{outOfStockCount}</span>
                    <span className="text-gray-700">Out of Stock</span>
                  </div>
                )}
                {lowStockCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600 font-semibold">{lowStockCount}</span>
                    <span className="text-gray-700">Low Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Alert SKUs List */}
            <div className="space-y-3 mb-6">
              {alertSKUs.map(sku => {
                const stockStatus = getStockStatus(sku.stock.availableCases, sku.stock.availablePieces);
                return (
                  <div key={sku.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{sku.productName}</h3>
                      <p className="text-xs text-gray-600 mt-1">Brand: {sku.brand} | Cases: {sku.stock.availableCases}, Pieces: {sku.stock.availablePieces}</p>
                      <div className="mt-2">
                        {getStockStatusBadge(stockStatus)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditClick(sku.id, sku)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-semibold flex items-center space-x-2"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Warning message */}
            <p className="text-sm text-gray-600 mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded">
              Please update the stock and price up to the date properly.
            </p>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </>
        ) : currentEditingSKU && currentEditState ? (
          <>
            {/* Edit Form - Same as SKUEdit.tsx */}
            <div className="mb-4 flex items-center">
              <button
                onClick={() => setEditingSKUId(null)}
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 text-sm font-semibold"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-4">
              SKU Name : <span className="text-green-600">{currentEditingSKU.productName}</span>
            </h1>

            <div className="space-y-6">
              {/* Stock Section */}
              <div>
                <h2 className="text-lg font-bold text-blue-600 mb-4">Stock</h2>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <label className="text-sm text-gray-600">Default Pieces per case : {currentEditingSKU.stock.piecesPerCase}</label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Available Cases</label>
                    <input
                      type="number"
                      value={currentEditState.stock.availableCases}
                      onChange={(e) => setEditingState({
                        ...editingState,
                        [editingSKUId]: {
                          ...currentEditState,
                          stock: {
                            ...currentEditState.stock,
                            availableCases: parseInt(e.target.value) || 0
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Available Pieces</label>
                    <input
                      type="number"
                      value={currentEditState.stock.availablePieces}
                      onChange={(e) => setEditingState({
                        ...editingState,
                        [editingSKUId]: {
                          ...currentEditState,
                          stock: {
                            ...currentEditState.stock,
                            availablePieces: parseInt(e.target.value) || 0
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Total Available Pieces</label>
                    <input
                      type="number"
                      disabled
                      value={currentEditState.stock.availableCases * (currentEditingSKU.stock.piecesPerCase || 20) + currentEditState.stock.availablePieces}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm font-semibold"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave(editingSKUId)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold text-sm"
                >
                  Update Stock
                </button>
              </div>

              <hr className="border-gray-200" />

              {/* Pricing Section */}
              <div>
                <h2 className="text-lg font-bold text-blue-600 mb-4">Add Pricing</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">MRP</label>
                    <input
                      type="number"
                      value={currentEditState.pricing.mrp}
                      onChange={(e) => setEditingState({
                        ...editingState,
                        [editingSKUId]: {
                          ...currentEditState,
                          pricing: {
                            ...currentEditState.pricing,
                            mrp: parseFloat(e.target.value) || 0
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Selling Price</label>
                    <input
                      type="number"
                      value={currentEditState.pricing.sellingPrice}
                      onChange={(e) => setEditingState({
                        ...editingState,
                        [editingSKUId]: {
                          ...currentEditState,
                          pricing: {
                            ...currentEditState.pricing,
                            sellingPrice: parseFloat(e.target.value) || 0
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave(editingSKUId)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold text-sm"
                >
                  Update Price
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={() => setEditingSKUId(null)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition"
              >
                Back to List
              </button>
            </div>
          </>
        ) : null}
        </div>
      </div>
    </div>
  );
}
