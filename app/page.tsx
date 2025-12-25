import WishlistSection from "@/components/WishlistSection";
import HeroSection from "@/components/HeroSection";
import Rating from "@/components/Rating";

export default function Home() {
  return (
    <main className="flex flex-col w-full px-5">
      <HeroSection />
      <WishlistSection />
      <Rating />
    </main>
  );
}
