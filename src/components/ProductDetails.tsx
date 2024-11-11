import React from 'react';

function ProductDetails() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Product Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <p className="mt-1 text-sm text-gray-900">PRD-001</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-sm text-gray-900">Medical Supply Package</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Holder</label>
          <p className="mt-1 text-sm text-gray-900">0x1234...5678</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <p className="mt-1 text-sm text-gray-900">Manufactured</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Updated</label>
          <p className="mt-1 text-sm text-gray-900">2024-03-14 10:30 AM</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;