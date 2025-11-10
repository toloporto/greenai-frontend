import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Ene', income: 4000, cost: 2400 },
  { month: 'Feb', income: 3000, cost: 1398 },
  { month: 'Mar', income: 5000, cost: 3800 },
];

export default function ProfitChart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="cost" stroke="#ef4444" name="Costos" />
      <Line type="monotone" dataKey="income" stroke="#22c55e" name="Ingresos" />
    </LineChart>
  );
}
