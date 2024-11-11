import React from 'react';
import { Shield } from 'lucide-react';
import { EntityManagement } from '../components/admin/EntityManagement';

export function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <EntityManagement />
      </div>
    </div>
  );
}