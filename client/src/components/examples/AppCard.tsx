import AppCard from '../AppCard';
import heroImage from '@assets/generated_images/Color_palette_app_thumbnail_2355200e.png';

export default function AppCardExample() {
  return (
    <div className="max-w-sm">
      <AppCard
        id="1"
        name="Color Palette Generator"
        description="Generate beautiful color palettes from images with AI-powered suggestions"
        thumbnail={heroImage}
        category="Design"
        price={0.25}
        rating={4.8}
        usageCount={1243}
        creator="alice.bsv"
        onRun={() => console.log('App run clicked')}
      />
    </div>
  );
}
