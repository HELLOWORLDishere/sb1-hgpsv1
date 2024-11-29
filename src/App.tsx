import React, { useState, useCallback } from 'react';
import { Rocket } from 'lucide-react';
import { Slider } from './components/Slider';
import { TrajectoryChart } from './components/TrajectoryChart';
import { PhysicsInfo } from './components/PhysicsInfo';
import { calculateTrajectory, getAxisLimits } from './utils/physics';

function App() {
  const [v0, setV0] = useState(25);
  const [acceleration, setAcceleration] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const trajectory = calculateTrajectory(v0, acceleration);
  const { xMax, yMax } = getAxisLimits(trajectory.x, trajectory.y);

  const handleV0Change = useCallback((value: number) => {
    setV0(value);
    setCurrentIndex(0);
  }, []);

  const handleAccelerationChange = useCallback((value: number) => {
    setAcceleration(value);
    setCurrentIndex(0);
  }, []);

  const handleTimeChange = useCallback((value: number) => {
    setCurrentIndex(Math.floor((value / 5) * 49));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Rocket className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Mô phỏng Chuyển động Vật lý
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Slider
              label="Vận tốc ban đầu (v₀)"
              value={v0}
              min={0}
              max={100}
              unit="m/s"
              onChange={handleV0Change}
            />
            <Slider
              label="Gia tốc (a)"
              value={acceleration}
              min={0}
              max={100}
              unit="m/s²"
              onChange={handleAccelerationChange}
            />
            <Slider
              label="Thời gian (t)"
              value={trajectory.time[currentIndex]}
              min={0.1}
              max={5}
              unit="s"
              onChange={handleTimeChange}
            />
          </div>
        </div>

        <PhysicsInfo
          velocity={trajectory.velocity[currentIndex]}
          time={trajectory.time[currentIndex]}
          kineticEnergy={trajectory.kineticEnergy[currentIndex]}
          potentialEnergy={trajectory.potentialEnergy[currentIndex]}
          totalEnergy={trajectory.totalEnergy[currentIndex]}
          displacement={Math.sqrt(
            trajectory.x[currentIndex] ** 2 + trajectory.y[currentIndex] ** 2
          )}
          acceleration={acceleration}
        />

        <TrajectoryChart
          xValues={trajectory.x}
          yValues={trajectory.y}
          xMax={xMax}
          yMax={yMax}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
}

export default App;
