import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useData } from '../context/DataContext';
import 'leaflet/dist/leaflet.css';
export function GeographicDistribution() {
  const {
    prescriptions
  } = useData();
  const pharmacyData = prescriptions.reduce((acc: any, prescription) => {
    const id = prescription.Pharmacy_ID;
    if (!acc[id]) {
      acc[id] = {
        id,
        name: `Pharmacy ${id}`,
        totalPrescriptions: 0,
        controlledSubstances: 0,
        lat: 35 + Math.random() * 10,
        lng: -100 + Math.random() * 50
      };
    }
    acc[id].totalPrescriptions++;
    if (['Opioid', 'Stimulant', 'Sedative'].includes(prescription.Drug_Class)) {
      acc[id].controlledSubstances++;
    }
    return acc;
  }, {});
  const locations = Object.values(pharmacyData).map((pharmacy: any) => ({
    ...pharmacy,
    risk: Math.round(pharmacy.controlledSubstances / pharmacy.totalPrescriptions * 100)
  }));
  const getRiskColor = (risk: number) => {
    if (risk >= 90) return '#ef4444';
    if (risk >= 70) return '#f97316';
    return '#eab308';
  };
  return <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{
      height: '100%',
      width: '100%'
    }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        {locations.map(location => <CircleMarker key={location.id} center={[location.lat, location.lng]} radius={10} pathOptions={{
        fillColor: getRiskColor(location.risk),
        fillOpacity: 0.7,
        color: 'white',
        weight: 1
      }}>
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-gray-600">
                  Risk Score: {location.risk}
                </p>
                <p className="text-sm text-gray-600">
                  Total Prescriptions: {location.totalPrescriptions}
                </p>
                <p className="text-sm text-gray-600">
                  Controlled Substances: {location.controlledSubstances}
                </p>
              </div>
            </Popup>
          </CircleMarker>)}
      </MapContainer>
    </div>;
}