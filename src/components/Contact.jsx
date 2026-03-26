import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const bgRingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax and rotation on the giant background ring
      gsap.to(bgRingRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(bgRingRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Form elements staggering in with scale and opacity
      gsap.fromTo(elementsRef.current, 
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="contact" ref={containerRef} style={styles.section}>
      <div ref={bgRingRef} style={styles.bgRing}></div>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={styles.content}>
          <h2 ref={el => elementsRef.current[0] = el} style={styles.heading}>REQUEST AN APPOINTMENT</h2>
          <p ref={el => elementsRef.current[1] = el} style={styles.subtext}>
            Our concierges are available to assist you in discovering your perfect timepiece.
          </p>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <InputGroup 
              assignRef={el => elementsRef.current[2] = el} 
              type="text" 
              placeholder="Full Name" 
            />
            <InputGroup 
              assignRef={el => elementsRef.current[3] = el} 
              type="email" 
              placeholder="Email Address" 
            />
            <SelectGroup 
              assignRef={el => elementsRef.current[4] = el} 
            />
            <button 
              ref={el => elementsRef.current[5] = el} 
              className="btn-primary" 
              style={styles.submitBtn}
            >
              Submit Request
            </button>
          </form>
        </div>
        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} CHRONOS WATCHES. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </section>
  );
}

function InputGroup({ assignRef, type, placeholder }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={styles.inputGroup} ref={assignRef}>
      <input 
        type={type} 
        placeholder={placeholder} 
        style={{
          ...styles.input,
          borderColor: focused ? 'var(--accent)' : 'var(--surface-border)',
          background: focused ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          boxShadow: focused ? '0 0 20px rgba(212, 175, 55, 0.15)' : 'none'
        }} 
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function SelectGroup({ assignRef }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={styles.inputGroup} ref={assignRef}>
      <select 
        style={{
          ...styles.input,
          borderColor: focused ? 'var(--accent)' : 'var(--surface-border)',
          background: focused ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          boxShadow: focused ? '0 0 20px rgba(212, 175, 55, 0.15)' : 'none',
          color: 'var(--text-main)',
          cursor: 'pointer'
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="" style={{ background: '#111' }}>Interested In...</option>
        <option value="astral" style={{ background: '#111' }}>Astral Tourbillon</option>
        <option value="lunar" style={{ background: '#111' }}>Lunar Perpetual</option>
        <option value="solaris" style={{ background: '#111' }}>Solaris Chrono</option>
      </select>
    </div>
  );
}

const styles = {
  section: {
    paddingTop: '150px',
    backgroundColor: '#030303',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bgRing: {
    position: 'absolute',
    top: '-20%',
    left: '-10%',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    border: '1px dashed rgba(212, 175, 55, 0.15)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  content: {
    maxWidth: '650px',
    margin: '0 auto',
    textAlign: 'center',
    paddingBottom: '100px',
  },
  heading: {
    fontSize: '3rem',
    color: 'var(--text-main)',
    marginBottom: '1rem',
    letterSpacing: '0.1em',
  },
  subtext: {
    color: 'var(--text-muted)',
    fontSize: '1.2rem',
    marginBottom: '4rem',
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  inputGroup: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '1.2rem 1.5rem',
    borderRadius: '4px',
    border: '1px solid var(--surface-border)',
    color: 'var(--text-main)',
    fontSize: '1.1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.4s ease',
  },
  submitBtn: {
    marginTop: '1.5rem',
    padding: '1.4rem',
    fontSize: '1.1rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  footer: {
    padding: '3rem 0',
    borderTop: '1px solid var(--surface-border)',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    letterSpacing: '0.15em',
    position: 'relative',
    zIndex: 10,
  }
};
