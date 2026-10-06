import About from "@/components/About";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { SlashDivider } from "@/components/SectionWrapper";
import Seminars from "@/components/Seminars";
import Skills from "@/components/Skills";

// Single page: sections are linked by anchor ids from lib/data.ts.
export default function Home() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <About />
        <SlashDivider />
        <Education />
        <SlashDivider />
        <Seminars />
        <SlashDivider />
        <Skills />
        <SlashDivider />
        <Projects />
        <SlashDivider />
      </main>
      <Footer />
    </>
  );
}
