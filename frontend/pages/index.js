// pages/index.js
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LatestStories from "../components/LatestStories";
import TechSection from "../components/TechSection";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <HeroSection />

      {/* Main content area */}
      <div className="container mx-auto px-32 py-8 flex flex-col lg:flex-row gap-8 ">
        {/* Left side (Stories, Tech, etc.) */}
        <div className="w-full lg:w-2/3">
          <LatestStories />
          <TechSection />
        </div>

        {/* Right side (Sidebar) */}
        <div className="w-full lg:w-1/4 ml-14 mt-8">
          <Sidebar />
        </div>
      </div>

      <Footer />
    </div>
  );
}
