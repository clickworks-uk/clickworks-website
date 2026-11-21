import { Hero } from "@/components/Hero";
import { WelcomeFeatures } from "@/components/WelcomeFeatures";
import { Services } from "@/components/Services";
import { MissionPanel } from "@/components/MissionPanel";
import { TeamRow } from "@/components/TeamRow";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeFeatures />
      <Services />
      <MissionPanel />
      <TeamRow />
      <Testimonials />
    </>
  );
}
