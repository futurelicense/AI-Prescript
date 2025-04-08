import React from 'react';
import { useData } from '../context/DataContext';
export function PrescriptionChart() {
  const {
    prescriptions
  } = useData();
  const generateMonthlyData = () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    const monthlyData = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(sixMonthsAgo);
      date.setMonth(date.getMonth() + i);
      monthlyData.push({
        month: date.toLocaleString('default', {
          month: 'short'
        }),
        opioids: 0,
        stimulants: 0,
        sedatives: 0
      });
    }
    prescriptions.forEach(prescription => {
      const prescDate = new Date(prescription.Prescription_Date);
      if (isNaN(prescDate.getTime())) return;
      if (prescDate >= sixMonthsAgo) {
        const monthIndex = prescDate.getMonth() - sixMonthsAgo.getMonth();
        if (monthIndex >= 0 && monthIndex < 6) {
          const drugClass = prescription.Drug_Class.toLowerCase();
          if (drugClass === 'opioid') monthlyData[monthIndex].opioids++;
          if (drugClass === 'stimulant') monthlyData[monthIndex].stimulants++;
          if (drugClass === 'sedative') monthlyData[monthIndex].sedatives++;
        }
      }
    });
    return monthlyData;
  };
  const data = generateMonthlyData();
  const maxValue = Math.max(...data.flatMap(d => [d.opioids, d.stimulants, d.sedatives]));
  if (maxValue === 0) {
    return <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500">No prescription data available</p>
      </div>;
  }
  return <div>
      <div className="flex items-center justify-end mb-4 space-x-4">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm text-gray-600">Opioids</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm text-gray-600">Stimulants</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
          <span className="text-sm text-gray-600">Sedatives</span>
        </div>
      </div>
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end">
          {data.map((month, index) => <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className="w-4 bg-blue-500 rounded-t" style={{
            height: `${month.opioids / maxValue * 100}%`
          }}></div>
              <div className="w-4 bg-green-500 rounded-t mt-1" style={{
            height: `${month.stimulants / maxValue * 100}%`
          }}></div>
              <div className="w-4 bg-purple-500 rounded-t mt-1" style={{
            height: `${month.sedatives / maxValue * 100}%`
          }}></div>
              <span className="mt-2 text-xs text-gray-500">{month.month}</span>
            </div>)}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-gray-800">
              Trend Analysis
            </span>
            <p className="text-xs text-gray-500">
              {data[5].opioids > data[0].opioids ? 'Opioid prescriptions showing concerning upward trend' : 'Opioid prescriptions remain stable or decreasing'}
            </p>
          </div>
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Last 6 months</option>
            <option disabled>Last year</option>
            <option disabled>Last 2 years</option>
          </select>
        </div>
      </div>
    </div>;
}