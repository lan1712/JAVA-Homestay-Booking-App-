import { Button } from "@/components/ui/button"
import FeaturedHomestays from "@/components/featured-homestays"
import HeroSection from "@/components/hero-section"
import PopularDestinations from "@/components/popular-destinations"
import TestimonialsSection from "@/components/testimonials-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <FeaturedHomestays />
      <PopularDestinations />
      <TestimonialsSection />

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="mb-6 text-3xl font-bold">Ready for your next adventure?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Discover unique homestays and create unforgettable memories with Good Place Travel. Our carefully selected
          accommodations ensure comfort and authenticity.
        </p>
        <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
          Browse All Homestays
        </Button>
      </section>
    </div>
  )
}
