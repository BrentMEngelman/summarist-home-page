import Nav from "../components/Nav";
import Landing from "../components/Landing";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import Numbers from "../components/Numbers";
import Footer from "../components/Footer";
import AuthModal from "@/components/AuthModal"; // Import your modal

export default function Home() {
  return (
    <div className="max-w-[100%] overflow-x-hidden font-roboto text-brand-text">
      <Nav />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
      
      {/* Render the modal here so it listens to Redux state */}
      <AuthModal />
    </div>
  );
}