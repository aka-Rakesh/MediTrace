import React from 'react';
import { Factory, Package } from 'lucide-react';
import { ProductCreation } from '../components/products/ProductCreation';
import { ProductList } from '../components/products/ProductList';

export function ManufacturerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Factory className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Manufacturer Dashboard</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductCreation />
        <ProductList role="manufacturer" />
      </div>
    </div>
  );
}