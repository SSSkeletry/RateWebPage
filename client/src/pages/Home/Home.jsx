import React, { useState } from "react";
import Navbar from "../../shared/components/Navbar";
import Auth from "../../shared/components/Auth";
import PromoSection from "./sections/PromoSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import PricingSection from "./sections/PricingSection";
import ReviewsSection from "./sections/ReviewsSection";
const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <>
      <Navbar onOpenModal={openAuthModal} />
      <main>
        <PromoSection />
        <HowItWorksSection />
        <PricingSection />
        <ReviewsSection />
      </main>
      <Auth isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
    </>
  );
};

export default Home;
