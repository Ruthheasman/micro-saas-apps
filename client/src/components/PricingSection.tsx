import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-pricing-title">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
            Compare traditional hosting vs 1Sat Apps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Hosting */}
          <Card className="p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
              Old Way
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold" data-testid="text-traditional-title">
                Traditional Hosting
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$10-50</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>Monthly recurring costs forever</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>Server maintenance required</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>Can be censored or taken down</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>Potential downtime</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>Complex payment integration</span>
              </li>
            </ul>
          </Card>

          {/* 1Sat Apps */}
          <Card className="p-8 space-y-6 relative overflow-hidden border-primary">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
              New Way
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold" data-testid="text-1sat-title">
                1Sat Apps
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">&lt;$0.01</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="font-medium">Deploy once, run forever</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="font-medium">Zero hosting fees</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="font-medium">Censorship resistant</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="font-medium">100% uptime guaranteed</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="font-medium">Built-in micropayments</span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="mt-12 text-center space-y-2">
          <p className="text-lg font-medium">Save $120-600 per year, per app</p>
          <p className="text-sm text-muted-foreground">Plus true ownership and zero maintenance</p>
        </div>
      </div>
    </section>
  );
}
