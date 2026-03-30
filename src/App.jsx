import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ClockCanvas from './components/ClockCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Ensure ScrollTrigger calculates heights correctly after fonts/images load
    const refreshTrigger = () => ScrollTrigger.refresh();
    
    // Refresh when fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshTrigger);
    }
    
    // Fallback refresh after a short delay to account for images/layout shifts
    const timer = setTimeout(refreshTrigger, 500);
    window.addEventListener('load', refreshTrigger);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refreshTrigger);
    };
  }, []);

  return (
    <main ref={mainRef} className="app">
      <Navbar />
      
      {/* Background 3D Canvas */}
      <ClockCanvas />

      {/* Main Content Sections */}
      <div className="content-wrapper">
        <Hero />
        <About />
        <Products />
        <Testimonials />
        <Contact />
      </div>
    </main>
  );
}

export default App;
