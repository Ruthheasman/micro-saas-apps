import { Button } from "@/components/ui/button";
import { Sparkles, Rocket } from "lucide-react";
import { Link } from "wouter";
import heroBackground from '@assets/generated_images/Hero_blockchain_network_background_2d8bb610.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Blockchain network"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Deploy for &lt;$0.01 • 10,000+ Apps On-Chain</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground drop-shadow-lg" data-testid="text-hero-title">
            Build & Deploy Micro-SaaS Apps On-Chain
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto drop-shadow" data-testid="text-hero-subtitle">
            Create apps with AI, deploy to BSV blockchain for pennies, earn with pay-per-use. No servers, no hosting fees, permanent ownership.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="backdrop-blur-sm gap-2" data-testid="button-start-building">
                <Rocket className="h-5 w-5" />
                Start Building
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="outline" className="backdrop-blur-sm" data-testid="button-view-apps">
                View Apps
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-8">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Zero downtime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Censorship resistant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Permanent hosting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
