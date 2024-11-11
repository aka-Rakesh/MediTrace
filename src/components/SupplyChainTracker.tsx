import React from 'react';
import { Package2, Truck, Building2, Store } from 'lucide-react';

function SupplyChainTracker() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Supply Chain Progress</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <Package2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">Manufactured</p>
            <p className="text-sm text-gray-500">Product created by manufacturer</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">In Transit</p>
            <p className="text-sm text-gray-500">Being transported to destination</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">At Hospital</p>
            <p className="text-sm text-gray-500">Received by healthcare facility</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <Store className="w-5 h-5 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">At Pharmacy</p>
            <p className="text-sm text-gray-500">Ready for distribution</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyChainTracker;