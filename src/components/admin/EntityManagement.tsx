import React, { useState } from 'react';
import { useVeChain } from '../../hooks/useVeChain';
import { UserPlus, Shield, AlertCircle } from 'lucide-react';

const ROLES = ['Manufacturer', 'Distributor', 'Hospital', 'Pharmacy'];

export function EntityManagement() {
  const { addEntity, authorizeEntity, loading, error } = useVeChain();
  const [entityAddress, setEntityAddress] = useState('');
  const [entityName, setEntityName] = useState('');
  const [selectedRole, setSelectedRole] = useState(0);

  const handleAddEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEntity(entityAddress, entityName, selectedRole);
      setEntityAddress('');
      setEntityName('');
      setSelectedRole(0);
    } catch (err) {
      console.error('Failed to add entity:', err);
    }
  };

  const handleAuthorize = async (address: string, authorized: boolean) => {
    try {
      await authorizeEntity(address, authorized);
    } catch (err) {
      console.error('Failed to authorize entity:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <UserPlus className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Entity Management</h2>
      </div>

      <form onSubmit={handleAddEntity} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entity Address
          </label>
          <input
            type="text"
            value={entityAddress}
            onChange={(e) => setEntityAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entity Name
          </label>
          <input
            type="text"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Organization name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {ROLES.map((role, index) => (
              <option key={role} value={index}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Shield className="w-4 h-4" />
          <span>Add Entity</span>
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