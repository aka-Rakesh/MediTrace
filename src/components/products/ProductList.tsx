import React, { useState, useEffect } from 'react';
import { useVeChain } from '../../hooks/useVeChain';
import { Package, AlertCircle } from 'lucide-react';
import type { SupplyItem } from '../../types';

interface Props {
  role: 'manufacturer' | 'distributor' | 'hospital' | 'pharmacy';
}

export function ProductList({ role }: Props) {
  const { verifyProduct, loading, error } = useVeChain();
  const [products, setProducts] = useState<SupplyItem[]>([]);

  useEffect(() => {
    // In a real application, we would fetch products based on the role
    // For now, we'll just show a sample product
    const fetchProducts = async () => {
      try {
        const product = await verifyProduct(1);
        setProducts([product]);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, [verifyProduct]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Package className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">My Products</h2>
      </div>

      {loading && <p className="text-gray-500">Loading products...</p>}

      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">Batch: {product.batchNumber}</p>
            <p className="text-sm text-gray-500">Status: {product.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}