import React from 'react';
import { Truck } from 'lucide-react';
import { ProductList } from '../components/products/ProductList';
import { TransferProduct } from '../components/products/TransferProduct';

export function DistributorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Truck className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Distributor Dashboard</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductList role="distributor" />
        <TransferProduct />
      </div>
    </div>
  );
}