import WishlistSection from "@/components/WishlistSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <WishlistSection />
    </main>
  );
}
