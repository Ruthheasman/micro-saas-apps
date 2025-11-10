import StatCard from '../StatCard';
import { TrendingUp } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="max-w-xs">
      <StatCard
        title="Total Revenue"
        value="$1,234"
        icon={TrendingUp}
        trend={{ value: 12.5, isPositive: true }}
        testId="stat-revenue"
      />
    </div>
  );
}
