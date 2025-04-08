import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { DataUpload } from './components/upload/DataUpload';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { DoctorsPage } from './components/doctors/DoctorsPage';
import { PharmaciesPage } from './components/pharmacies/PharmaciesPage';
import { PrescriptionsPage } from './components/prescriptions/PrescriptionsPage';
import { DataProvider } from './components/context/DataContext';
export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  return <DataProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {currentPage === 'dashboard' && <DashboardOverview />}
            {currentPage === 'upload' && <DataUpload setCurrentPage={setCurrentPage} />}
            {currentPage === 'analytics' && <AnalyticsPage />}
            {currentPage === 'doctors' && <DoctorsPage />}
            {currentPage === 'pharmacies' && <PharmaciesPage />}
            {currentPage === 'prescriptions' && <PrescriptionsPage />}
          </main>
        </div>
      </div>
    </DataProvider>;
}