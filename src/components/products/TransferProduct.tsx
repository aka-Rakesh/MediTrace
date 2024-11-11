import React, { useState } from 'react';
import { useVeChain } from '../../hooks/useVeChain';
import { Send, AlertCircle } from 'lucide-react';

export function TransferProduct() {
  const { transferProduct, loading, error } = useVeChain();
  const [productId, setProductId] = useState('');
  const [newHolder, setNewHolder] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await transferProduct(Number(productId), newHolder);
      setProductId('');
      setNewHolder('');
    } catch (err) {
      console.error('Failed to transfer product:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Send className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Transfer Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product ID
          </label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product ID"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Holder Address
          </label>
          <input
            type="text"
            value={newHolder}
            onChange={(e) => setNewHolder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0x..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>Transfer Product</span>
        </button>
      </form>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 mt-4">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}