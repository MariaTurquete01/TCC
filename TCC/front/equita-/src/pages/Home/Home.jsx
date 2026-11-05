import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Pillars from "../../components/Pillars/Pillars";
import ODSSection from "../../components/ODSSection/ODSSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Partners from "../../components/Partners/Partners";
import FAQ from "../../components/FAQ/FAQ";

function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Pillars/>
      <ODSSection/>
      <HowItWorks/>
      <Partners/>
      <Footer />
      <FAQ/>  
    </>
  );
}
 
export default Home;