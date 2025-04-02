import Navbar from "../../shared/components/Navbar";
import PromoSection from "./sections/PromoSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import PricingSection from "./sections/PricingSection";
import ReviewsSection from "./sections/ReviewsSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <PromoSection />
        <HowItWorksSection />
        <PricingSection />
        <ReviewsSection />
      </main>
    </>
  );
};

export default Home;
