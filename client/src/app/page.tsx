import HeroSection from "@/components/Hero-Section";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectSection from "@/components/ProjectSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden pt-10">
      <section id="home" className="pt-0">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="projects">
        <ProjectSection />
      </section>

      <section id="journey">
        <JourneySection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}
