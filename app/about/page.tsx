import Footer from '@/components/footer';
import { Header } from '@/components/header';
import Banner from './components/banner';
import AboutIntro from './components/AboutIntro';
import OurStory from './components/ourStory';

export default async function Home() {
  return (
    <main className="">
      <Header />
      <div className="container">
        <AboutIntro />
        <OurStory />
      </div>

      <div className="container">
        <Footer />
      </div>
    </main>
  );
}
