import { Sparkles, Coins, Shield, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Builder",
    description: "Describe your app in plain English and watch Claude generate production-ready code instantly. No coding required.",
  },
  {
    icon: Coins,
    title: "Deploy for Pennies",
    description: "Deploy complete apps to the BSV blockchain for less than $0.01. Zero hosting fees, forever.",
  },
  {
    icon: Shield,
    title: "True Ownership",
    description: "Your app lives on-chain as a blockchain ordinal. Censorship-resistant, permanent, and truly yours.",
  },
  {
    icon: TrendingUp,
    title: "Pay-Per-Use Revenue",
    description: "Set your price and earn automatically. Users pay with microtransactions, you get paid instantly.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-features-title">
            Everything You Need to Build & Earn
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-subtitle">
            From idea to revenue in minutes, not months
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 hover-elevate transition-all"
              data-testid={`card-feature-${index}`}
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold" data-testid={`text-feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
