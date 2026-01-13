import { Background } from "@/components/Background";
import EdikteChecker from "@/components/EdikteChecker";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Resume } from "@/components/Resume";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Background />
      <Hero />
      <Mission />
      <ProjectGrid />
      <EdikteChecker />
      <Resume />
      <Footer />
    </main>
  );
}
