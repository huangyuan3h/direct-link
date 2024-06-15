import Footer from '@/components/footer';
import { Header } from '@/components/header';

import AboutIntro from './components/AboutIntro';
import OurStory from './components/OurStory';

import OurMission from './components/OurMission';

export default async function Home() {
  return (
    <main className="">
      <Header />
      <div className="container">
        <AboutIntro />
        <OurStory />
        <OurMission />
      </div>

      <div className="container">
        <Footer />
      </div>
    </main>
  );
}
