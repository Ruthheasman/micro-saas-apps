import AppCard from "./AppCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import colorPaletteThumb from '@assets/generated_images/Color_palette_app_thumbnail_2355200e.png';
import imageCompressorThumb from '@assets/generated_images/Image_compressor_app_thumbnail_ac63c26a.png';
import invoiceGenThumb from '@assets/generated_images/Invoice_generator_app_thumbnail_415f8964.png';
import qrCodeThumb from '@assets/generated_images/QR_code_generator_thumbnail_dc4c0971.png';
import resumeBuilderThumb from '@assets/generated_images/Resume_builder_app_thumbnail_3699a924.png';
import analyticsThumb from '@assets/generated_images/Analytics_dashboard_thumbnail_f07437ed.png';

//todo: remove mock functionality
const featuredApps = [
  {
    id: "1",
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes from images with AI-powered suggestions and export options",
    thumbnail: colorPaletteThumb,
    category: "Design",
    price: 0.25,
    rating: 4.8,
    usageCount: 1243,
    creator: "alice.bsv",
  },
  {
    id: "2",
    name: "Image Compressor Pro",
    description: "Compress images up to 80% smaller while maintaining quality. Perfect for web optimization",
    thumbnail: imageCompressorThumb,
    category: "Media",
    price: 0.10,
    rating: 4.9,
    usageCount: 2156,
    creator: "bob.bsv",
  },
  {
    id: "3",
    name: "Invoice Generator",
    description: "Create professional invoices instantly. Customize templates, add your brand, export PDF",
    thumbnail: invoiceGenThumb,
    category: "Productivity",
    price: 0.50,
    rating: 4.7,
    usageCount: 891,
    creator: "charlie.bsv",
  },
  {
    id: "4",
    name: "QR Code Designer",
    description: "Generate branded QR codes with custom colors, logos, and shapes. Download in any size",
    thumbnail: qrCodeThumb,
    category: "Marketing",
    price: 0.25,
    rating: 4.6,
    usageCount: 1567,
    creator: "diana.bsv",
  },
  {
    id: "5",
    name: "Resume Builder",
    description: "Build professional resumes with AI-enhanced bullet points. Export to PDF or Word",
    thumbnail: resumeBuilderThumb,
    category: "Career",
    price: 1.00,
    rating: 4.9,
    usageCount: 734,
    creator: "eve.bsv",
  },
  {
    id: "6",
    name: "Analytics Dashboard",
    description: "Visualize your data with interactive charts and graphs. Real-time insights at a glance",
    thumbnail: analyticsThumb,
    category: "Analytics",
    price: 0.75,
    rating: 4.8,
    usageCount: 1123,
    creator: "frank.bsv",
  },
];

export default function AppShowcaseSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-showcase-title">
            Featured Apps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-showcase-subtitle">
            Discover what others have built and deployed on-chain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredApps.map((app) => (
            <AppCard key={app.id} {...app} onRun={() => console.log(`Running ${app.name}`)} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/discover">
            <Button size="lg" variant="outline" data-testid="button-browse-all-apps">
              Browse All Apps
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
