// Các hàm tính toán vật lý
interface TrajectoryResult {
  x: number[];
  y: number[];
  time: number[];
  velocity: number[];
  kineticEnergy: number[];
  potentialEnergy: number[];
  totalEnergy: number[];
}

export const calculateTrajectory = (
  v0: number,
  a: number,
  timePoints: number = 50

): TrajectoryResult => {
  const time = Array.from({ length: timePoints }, (_, i) => (i * 5) / (timePoints - 1));
  const x = time.map((t) => (a * v0 * t ** 2) / 2);
  const y = time.map((t) => v0 * t);
  
  // Tính vận tốc tại mỗi điểm
  const velocity = time.map((t) => Math.sqrt((a * t) ** 2 + v0 ** 2));
  
  // Khối lượng giả định (kg)
  const mass = 1;
  
  // Tính động năng, thế năng và cơ năng
  const kineticEnergy = velocity.map((v) => 0.5 * mass * v ** 2);
  const potentialEnergy = y.map((height) => mass * 9.81 * height);
  const totalEnergy = kineticEnergy.map((ke, i) => ke + potentialEnergy[i]);
  
  return { x, y, time, velocity, kineticEnergy, potentialEnergy, totalEnergy };
};

export const getAxisLimits = (x: number[], y: number[]) => ({
  xMax: Math.max(...x) * 1.1,
  yMax: Math.max(...y) * 1.1
});