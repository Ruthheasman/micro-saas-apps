import { MessageSquare, Sparkles, Rocket, DollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your App",
    description: "Tell our AI what you want to build in plain English. No technical knowledge needed.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Generates Code",
    description: "Claude creates a complete, production-ready React app with live preview in seconds.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deploy On-Chain",
    description: "One click deploys your app permanently to BSV blockchain for less than a penny.",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Start Earning",
    description: "Set your price, share your app, and earn automatically with every use.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-howitworks-title">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-howitworks-subtitle">
            From idea to deployed app in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`step-${index}`}>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-border -z-10" />
              )}

              <div className="space-y-4">
                {/* Step Number Circle */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary" data-testid={`text-step-number-${index}`}>
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full">
                    <step.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold" data-testid={`text-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${index}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
