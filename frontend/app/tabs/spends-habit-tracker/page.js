import Footer from "@/app/components/Footer";
import InDev from "@/app/components/InDev";
import Navbar from "@/app/components/NavBar";

export default function SpendsHabitTracker() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <InDev />
      <Footer />
    </div>
  );
}
