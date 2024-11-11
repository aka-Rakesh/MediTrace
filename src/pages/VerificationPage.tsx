import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useVeChain } from '../hooks/useVeChain';
import { SupplyDetails } from '../components/SupplyDetails';
import type { SupplyItem } from '../types';

export function VerificationPage() {
  const { verifyProduct, loading, error } = useVeChain();
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<SupplyItem | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await verifyProduct(Number(productId));
      setProduct(result);
    } catch (err) {
      console.error('Failed to verify product:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Search className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Product Verification</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleVerify} className="mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !productId}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Verify
            </button>
          </div>
        </form>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 mb-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {product && <SupplyDetails item={product} />}
      </div>
    </div>
  );
}