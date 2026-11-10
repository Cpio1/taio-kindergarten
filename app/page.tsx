import About from "@/components/About";
import Contacts from "@/components/Contacts";
import Documents from "@/components/Documents";
import Food from "@/components/Food";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Groups from "@/components/Groups";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { LanguageProvider } from "@/components/LanguageProvider";
import SkipLink from "@/components/SkipLink";
import { getSiteMedia } from "@/lib/media";

export default function Home() {
  const { hero, video, logo, food, gallery } = getSiteMedia();

  return (
    <LanguageProvider>
      <SkipLink />
      <Header logo={logo} />
      <main id="main">
        <Hero image={hero} logo={logo} />
        <About video={video} />
        <Groups />
        <Food images={food} />
        <Gallery images={gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={logo} />
    </LanguageProvider>
  );
}
