import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play } from "lucide-react";

interface AppCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  rating: number;
  usageCount: number;
  creator: string;
  onRun?: () => void;
}

export default function AppCard({
  id,
  name,
  description,
  thumbnail,
  category,
  price,
  rating,
  usageCount,
  creator,
  onRun,
}: AppCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-app-${id}`}>
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover"
          data-testid={`img-thumbnail-${id}`}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-1" data-testid={`text-app-name-${id}`}>
              {name}
            </h3>
            <Badge variant="secondary" className="shrink-0" data-testid={`badge-category-${id}`}>
              {category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${id}`}>
            {description}
          </p>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60" />
          <span className="text-xs text-muted-foreground" data-testid={`text-creator-${id}`}>
            by {creator}
          </span>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium" data-testid={`text-rating-${id}`}>{rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground" data-testid={`text-usage-${id}`}>
            {usageCount.toLocaleString()} uses
          </span>
          <span className="font-semibold text-primary" data-testid={`text-price-${id}`}>
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Run Button */}
        <Button
          className="w-full"
          onClick={() => {
            console.log(`Running app: ${name}`);
            onRun?.();
          }}
          data-testid={`button-run-${id}`}
        >
          <Play className="h-4 w-4 mr-2" />
          Run App
        </Button>
      </div>
    </Card>
  );
}
