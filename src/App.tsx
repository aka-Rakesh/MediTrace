import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import { AdminPage } from './pages/AdminPage';
import { ManufacturerPage } from './pages/ManufacturerPage';
import { DistributorPage } from './pages/DistributorPage';
import { VerificationPage } from './pages/VerificationPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'admin' | 'manufacturer' | 'distributor' | 'verify'>('verify');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage('admin')}
            className={`px-4 py-2 rounded-md ${
              currentPage === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setCurrentPage('manufacturer')}
            className={`px-4 py-2 rounded-md ${
              currentPage === 'manufacturer' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Manufacturer
          </button>
          <button
            onClick={() => setCurrentPage('distributor')}
            className={`px-4 py-2 rounded-md ${
              currentPage === 'distributor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Distributor
          </button>
          <button
            onClick={() => setCurrentPage('verify')}
            className={`px-4 py-2 rounded-md ${
              currentPage === 'verify' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Verify
          </button>
        </div>

        {currentPage === 'admin' && <AdminPage />}
        {currentPage === 'manufacturer' && <ManufacturerPage />}
        {currentPage === 'distributor' && <DistributorPage />}
        {currentPage === 'verify' && <VerificationPage />}
      </main>
    </div>
  );
}

export default App;