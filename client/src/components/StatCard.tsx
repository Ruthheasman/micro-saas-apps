import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  testId?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, testId }: StatCardProps) {
  return (
    <Card className="p-6" data-testid={testId}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground" data-testid={`${testId}-title`}>
            {title}
          </p>
          <p className="text-3xl font-bold" data-testid={`${testId}-value`}>
            {value}
          </p>
          {trend && (
            <p
              className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
              data-testid={`${testId}-trend`}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
