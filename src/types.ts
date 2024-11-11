export interface SupplyItem {
  id: string;
  name: string;
  batchNumber: string;
  manufacturer: string;
  manufacturingDate: string;
  expiryDate: string;
  currentLocation: string;
  status: 'manufactured' | 'in-transit' | 'delivered' | 'expired';
  temperature: number;
  humidity: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  timestamp: string;
  from: string;
  to: string;
  status: string;
  verifiedBy: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  role: 'manufacturer' | 'distributor' | 'hospital' | 'pharmacy' | 'regulator';
  location: string;
  verified: boolean;
}