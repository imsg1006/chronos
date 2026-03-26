import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      }).from(subtextRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="hero" ref={containerRef} style={styles.section}>
      <div className="container" style={styles.container}>
        <h1 ref={textRef} style={styles.title}>
          TIMELESS<br />
          <span style={{ color: 'var(--accent)' }}>ELEGANCE.</span>
        </h1>
        <p ref={subtextRef} style={styles.subtitle}>
          Discover the art of precision and luxury. Each piece is a masterclass in horology, designed for those who appreciate true craftsmanship.
        </p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '80px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 10, // above canvas if needed
  },
  title: {
    fontSize: 'clamp(4rem, 8vw, 8rem)',
    lineHeight: 1,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
    color: 'var(--text-muted)',
    maxWidth: '500px',
    lineHeight: 1.6,
  }
};
