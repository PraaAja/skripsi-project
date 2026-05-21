import { Hero } from './Hero';
import { About } from './About';
import { Programs } from './Programs';
import { RecommendationSystem } from './RecommendationSystem';
import { News } from './News';
import { Contact } from './Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <RecommendationSystem />
      <News />
      <Contact />
    </>
  );
}