import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import HowItWorks from "./components/home/HowItWorks";
import RoleSelection from "./components/home/RoleSelection";
import Footer from "./components/home/Footer";
import NavBar from "./components/home/NavBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <RoleSelection />
      <Footer />
      <NavBar />
    </main>
  );
}
