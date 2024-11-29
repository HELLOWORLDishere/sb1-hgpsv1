import React from 'react';

interface PhysicsInfoProps {
  velocity: number;
  time: number;
  kineticEnergy: number;
  potentialEnergy: number;
  totalEnergy: number;
  displacement: number;
  acceleration: number;
}

export const PhysicsInfo: React.FC<PhysicsInfoProps> = ({
  velocity,
  time,
  kineticEnergy,
  potentialEnergy,
  totalEnergy,
  displacement,
  acceleration,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="text-center">
        <p className="text-sm text-gray-600">Vận tốc tức thời</p>
        <p className="font-semibold">{velocity.toFixed(2)} m/s</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Thời gian</p>
        <p className="font-semibold">{time.toFixed(2)} s</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Quãng đường</p>
        <p className="font-semibold">{displacement.toFixed(2)} m</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Gia tốc</p>
        <p className="font-semibold">{acceleration.toFixed(2)} m/s²</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Động năng</p>
        <p className="font-semibold">{kineticEnergy.toFixed(2)} J</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Thế năng</p>
        <p className="font-semibold">{potentialEnergy.toFixed(2)} J</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Cơ năng</p>
        <p className="font-semibold">{totalEnergy.toFixed(2)} J</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Công suất</p>
        <p className="font-semibold">{(kineticEnergy / time || 0).toFixed(2)} W</p>
      </div>
    </div>
  );
};