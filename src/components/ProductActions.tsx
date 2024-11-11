import React from 'react';
import { useVeChain } from '../hooks/useVeChain';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface Props {
  productId: string;
  status: string;
  onStatusUpdate: () => void;
}

export function ProductActions({ productId, status, onStatusUpdate }: Props) {
  const { updateStatus, transferProduct, error } = useVeChain();

  const handleStatusUpdate = async (newStatus: number) => {
    try {
      await updateStatus(parseInt(productId), newStatus);
      onStatusUpdate();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={() => handleStatusUpdate(1)}
          disabled={status !== 'manufactured'}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Truck className="w-5 h-5" />
          <span>Start Transit</span>
        </button>
        <button
          onClick={() => handleStatusUpdate(2)}
          disabled={status !== 'in-transit'}
          className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Mark as Delivered</span>
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}