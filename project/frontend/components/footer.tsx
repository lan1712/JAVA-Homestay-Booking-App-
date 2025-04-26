import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Good Place Travel</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Discover authentic homestays and create unforgettable travel experiences with local hosts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-teal-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-teal-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-teal-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/homestays" className="text-muted-foreground hover:text-teal-600">
                  Homestays
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-teal-600">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-muted-foreground hover:text-teal-600">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-teal-600">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-teal-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-teal-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-teal-600">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-teal-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-teal-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-teal-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-teal-600">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Good Place Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
