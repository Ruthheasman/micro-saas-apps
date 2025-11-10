import { useState } from "react";
import Navbar from "@/components/Navbar";
import AppCard from "@/components/AppCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colorPaletteThumb from '@assets/generated_images/Color_palette_app_thumbnail_2355200e.png';
import imageCompressorThumb from '@assets/generated_images/Image_compressor_app_thumbnail_ac63c26a.png';
import invoiceGenThumb from '@assets/generated_images/Invoice_generator_app_thumbnail_415f8964.png';
import qrCodeThumb from '@assets/generated_images/QR_code_generator_thumbnail_dc4c0971.png';
import resumeBuilderThumb from '@assets/generated_images/Resume_builder_app_thumbnail_3699a924.png';
import analyticsThumb from '@assets/generated_images/Analytics_dashboard_thumbnail_f07437ed.png';

//todo: remove mock functionality
const allApps = [
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

const categories = ["All", "Design", "Media", "Productivity", "Marketing", "Career", "Analytics"];

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const filteredApps = allApps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-discovery-title">
                Discover Apps
              </h1>
              <p className="text-muted-foreground" data-testid="text-discovery-subtitle">
                Browse {allApps.length} micro-SaaS apps deployed on-chain
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search apps..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer hover-elevate active-elevate-2 px-4 py-1.5"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`badge-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  {...app}
                  onRun={() => console.log(`Running ${app.name}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No apps found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
