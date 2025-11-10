import { Link } from "wouter";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-primary leading-none italic" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>μ</span>
              <span className="text-xl font-bold">MicroSaaS Apps</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Build, deploy, and monetize micro-SaaS apps on the BSV blockchain for less than a penny.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/discover" className="hover:text-foreground transition-colors" data-testid="link-footer-discover">
                  Discover Apps
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-foreground transition-colors" data-testid="link-footer-builder">
                  AI Builder
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-docs">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-tutorials">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-community">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-support">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-cookies">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 MicroSaaS Apps. Built on BSV Blockchain. Deploy for &lt;$0.01</p>
        </div>
      </div>
    </footer>
  );
}
