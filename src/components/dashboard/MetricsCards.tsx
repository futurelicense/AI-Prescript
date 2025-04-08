import React from 'react';
import { AlertCircleIcon, TrendingUpIcon, UsersIcon, PillIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
export function MetricsCards() {
  const {
    processedData
  } = useData();
  // Calculate high risk doctors (those with risk score >= 80)
  const highRiskDoctors = Object.values(processedData.riskScores).filter(score => score >= 80).length;
  const metrics = [{
    title: 'Total Prescriptions',
    value: processedData.totalPrescriptions.toLocaleString(),
    change: '+12%',
    changeType: 'increase',
    icon: <PillIcon className="h-6 w-6 text-blue-600" />,
    bgColor: 'bg-blue-50'
  }, {
    title: 'Total Doctors',
    value: processedData.totalDoctors.toLocaleString(),
    change: '+3.2%',
    changeType: 'increase',
    icon: <UsersIcon className="h-6 w-6 text-amber-600" />,
    bgColor: 'bg-amber-50'
  }, {
    title: 'High Risk Doctors',
    value: highRiskDoctors.toLocaleString(),
    change: '+8%',
    changeType: 'increase',
    icon: <AlertCircleIcon className="h-6 w-6 text-red-600" />,
    bgColor: 'bg-red-50'
  }, {
    title: 'Total Pharmacies',
    value: processedData.totalPharmacies.toLocaleString(),
    change: '+5%',
    changeType: 'increase',
    icon: <TrendingUpIcon className="h-6 w-6 text-emerald-600" />,
    bgColor: 'bg-emerald-50'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`${metric.bgColor} p-3 rounded-full mr-4`}>
              {metric.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {metric.title}
              </p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className={`text-sm font-medium ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change}{' '}
              {metric.changeType === 'increase' ? 'increase' : 'decrease'}
            </span>
            <span className="text-sm text-gray-500"> from last month</span>
          </div>
        </div>)}
    </div>;
}