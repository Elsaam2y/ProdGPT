import { LandingNavbar } from '@/components/landing-navbar';
import { LandingHomePage } from '@/components/LandingHomePage';

const LandingPage = () => {
  return (
    <div className="h-full ">
      <LandingNavbar />
      <LandingHomePage />
    </div>
  );
};

export default LandingPage;
