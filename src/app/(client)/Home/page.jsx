
import styled from "styled-components";

import About from "@/app/Sections/About";
import Contact from "@/app/Sections/Contact";
import HeroSection from "@/app/Sections/Hero";
import Services from "@/app/Sections/Services";
import Testimonials from "@/app/Sections/Testimonials";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;


function Home() {
    return (
        <Container>
          <HeroSection />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </Container>
      );
};

export default Home