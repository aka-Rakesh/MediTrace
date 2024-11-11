import { Calendar, Thermometer, Droplets, Factory, Hash } from 'lucide-react';
import React from 'react';
import type { SupplyItem } from '../types';

interface Props {
  item: SupplyItem;
}

export function SupplyDetails({ item }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Supply Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Hash className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Batch Number</p>
            <p className="font-medium">{item.batchNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Factory className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Manufacturer</p>
            <p className="font-medium">{item.manufacturer}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Manufacturing Date</p>
            <p className="font-medium">{item.manufacturingDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Expiry Date</p>
            <p className="font-medium">{item.expiryDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Thermometer className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="font-medium">{item.temperature}°C</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-medium">{item.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}