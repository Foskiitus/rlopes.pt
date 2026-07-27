import Hero from "../sections/Hero/Hero";
import Seo from "../common/Seo";

import { lazy, Suspense } from "react";

const Projects = lazy(() => import("../sections/Projects/Projects"));
const Skills = lazy(() => import("../sections/Skills/Skills"));
const Contact = lazy(() => import("../sections/Contact/Contact"));
const Footer = lazy(() => import("../sections/Footer/Footer"));

function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
